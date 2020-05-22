import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CustomImage } from 'src/app/models/customImage';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent implements OnChanges {
  @Input() commonImages: CustomImage[];
  constructor() { }


  addContactGif: CustomImage = {
    name: 'Gif for add contacts feature',
    url: ''
  }

  singletonCode = `
  GetIt sl = GetIt.instance;

  void setupServiceLocator() {
    sl.registerLazySingleton<AccountService>(() => AccountService());
    sl.registerLazySingleton<DBHelper>(() => DBHelper());
    sl.registerLazySingleton<HapticUtil>(() => HapticUtil());
    sl.registerLazySingleton<BiometricUtil>(() => BiometricUtil());
    sl.registerLazySingleton<Vault>(() => Vault());
    sl.registerLazySingleton<SharedPrefsUtil>(() => SharedPrefsUtil());
    sl.registerLazySingleton<Logger>(() => Logger(printer: PrettyPrinter()));
  }
  `;

  saveContactsCode = `
  Future<int> saveContact(Contact contact) async {
    var dbClient = await db;
    return await dbClient.rawInsert(
        'INSERT INTO Contacts (name, address) values(?, ?)',
        [contact.name, contact.address.replaceAll("xrb_", "nano_")]);
  }
  `;

  eventDrivenInitialization = `
  void _registerBus() {
    ...
    // Account has been deleted or name changed
    _accountModifiedSub = EventTaxiImpl.singleton().registerTo<AccountModifiedEvent>().listen((event) {
      if (!event.deleted) {
        ...
      } else {
        ...
      }
    });
  }
  `;

  ngOnChanges(changes: SimpleChanges) {
    if (this.commonImages && this.commonImages.length > 0) {
      for (let item of this.commonImages) {
        if (item.name.includes('add_contact_vid')) {
          this.addContactGif = { ...item };
          console.log(this.addContactGif);

        }
      }
    }
  }

}
