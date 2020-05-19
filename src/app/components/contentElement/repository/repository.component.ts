import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/services/repository.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Dependency } from 'src/app/models/dependency';
import { Repository } from 'src/app/models/repository';
import { AuthorCommits } from 'src/app/models/authorCommits';
import { DependencyExample } from 'src/app/models/dependencyExample';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {

  readmeHtml: any;
  readmeReady: boolean
  dataReady: boolean

  repository: Repository;

  dependencies: Dependency[];

  authorCommits: AuthorCommits[];


  constructor(private repoService: RepositoryService, private dbService: DatabaseService) {
    this.readmeReady = false;
  }
  async ngOnInit(): Promise<void> {

    this.dataReady = false;
    this.getRepositoryReadme();
    console.log("skjdfs");
    this.dbService.getDependencies().subscribe(data => {
      console.log('hey');
      this.dependencies = data.map(element => {
        const id = element.payload.doc.id;
        const data = element.payload.doc.data();
        return {
          title: data.title,
          desc: data.desc,
          id: id,
        } as Dependency
      });
    })

    this.repository = await this.repoService.getRepository().toPromise();
    let date = this.repository.updated_at;
    console.log("hola");
    console.log(date.toLocaleDateString);
    let formattedDate = new Date(date);
    this.repository.updated_at = formattedDate;

    //Get commits by author
    // let commitData = await this.repoService.getCommitsbyAuthor().toPromise();
    // this.authorCommits = commitData.map(element=>{
    //   return {
    //     author: element.author,
    //     total: element.total
    //   } as AuthorCommits
    // });
    // this.authorCommits.forEach(async authorCommit =>{
    //   await this.dbService.createAuthorCommit(authorCommit);
    // });
    this.dbService.getAuthorCommits().subscribe(commitData => {
      this.authorCommits = commitData.map(element => {
        let data = element.payload.doc.data();
        return {
          author: data.author,
          total: data.total
        } as AuthorCommits;
      });
      console.log("AuhtorCommits:");
      console.log(this.authorCommits);
      this.dataReady = true;
    });

  }

  getRepositoryReadme = () => {
    this.repoService.getRepoInfo().subscribe(data => {
      this.readmeHtml = data;
    });
  }

  handleReadmeClicked = () => {
    if (this.readmeHtml) {
      this.readmeReady = !this.readmeReady;
    } else {
      alert('Ha ocurrido un error cargando el README')
    }
  }

dependencyExamples = [
  {
    id: "2qjewUBaICl5pNf1ND8a",
    code: `@JsonSerializable()
    class NinjaNode {
      @JsonKey(name:'votingweight', fromJson: _toBigInt)
      BigInt votingWeight;
    
      @JsonKey(name:'uptime', fromJson: _toDouble)
      double uptime;
      
      @JsonKey(name:'score')
      int score;
    
      @JsonKey(name:'account')
      String account;
    
      @JsonKey(name:'alias')
      String alias;
    
      NinjaNode({this.votingWeight, this.uptime, this.score, this.account, this.alias});
    
      factory NinjaNode.fromJson(Map<String, dynamic> json) => _$NinjaNodeFromJson(json);
      Map<String, dynamic> toJson() => _$NinjaNodeToJson(this);
    }`
  },
  {
    id: "36daWnLDtUdNu1SYcRy2",
    code: `GetIt sl = GetIt.instance;

    void setupServiceLocator() {
      sl.registerLazySingleton<AccountService>(() => AccountService());
      sl.registerLazySingleton<DBHelper>(() => DBHelper());
      sl.registerLazySingleton<HapticUtil>(() => HapticUtil());
      sl.registerLazySingleton<BiometricUtil>(() => BiometricUtil());
      sl.registerLazySingleton<Vault>(() => Vault());
      sl.registerLazySingleton<SharedPrefsUtil>(() => SharedPrefsUtil());
      sl.registerLazySingleton<Logger>(() => Logger(printer: PrettyPrinter()));
    }`
  },
  {
    id: "4rPlpXDOySppPeksrxEb",
    code: `String getLocalCurrencyPrice(AvailableCurrency currency, {String locale = "en_US"}) {
      Decimal converted = Decimal.parse(_localCurrencyPrice) * NumberUtil.getRawAsUsableDecimal(_accountBalance.toString());
      return NumberFormat.currency(locale:locale, symbol: currency.getCurrencySymbol()).format(converted.toDouble());
    }`
  },
  {
    id: "7G1KfaZjhDrrHW8oonZa",
    code: `Widget build(BuildContext context) {
      SystemChrome.setSystemUIOverlayStyle(
          StateContainer.of(context).curTheme.statusBar);
      return OKToast(
        textStyle: AppStyles.textStyleSnackbar(context),
        backgroundColor: StateContainer.of(context).curTheme.backgroundDark,
        child: MaterialApp(
          debugShowCheckedModeBanner: false,
          title: 'Natrium',
          theme: ThemeData(
            dialogBackgroundColor:
                StateContainer.of(context).curTheme.backgroundDark,
            primaryColor: StateContainer.of(context).curTheme.primary,
            accentColor: StateContainer.of(context).curTheme.primary10,
            backgroundColor: StateContainer.of(context).curTheme.backgroundDark,
            fontFamily: 'NunitoSans',
            brightness: Brightness.dark,
          ),(...)`
  },
  {
    id: "8mjgQW4Jg9oi8EKY4IHy",
    code: `final FlutterSecureStorage secureStorage = new FlutterSecureStorage();

    Future<bool> legacy() async {
      return await sl.get<SharedPrefsUtil>().useLegacyStorage();
    }
  
    // Re-usable
    Future<String> _write(String key, String value) async {
      if (await legacy()) {
        await setEncrypted(key, value);
      } else {
        await secureStorage.write(key: key, value: value);
      }
      return value;
    }`
  },
  {
    id: "A1OxiNsdiOhLUxYK0dYg",
    code: `static String _parseData(String data, DataType type) {
      data = data.trim();
      if (type == DataType.RAW) {
        return data;
      } else if (type == DataType.URL) {
        if (isIP(data)) {
          return data;
        } else if (isURL(data)) {
          return data;
        }
      } else if (type == DataType.ADDRESS) {
        Address address = Address(data);
        if (address.isValid()) {
          return address.address;
        }(...)`
  },
  {
    id: "Cj9v9dhSIJxZ8nZZ6nAp",
    code: ` Future<void> _updateConnectionStatus(ConnectivityResult result) async {
      if (result != ConnectivityResult.none) {
        _isConnected = false;
        _isConnecting = false;
        try {
          var packageInfo = await PackageInfo.fromPlatform();
          _isConnecting = true;
          suspended = false;
          _channel = new IOWebSocketChannel.connect(_SERVER_ADDRESS,
              headers: {'X-Client-Version': packageInfo.buildNumber});
          log.d("Connected to service");
          _isConnecting = false;
          _isConnected = true;(...)`
  },
  {
    id: "FjPzDRMeMA4Y91xK0U2H",
    code: `static const String CONTACTS_SQL = "CREATE TABLE Contacts( 
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      name TEXT, 
      address TEXT, 
      monkey_path TEXT)";`
  },
  {
    id: "I2k8QDhfsRvehCecEtCl",
    code: `Future<bool> hasBiometrics() async {
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
    }`
  },
  {
    id: "IEl2TxiPjX9kkmmgxjNP",
    code: `Future<dynamic> makeHttpRequest(BaseRequest request) async {
      http.Response response = await http.post(_SERVER_ADDRESS_HTTP,
          headers: {'Content-type': 'application/json'},
          body: json.encode(request.toJson()));
      if (response.statusCode != 200) {
        return null;
      }
      Map decoded = json.decode(response.body);
      if (decoded.containsKey("error")) {
        return ErrorResponse.fromJson(decoded);
      }
      return decoded;
    }`
  },
  {
    id: "L2RpcwwA7XCeti2h69Lx",
    code: `initDb() async {
      io.Directory documentsDirectory = await getApplicationDocumentsDirectory();
      String path = join(documentsDirectory.path, "kalium.db");
      var theDb = await openDatabase(path,
          version: DB_VERSION, onCreate: _onCreate, onUpgrade: _onUpgrade);
      return theDb;
    }`
  },
  {
    id: "SmKHm6rrRchG0mYfTT6z",
    code: ` Widget _buildAccountListItem(
      BuildContext context, Account account, StateSetter setState) {
    return Slidable(
      secondaryActions: _getSlideActionsForAccount(context, account, setState),
      actionExtentRatio: 0.2,
      actionPane: SlidableStrechActionPane(),
      child: FlatButton(
          highlightColor: StateContainer.of(context).curTheme.text15,
          splashColor: StateContainer.of(context).curTheme.text15,
          onPressed: () {
            if (!_accountIsChanging) {
              // Change account
              if (!account.selected) {
                setState(() {
                  _accountIsChanging = true;
                });
                _changeAccount(account, setState);
              }
            }
          },(...)`
  },
  {
    id: "T4I5vcInn6FeDLHtPM7A",
    code: `static Future<AppLocalization> load(Locale locale) {
      currentLocale = locale;
      final String name =
          locale.countryCode == null ? locale.languageCode : locale.toString();
      final String localeName = Intl.canonicalizedLocale(name);
  
      return initializeMessages(localeName).then((bool _) {
        Intl.defaultLocale = localeName;
        return new AppLocalization();
      });
    }`
  },
  {
    id: "V7jCIqCq5wIliaFmUDgh",
    code: `void _registerBus() {
      _subscribeEventSub = EventTaxiImpl.singleton().registerTo<SubscribeEvent>().listen((event) {
        handleSubscribeResponse(event.response);
      });`
  },
  {
    id: "VOkdpLKfx3QObTFT6fJg",
    code: ` Future<void> _importContacts() async {
      UIUtil.cancelLockEvent();
      String filePath = await FilePicker.getFilePath(
          type: FileType.custom, allowedExtensions: ["txt"]);
      File f = File(filePath);
      if (!await f.exists()) {
        UIUtil.showSnackbar(
            AppLocalization.of(context).contactsImportErr, context);
        return;
      }(...)`
  },
  {
    id: "W0w6xTvs6lXC5mcXBbbF",
    code: `bool seedIsEncrypted(String seed) {
      if (seed == null) {
        return false;
      }
      try {
        String salted =
            NanoHelpers.bytesToUtf8String(NanoHelpers.hexToBytes(seed.substring(0, 16)));
        if (salted == "Salted__") {
          return true;
        }
        return false;
      } catch (e) {
        return false;
      }
    }`
  },
  {
    id: "WJtzxvXsyMT5fC6La6fs",
    code: `(...)PackageInfo.fromPlatform().then((packageInfo) {
      setState(() {
        versionString = "v\${packageInfo.version}";
      });
    });`
  },
  {
    id: "dyOmlWCyO7kJp9y0WQxY",
    code: `Future<bool> hasTapicEngine() async {
      if (!Platform.isIOS) {
        return false;
      }
      IosDeviceInfo deviceInfo = await DeviceInfoPlugin().iosInfo;
      String deviceIdentifier = deviceInfo.utsname.machine;
      switch (deviceIdentifier) {
        case 'iPhone5,1': // iPhone 5
        case 'iPhone5,2': // iPhone 5
        case 'iPhone5,3': // iPhone 5C
        case 'iPhone5,4': // iPhone 5C
        case 'iPhone6,1': // iPhone 5S
        case 'iPhone6,2': // iPhone 5S
        case 'iPhone7,2': // iPhone 6
        case 'iPhone7,1': // iPhone 6 plus
        case 'iPhone8,1': // iPhone 6s
        case 'iPhone8,2': // iPhone 6s plus
          return false;
        default:
          return true;
      }
    }`
  },
  {
    id: "eAaXU8AsxSZwF1pOPypn",
    code: `child: AutoSizeText(
      AppLocalization.of(context).receive,
      textAlign: TextAlign.center,
      style: AppStyles.textStyleButtonPrimary(context),
      maxLines: 1,
      stepGranularity: 0.5,
    ),(...)`
  },
  {
    id: "fxwGaQkVGWlocq6w2NMP",
    code: `static Widget showBlockExplorerWebview(BuildContext context, String hash) {
      cancelLockEvent();
      return WebviewScaffold(
        url: AppLocalization.of(context).getBlockExplorerUrl(hash),
        appBar: new AppBar(
          backgroundColor: StateContainer.of(context).curTheme.backgroundDark,
          brightness: StateContainer.of(context).curTheme.brightness,
          iconTheme: IconThemeData(color: StateContainer.of(context).curTheme.text),
        ),
      );
    }`
  },
  {
    id: "gG8QJ5t2vyWynTvtaOtr",
    code: `(...)child: KeyboardAvoider(
      duration: Duration(milliseconds: 0),
      autoScroll: true,
      focusPadding: 40,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          // Enter your password Text Field
          AppTextField(
            topMargin: 30,(...)`
  },
  {
    id: "gI1GsYsZsuOSAnmE0vbL",
    code: `(...)child: FlareActor(
      "assets/welcome_animation.flr",
      animation: "main",
      fit: BoxFit.contain,
      color: StateContainer.of(context)
          .curTheme
          .primary,
    ),(...)`
  },
  {
    id: "hjhUSrexddDT0Mm4YfTP",
    code: `AccountService() {
      _requestQueue = Queue();
      _isConnected = false;
      _isConnecting = false;
      suspended = false;
      _lock = Lock();
      initCommunication(unsuspend: true);
      _connectivitySubscription = _connectivity.onConnectivityChanged
          .listen((result) => _updateConnectionStatus(result));
    }`
  },
  {
    id: "oK0gaWXantkxCv0Bjhx3",
    code: `(...)Expanded(
      child: Center(
        child: Stack(
          children: <Widget>[
            _showShareCard ? Container(
                  child: AppShareCard(shareCardKey, SvgPicture.asset('assets/QR.svg'), SvgPicture.asset('assets/sharecard_logo.svg')),
                  alignment: AlignmentDirectional(0.0, 0.0),
                )
            : SizedBox(),(...)`
  },
  {
    id: "sx2PFafmySh1EVitTiRH",
    code: `Future<void> setSeedBackedUp(bool value) async {
      return await set(seed_backed_up_key, value);
    }`
  },
  {
    id: "vH4eoPZEHS16Yv9IZPnB",
    code: `/// App InheritedWidget
    /// This is where we handle the global state and also where
    /// we interact with the server and make requests/handle+propagate responses
    /// 
    /// Basically the central hub behind the entire app
    class StateContainerState extends State<StateContainer> {
      final Logger log = sl.get<Logger>();(...)`
  },
  {
    id: "y1Ql7AswaUSKQWSzNOfz",
    code: `void paintQrCode({String address}) {
      QrPainter painter = QrPainter(
        data:
            address == null ? StateContainer.of(context).wallet.address : address,
        version: 6,
        gapless: false,
        errorCorrectionLevel: QrErrorCorrectLevel.Q,
      );
      painter.toImageData(MediaQuery.of(context).size.width).then((byteData) {
        setState(() {
          receive = ReceiveSheet(
            qrWidget: Container(
                width: MediaQuery.of(context).size.width / 2.675,
                child: Image.memory(byteData.buffer.asUint8List())),
          );
        });
      });
    }`
  },
  {
    id: "y6y8Sp6axbOHrhzUBUk2",
    code: `Future<void> requestUpdate({bool pending = true}) async {
      if (wallet != null &&
          wallet.address != null &&
          Address(wallet.address).isValid()) {
        String uuid = await sl.get<SharedPrefsUtil>().getUuid();
        String fcmToken = await FirebaseMessaging().getToken();
        bool notificationsEnabled =
            await sl.get<SharedPrefsUtil>().getNotificationsOn();
        sl.get<AccountService>().clearQueue();
        sl.get<AccountService>().queueRequest(SubscribeRequest(
            account: wallet.address,
            currency: curCurrency.getIso4217Code(),
            uuid: uuid,
            fcmToken: fcmToken,
            notificationEnabled: notificationsEnabled));
        sl.get<AccountService>().queueRequest(
            AccountHistoryRequest(account: wallet.address));
        sl.get<AccountService>().processQueue();(...)`
  }
];

findCodeById(id:string){
  for(var i = 0; i < this.dependencyExamples.length;i++){
    let element = this.dependencyExamples[i];
    if(element.id == id){
      return element;
    }
  }
  return null;
}

languages = ["dart"];


}
