import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-async',
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.css']
})
export class AsyncComponent implements OnInit {

  languages: string[];
  codeSnippets: string[];


  constructor() { }

  ngOnInit(): void {
    this.languages = ["dart"];
    this.codeSnippets = [
      `static Future<String> getAndCacheAPIResponse() async {
        String url = API_URL + '/accounts/verified';
        http.Response response = await http.get(url, headers:  {});
        if (response.statusCode != 200) {
          return null;
        }
        await sl.get<SharedPrefsUtil>().setNinjaAPICache(response.body);
        return response.body;
      }`,
      `Future<bool> hasBiometrics() async {
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
      }`,
      `static Future<void> setAppIcon(AppIconEnum iconToChange) async {
        if (!Platform.isIOS) {
          return null;
        }
        String iconStr = "natrium";
        switch (iconToChange) {
          case AppIconEnum.THORIUM:
            iconStr = "thorium";
            break;
          case AppIconEnum.NEPTUNIUM:
            iconStr = "neptunium";
            break;
          case AppIconEnum.INDIUM:
            iconStr = "indium";
            break;
          case AppIconEnum.TITANIUM:
            iconStr = "titanium";
            break;
          case AppIconEnum.NATRIUM:
          default:
            iconStr = "natrium";
            break;
        }
        final Map<String, dynamic> params = <String, dynamic>{
         'icon': iconStr,
        };
        return await _channel.invokeMethod('changeIcon', params);
      }`,
      `/// Add donations contact if it hasnt already been added
      Future<void> _addSampleContact() async {
        bool contactAdded = await sl.get<SharedPrefsUtil>().getFirstContactAdded();
        if (!contactAdded) {
          bool addressExists = await sl.get<DBHelper>().contactExistsWithAddress(
              "nano_1natrium1o3z5519ifou7xii8crpxpk8y65qmkih8e8bpsjri651oza8imdd");
          if (addressExists) {
            return;
          }
          bool nameExists =
              await sl.get<DBHelper>().contactExistsWithName("@NatriumDonations");
          if (nameExists) {
            return;
          }
          await sl.get<SharedPrefsUtil>().setFirstContactAdded(true);
          Contact c = Contact(
              name: "@NatriumDonations",
              address:
                  "nano_1natrium1o3z5519ifou7xii8crpxpk8y65qmkih8e8bpsjri651oza8imdd");
          await sl.get<DBHelper>().saveContact(c);
        }
      }`
    ]
  }

}
