import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';
import { CustomImage } from 'src/app/models/customImage';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnChanges {
  @Input() commonImages: CustomImage[];

  photoList: CustomImage[] = [];

  loginImage: CustomImage = {
    url: '',
    name: ''
  };

  logoutImage: CustomImage = {
    url: '',
    name: ''
  };

  register1Image: CustomImage = {
    url: '',
    name: ''
  };

  register2Image: CustomImage = {
    url: '',
    name: ''
  };

  constructor() { }


  response: HighlightResult;

  code = `function myFunction() {
    document.getElementById("demo1").innerHTML = "Hello there!";
    document.getElementById("demo2").innerHTML = "How are you?";
  }`;

  sharedPreferencesList = [
    {
      title: 'Back-up del seed',
      description: `Guardan el seed personal el cual es un tipo de contraseña que permite al usuario recuperar los fondos de su billetera en caso de que se necesite.`,
      code: `Future<void> setSeedBackedUp(bool value) async {
  return await set(seed_backed_up_key, value);
}`
    },
    {
      title: 'Tipo de moneda',
      description: `Debido a que ellos permiten cambiar el tipo de moneda que se muestra al usuario, la selección del mismo se guarda en shared preferences.`,
      code: `Future<void> setCurrency(AvailableCurrency currency) async {
  return await set(cur_currency, currency.getIndex());
}`
    },
    {
      title: 'Idioma de la aplicación',
      description: `Debido a que ellos permiten cambiar el lenguaje de la aplicación, la selección del mismo se guarda en shared preferences.`,
      code: `Future<void> setLanguage(LanguageSetting language) async {
  return await set(cur_language, language.getIndex());
}`
    }
  ]

  sqliteList = [
    {
      title: 'Contactos',
      description: `Almacena los contactos que posee la cuenta que se encuentra logueada.`,
      code: `static const String CONTACTS_SQL = "CREATE TABLE Contacts( 
 id INTEGER PRIMARY KEY AUTOINCREMENT, 
 name TEXT, 
 address TEXT, 
 monkey_path TEXT)";
`
    },
    {
      title: 'Cuentas',
      description: `Almacena las cuentas o billeteras que tiene el usuario actualmente.`,
      code: `CREATE TABLE Accounts( 
id INTEGER PRIMARY KEY AUTOINCREMENT, 
name TEXT, 
acct_index INTEGER, 
selected INTEGER, 
last_accessed INTEGER,
private_key TEXT,
balance TEXT)`
    },
  ]

  flutterSecureStorageList = [
    {
      title: 'Guardar UUID recuperado del servidor para realizar llamados al servicio de back-end',
      description: '',
      code: `// Server gives us a UUID for future requests on subscribe
if (response.uuid != null) {
  sl.get<SharedPrefsUtil>().setUuid(response.uuid);
};
`
    },
    {
      title: 'Llama al método de encriptar la información',
      description: '',
      code: `Future<void> setUuid(String uuid) async {
  return await setEncrypted(app_uuid_key, uuid);
}
`
    },
    {
      title: 'Encripta la información',
      description: 'Tal y como podemos observar, el sistema tiene asociada una frase secreta al usuario, en caso de que la frase no sea proveída, la crea por medio del Vault (que utiliza el plugin en cuestión) y realiza el encriptado de la información.',
      code: `// For encrypted data
 Future<void> setEncrypted(String key, String value) async {
  // Retrieve/Generate encryption password
   String secret = await sl.get<Vault>().getEncryptionPhrase();
    if (secret == null) {
      secret = RandomUtil.generateEncryptionSecret(16) +
      ":" +
      RandomUtil.generateEncryptionSecret(8);
      await sl.get<Vault>().writeEncryptionPhrase(secret);
    }
    // Encrypt and save
    Salsa20Encryptor encrypter =
      new Salsa20Encryptor(secret.split(":")[0], secret.split(":")[1]);
        SharedPreferences prefs = await SharedPreferences.getInstance();
        prefs.setString(key, encrypter.encrypt(value));
  }
`
    },
    {
      title: 'Guardar información de forma segura',
      description: '',
      code: `Future<String> writeEncryptionPhrase(String secret) async {
  return await _write(encryptionKey, secret);
}
Future<String> _write(String key, String value) async {
  if (await legacy()) {
    await setEncrypted(key, value);
  } else {
    await secureStorage.write(key: key, value: value);
  }
  return value;
}
`
    },
  ]

  onHighlight(e) {
    this.response = {
      language: e.language,
      relevance: e.relevance,
      second_best: '{...}',
      top: '{...}',
      value: '{...}'
    }
  }

  languages = ["dart"];



  ngOnChanges(changes: SimpleChanges) {
    if (this.commonImages && this.commonImages.length > 0) {
      for (let item of this.commonImages) {
        if (item.name.includes("login")) {
          this.photoList.push(item);
          this.loginImage = {...item};
        }
        else if (item.name.includes("logout")) {
          this.photoList.push(item);
          this.logoutImage = {...item};
        }
        else if (item.name.includes("register1")) {
          this.photoList.push(item);
          this.register1Image = {...item};
        }
        else if (item.name.includes("register2")) {
          this.photoList.push(item);
          this.register2Image = {...item};
        }
      }
    }
  }




  mantaUtilCode = `class MantaUtil {
    // Utilities for the manta protocol
    static Future<PaymentRequestMessage> getPaymentDetails(MantaWallet manta) async {
      await manta.connect();
      final RSAPublicKey cert = await manta.getCertificate();
      final PaymentRequestEnvelope payReqEnv = await manta.getPaymentRequest(
        cryptoCurrency: "NANO");
      if (!payReqEnv.verify(cert)) {
        throw 'Certificate verification failure';
      }
      final PaymentRequestMessage payReq = payReqEnv.unpack();
      return payReq;
    }`
  mantaCode = `Future<void> scanAndHandlResult() async {
    dynamic scanResult = await Navigator.pushNamed(context, '/before_scan_screen');
    // Parse scan data and route appropriately
    if (scanResult == null) {
      UIUtil.showSnackbar(AppLocalization.of(context).qrInvalidAddress, context);
    } else if (!QRScanErrs.ERROR_LIST.contains(scanResult) &&  MantaWallet.parseUrl(scanResult) != null) {
      try {
        _showMantaAnimation();
        // Get manta payment request
        MantaWallet manta = MantaWallet(scanResult);
        PaymentRequestMessage paymentRequest = await MantaUtil.getPaymentDetails(manta);
        if (animationOpen) {
          Navigator.of(context).pop();
        }
        MantaUtil.processPaymentRequest(context, manta, paymentRequest);
      } catch (e) {
        if (animationOpen) {
          Navigator.of(context).pop();
        }
        UIUtil.showSnackbar(AppLocalization.of(context).mantaError, context);
      }
    } else if (!QRScanErrs.ERROR_LIST.contains(scanResult)) {
      // Is a URI
      Address address = Address(scanResult);
      if (address.address == null) {
        UIUtil.showSnackbar(AppLocalization.of(context).qrInvalidAddress, context);
      } else {
        // See if this address belongs to a contact
        Contact contact = await sl.get<DBHelper>().getContactWithAddress(address.address);
        // If amount is present, fill it and go to SendConfirm
        BigInt amountBigInt = address.amount != null ? BigInt.tryParse(address.amount) : null;
        if (amountBigInt != null && amountBigInt < BigInt.from(10).pow(26)) {
          UIUtil.showSnackbar(AppLocalization.of(context).minimumSend.replaceAll("%1", "0.000001"), context);
        } else if (amountBigInt != null && StateContainer.of(context).wallet.accountBalance > amountBigInt) {
          // Go to confirm sheet
          Sheets.showAppHeightNineSheet(
            context: context,
            widget: SendConfirmSheet(
                      amountRaw: address.amount,
                      destination: contact != null ? contact.address : address.address,
                      contactName: contact != null ? contact.name : null)
          );
        } else {
          // Go to send sheet
          Sheets.showAppHeightNineSheet(
            context: context,
            widget: SendSheet(
              localCurrency: StateContainer.of(context).curCurrency,
              contact: contact,
              address: contact != null ? contact.address : address.address
            )
          );            
        }
      }
    }
  }`;

  mantaClassCode = `class MantaWallet {
    String session_id;
    String host;
    int port;
    Map<String, String> topics;
    mqtt.MqttClient client;
    Completer<RSAPublicKey> certificate;
    StreamQueue<RSAPublicKey> certificates;
    StreamQueue<AckMessage> acks;
    StreamQueue<PaymentRequestEnvelope> requests;
    bool _gettingCert = false;
    bool useWebSocket = false;
    bool autoReconnect = false;
  
    static Match parseUrl(String url) {
      RegExp exp = new RegExp(r"^manta://((?:\w|\.)+)(?::(\d+))?/(.+)$");
      final matches = exp.allMatches(url);
      return matches.isEmpty ? null : matches.first;
    }`;

    mantaPaymentCode = `static void processPaymentRequest(BuildContext context, MantaWallet manta, PaymentRequestMessage paymentRequest) {
      // Validate account balance and destination as valid
      Destination dest = paymentRequest.destinations[0];
      String rawAmountStr = NumberUtil.getAmountAsRaw(dest.amount.toString());
      BigInt rawAmount = BigInt.tryParse(rawAmountStr);
      if (!Address(dest.destination_address).isValid()) {
        UIUtil.showSnackbar(AppLocalization.of(context).qrInvalidAddress, context);
      } else if (rawAmount == null || rawAmount > StateContainer.of(context).wallet.accountBalance) {
        UIUtil.showSnackbar(AppLocalization.of(context).insufficientBalance, context);
      } else if (rawAmount < BigInt.from(10).pow(24)) {
        UIUtil.showSnackbar(AppLocalization.of(context).minimumSend.replaceAll("%1", "0.000001"), context);
      } else {
        // Is valid, proceed
        Sheets.showAppHeightNineSheet(
          context: context,
          widget: SendConfirmSheet(
                    amountRaw: rawAmountStr,
                    destination: dest.destination_address,
                    manta: manta,
                    paymentRequest: paymentRequest
          )
        );
      }    
  }`


}