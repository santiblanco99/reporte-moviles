import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { CustomImage } from "../../../models/customImage";
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-eventual-connectivity',
  templateUrl: './eventual-connectivity.component.html',
  styleUrls: ['./eventual-connectivity.component.css']
})
export class EventualConnectivityComponent implements OnChanges {

  @Input() commonImages: CustomImage[];

  noConnectionOnHomeFirstPhoto: CustomImage = {
    url: '',
    name: 'First error\'s photo'
  }

  noConnectionOnHomeSecondPhoto: CustomImage = {
    url: '',
    name: 'Second error\'s photo'
  }

  noConnectionOnHomeThirdPhoto: CustomImage = {
    url: '',
    name: 'Third error\'s photo'
  }

  noConnectionOnHomeForthPhoto: CustomImage = {
    url: '',
    name: 'Forth error\'s photo'
  }

  currentConnectivityBruteCheckFirst: string = `
  // lib/appstate_container.dart

  _connStatusSub = EventTaxiImpl.singleton().registerTo<ConnStatusEvent>().listen((event) {
    if (event.status == ConnectionStatus.CONNECTED) {
      requestUpdate();
    } else if (event.status == ConnectionStatus.DISCONNECTED && !sl.get<AccountService>().suspended) {
      sl.get<AccountService>().initCommunication();
    }
  });
  `;
  currentConnectivityBruteCheckSecond = `
  // lib/network/account_service.dart

  /// Retry up to once per 3 seconds
  Future<void> reconnectToService() async {
    if (_isInRetryState) {
      return;
    } else if (reconnectStream != null) {
      reconnectStream.cancel();
    }
    _isInRetryState = true;
    log.d("Retrying connection in 3 seconds...");
    Future<dynamic> delayed = new Future.delayed(new Duration(seconds: 3));
    delayed.then((_) {
      return true;
    });
    reconnectStream = delayed.asStream().listen((_) {
      log.d("Attempting connection to service");
      initCommunication(unsuspend: true);
      _isInRetryState = false;
    });
  }

  // Connect to server
  Future<void> initCommunication({bool unsuspend = false}) async {
    if (_isConnected || _isConnecting) {
      return;
    } else if (suspended && !unsuspend) {
      return;
    } else if (!unsuspend) {
      reconnectToService();
      return;
    }
    _isConnecting = true;
    try {
      var packageInfo = await PackageInfo.fromPlatform();

      _isConnecting = true;
      suspended = false;
      _channel = new IOWebSocketChannel
                      .connect(_SERVER_ADDRESS,
                               headers: {
                                'X-Client-Version': packageInfo.buildNumber
                               });
      log.d("Connected to service");
      _isConnecting = false;
      _isConnected = true;
      EventTaxiImpl.singleton().fire(ConnStatusEvent(status: ConnectionStatus.CONNECTED));
      _channel.stream.listen(_onMessageReceived, onDone: connectionClosed, onError: connectionClosedError);
    } catch(e){
      log.e("Error from service \${e.toString()}", e);
      _isConnected = false;
      _isConnecting = false;
      EventTaxiImpl.singleton().fire(ConnStatusEvent(status: ConnectionStatus.DISCONNECTED));
    }
  }
  `;

  connectivityCode = `import 'package:connectivity/connectivity.dart';
  var connectivityResult = await (Connectivity().checkConnectivity());
  if (connectivityResult == ConnectivityResult.mobile) {
  // I am connected to a mobile network.
  } else if (connectivityResult == ConnectivityResult.wifi) {
  // I am connected to a wifi network.
  }`;

  errorPrivacyPolicyPhoto: CustomImage = {
    url: '',
    name: 'Error on privacy policy photo'
  }

  privacyPolicyCode: string = `
  // lib/ui/settings/settings_drawer.dart

  GestureDetector(
    onTap: () {
      Navigator.of(context).push(MaterialPageRoute(
          builder: (BuildContext context) {
        return UIUtil.showWebview(context,
            AppLocalization.of(context).privacyUrl);
      }));
    },
    child: Text(
        AppLocalization.of(context).privacyPolicy,
        style: AppStyles.textStyleVersionUnderline(
            context)))
            
  // lib/ui/util/ui_util.dart

  static Widget showWebview(BuildContext context, String url) {
    cancelLockEvent();
    return WebviewScaffold(
      resizeToAvoidBottomInset: Platform.isAndroid,
      url: url,
      appBar: new AppBar(
        backgroundColor: StateContainer.of(context).curTheme.backgroundDark,
        brightness: StateContainer.of(context).curTheme.brightness,
        iconTheme: IconThemeData(color: StateContainer.of(context).curTheme.text),
      ),
    );
  }
  `;

  denyPermissionsErrorCameraFile : CustomImage = {
    url: '',
    name: 'Error on camera/file reader permissions photo'
  }

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    console.log('this.commonImages', this.commonImages)
    if (this.commonImages && this.commonImages.length > 0) {
      for (let item of this.commonImages) {
        if (item.name.includes('bug7_1_no_internet_home')) {
          this.noConnectionOnHomeFirstPhoto = { ...item };
        }
        else if (item.name.includes('bug7_2_no_internet_home_performance')) {
          this.noConnectionOnHomeSecondPhoto = { ...item };
        }
        else if (item.name.includes('bug7_3_no_internet_home_network')) {
          this.noConnectionOnHomeThirdPhoto = { ...item };
        }
        else if (item.name.includes('bug7-4-no-internet-frames.gif')) {
          this.noConnectionOnHomeForthPhoto = { ...item };
        }
        else if (item.name.includes('error_privacy_policy')) {
          this.errorPrivacyPolicyPhoto = { ...item };
        }
        else if (item.name.includes('camera_filereader_deny_permissions')) {
          this.denyPermissionsErrorCameraFile = { ...item };
        }
      }
      const noConnectionOnHomeFirstPhotoTemp = this.commonImages.find(item => item.name.includes('bug7_1_no_internet_home'));
      const noConnectionOnHomeSecondPhotoTemp = this.commonImages.find(item => item.name.includes('bug7_2_no_internet_home_performance'));
      const noConnectionOnHomeThirdPhotoTemp = this.commonImages.find(item => item.name.includes('bug7_3_no_internet_home_network'));
      const noConnectionOnHomeForthPhotoTemp = this.commonImages.find(item => item.name.includes('bug7-4-no-internet-frames.gif'));

      if (noConnectionOnHomeFirstPhotoTemp) {
        this.noConnectionOnHomeFirstPhoto = { ...noConnectionOnHomeFirstPhotoTemp };
      }
      if (noConnectionOnHomeSecondPhotoTemp) {
        this.noConnectionOnHomeSecondPhoto = { ...noConnectionOnHomeSecondPhotoTemp };
      }
      if (noConnectionOnHomeThirdPhotoTemp) {
        this.noConnectionOnHomeThirdPhoto = { ...noConnectionOnHomeThirdPhotoTemp };
      }
      if (noConnectionOnHomeForthPhotoTemp) {
        this.noConnectionOnHomeForthPhoto = { ...noConnectionOnHomeForthPhotoTemp };
      }
    }
  }
}

