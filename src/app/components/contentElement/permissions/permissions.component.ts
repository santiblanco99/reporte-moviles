import { Component, OnChanges, Input } from '@angular/core';
import { CustomImage } from 'src/app/models/customImage';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnChanges {

  @Input() commonImages: CustomImage[];

  androidInternetPermission: string = `
// android/app/src/main/AndroidManifest.xml
<uses-permission android:name="android.permission.INTERNET"/>`;
  androidFingerprintPermission: string = `
// android/app/src/main/AndroidManifest.xml
<uses-permission android:name="android.permission.USE_FINGERPRINT"/>`;
  iosFaceIdPermission: string = `
// ios/Runner/Info.plist  
<key>NSFaceIDUsageDescription</key>
<string>App needs to authenticate using faces.</string>
  `;
  biometricAuthCode = `
  ///lib/util/biometrics.dart
  /// hasBiometrics()
  /// 
  /// @returns [true] if device has fingerprint/faceID available and registered, [false] otherwise
  Future<bool> hasBiometrics() async {
    LocalAuthentication localAuth = new LocalAuthentication();
    bool canCheck = await localAuth.canCheckBiometrics;
    if (canCheck) {
      List<BiometricType> availableBiometrics = await localAuth.getAvailableBiometrics();
      availableBiometrics.forEach((type) {
        sl.get<Logger>().i(type.toString());
        sl.get<Logger>().i("\${type == BiometricType.face ? 'face' : type == BiometricType.iris ? 'iris' : type == BiometricType.fingerprint ? 'fingerprint' : 'unknown'}");
      });
      if (availableBiometrics.contains(BiometricType.face)) {
        return true;
      } else if (availableBiometrics.contains(BiometricType.fingerprint)) {
        return true;
      }
    }
    return false;
  }

  ///
  /// authenticateWithBiometrics()
  /// 
  /// @param [message] Message shown to user in FaceID/TouchID popup
  /// @returns [true] if successfully authenticated, [false] otherwise
  Future<bool> authenticateWithBiometrics(BuildContext context, String message) async {
    bool hasBiometricsEnrolled = await hasBiometrics();
    if (hasBiometricsEnrolled) {
      LocalAuthentication localAuth = new LocalAuthentication();
      return await localAuth.authenticateWithBiometrics(
        localizedReason: message,
        useErrorDialogs: false
      );
    }
    return false;
  }
  `;

  photoPermission: string = `
// android/app/src/main/AndroidManifest.xml
<uses-permission android:name="android.permission.CAMERA" />

// ios/Runner/Info.plist  
<key>NSPhotoLibraryAddUsageDescription</key>
<string>This app requires access to the photo library.</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>This app requires access to the photo library.</string>
`;
  scanPhotoCode: string = `
  // lib/util/settings/changerepresentativemanualentry_sheet.dart

  prefixButton: TextFieldButton(
    icon: AppIcons.scan,
    onPressed: () {
      UIUtil.cancelLockEvent();
        BarcodeScanner.scan(
                StateContainer.of(context)
                    .curTheme
                    .qrScanTheme)
            .then((result) {
          if (result == null) {
            return;
          }
          Address address = new Address(result);
          if (address.isValid()) {
            setState(() {
              _addressValidAndUnfocused = true;
              _showPasteButton = false;
              _repAddressStyle =
                  AppStyles.textStyleAddressText60(
                      context);
            });
            _repController.text = address.address;
            _repFocusNode.unfocus();
          } else {
            UIUtil.showSnackbar(
                AppLocalization.of(context)
                    .qrInvalidAddress,
                context);
          }
        });                                         
    },
  ),
  `;
  scanPhotoGif: CustomImage = {
    name: '',
    url: 'Gif of the scan photo feature'
  }
  fingerprintGif: CustomImage = {
    name: '',
    url: 'Gif of the fingerprint feature'
  }

  externalStoragePermission: string = `
// android/app/src/main/AndroidManifest.xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
`;

vibratePermission : string = `
// android/app/src/main/AndroidManifest.xml
<uses-permission android:name="android.permission.VIBRATE"/>
`;
vibrateCode: string = `
/// Feedback for success
  Future<void> success() async {
    if (Platform.isIOS) {
      // If this is simulator or this device doesnt have tapic then we can't use this
      if (await hasTapicEngine() && await Vibrate.canVibrate) {
        Vibrate.feedback(FeedbackType.medium);
      } else {
        HapticFeedback.mediumImpact();
      }
    } else {
      HapticFeedback.mediumImpact();
    }
  }
`;
  constructor() { }

  ngOnChanges(): void {
    if (
      this.commonImages && this.commonImages.length > 0) {
      for (let item of this.commonImages) {
        if (item.name.includes('scan_img_vid')) {
          this.scanPhotoGif = { ...item };
        }
        else if (item.name.includes('fingerprint_vid')) {
          this.fingerprintGif = { ...item };
        }
      }
      // const themePhotosListTemp = this.commonImages.(item => item.name.includes('theme_'));
      // const natriumFontsPhotoTemp = this.commonImages.find(item => item.name.includes('natrium_fonts'));
      // if (natriumFontsPhotoTemp) {
      //   this.natriumFontsPhoto = { ...natriumFontsPhotoTemp };
      // }
    }
  }
}
