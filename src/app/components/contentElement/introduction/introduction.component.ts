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
    _subscribeEventSub = EventTaxiImpl.singleton().registerTo<SubscribeEvent>().listen((event) {
      handleSubscribeResponse(event.response);
    });
    _priceEventSub = EventTaxiImpl.singleton().registerTo<PriceEvent>().listen((event) {
      // PriceResponse's get pushed periodically, it wasn't a request we made so don't pop the queue
      setState(() {
        wallet.btcPrice = event.response.btcPrice.toString();
        wallet.localCurrencyPrice = event.response.price.toString();
      });
    });
    _connStatusSub = EventTaxiImpl.singleton().registerTo<ConnStatusEvent>().listen((event) {
      if (event.status == ConnectionStatus.CONNECTED) {
        requestUpdate();
      } else if (event.status == ConnectionStatus.DISCONNECTED && !sl.get<AccountService>().suspended) {
        sl.get<AccountService>().initCommunication();
      }
    });
    _callbackSub = EventTaxiImpl.singleton().registerTo<CallbackEvent>().listen((event) {
      handleCallbackResponse(event.response);
    });
    _errorSub = EventTaxiImpl.singleton().registerTo<ErrorEvent>().listen((event) {
      handleErrorResponse(event.response);
    });
    _fcmUpdateSub = EventTaxiImpl.singleton().registerTo<FcmUpdateEvent>().listen((event) {
      if (wallet != null) {
        sl.get<SharedPrefsUtil>().getNotificationsOn().then((enabled) {
          sl.get<AccountService>().sendRequest(FcmUpdateRequest(account: wallet.address, fcmToken: event.token, enabled: enabled));
        });
      }
    });
    // Account has been deleted or name changed
    _accountModifiedSub = EventTaxiImpl.singleton().registerTo<AccountModifiedEvent>().listen((event) {
      if (!event.deleted) {
        if (event.account.index == selectedAccount.index) {
          setState(() {
            selectedAccount.name = event.account.name;
          });
        } else {
          updateRecentlyUsedAccounts();
        }
      } else {
        // Remove account
        updateRecentlyUsedAccounts().then((_) {
          if (event.account.index == selectedAccount.index && recentLast != null) {
            sl.get<DBHelper>().changeAccount(recentLast);
            setState(() {
              selectedAccount = recentLast;
            });
            EventTaxiImpl.singleton().fire(AccountChangedEvent(account: recentLast, noPop: true));
          } else if (event.account.index == selectedAccount.index && recentSecondLast != null) {
            sl.get<DBHelper>().changeAccount(recentSecondLast);
            setState(() {
              selectedAccount = recentSecondLast;
            });
            EventTaxiImpl.singleton().fire(AccountChangedEvent(account: recentSecondLast, noPop: true));
          } else if (event.account.index == selectedAccount.index) {
            getSeed().then((seed) {
              sl.get<DBHelper>().getMainAccount(seed).then((mainAccount) {
                sl.get<DBHelper>().changeAccount(mainAccount);
                setState(() {
                  selectedAccount = mainAccount;
                });
                EventTaxiImpl.singleton().fire(AccountChangedEvent(account: mainAccount, noPop: true)); 
              });  
            });       
          }
        });
        updateRecentlyUsedAccounts();
      }
    });
    // Deep link has been updated
    _deepLinkSub = getLinksStream().listen((String link) {
      setState(() {
        initialDeepLink = link;
      });
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
