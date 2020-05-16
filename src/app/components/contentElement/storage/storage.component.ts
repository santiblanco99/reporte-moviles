import { Component, OnInit } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

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


}