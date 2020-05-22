import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { CustomImage } from 'src/app/models/customImage';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnChanges {
  @Input() commonImages: CustomImage[];
  themePhoto: CustomImage = {
    url: '',
    name: 'Theme\'s photo'
  }
  natriumFontsPhoto: CustomImage = {
    url: '',
    name: 'Fonts\'s photo'
  }

  natriumFontNunitoSansExamplePhoto: CustomImage = {
    url: '',
    name: 'Nunito Sans font example'
  }

  natriumFontNunutoSansExampleCode: string = `
  // Text style for alert dialog header
  static TextStyle textStyleDialogHeader(BuildContext context) {
    return TextStyle(
      fontFamily: "NunitoSans",
      fontSize: AppFontSizes._large,
      fontWeight: FontWeight.w700,
      color: StateContainer.of(context).curTheme.primary,
    );
  }

  // Text style for dialog options
  static TextStyle textStyleDialogOptions(BuildContext context) {
    return TextStyle(
      fontFamily: "NunitoSans",
      fontSize: AppFontSizes.medium,
      fontWeight: FontWeight.w600,
      color: StateContainer.of(context).curTheme.text,
    );
  }
  `;

  themePhotosList: CustomImage[] = [
    {
      name: 'Natrium',
      url: ''
    },
    {
      name: 'Titanium',
      url: ''
    },
    {
      name: 'Indium',
      url: ''
    },
    {
      name: 'Neptunium',
      url: ''
    },
    {
      name: 'Thorium',
      url: ''
    }
  ]
  changingThemeGif: CustomImage = {
    name: '',
    url: ''
  }

  changeThemeCode: string = `
  Future<void> _themeDialog() async {
    ThemeOptions selection = await showAppDialog<ThemeOptions>(
        ...);
    if (_curThemeSetting != ThemeSetting(selection)) {
      sl
          .get<SharedPrefsUtil>()
          .setTheme(ThemeSetting(selection))
          .then((result) {
        setState(() {
          StateContainer.of(context).updateTheme(ThemeSetting(selection));
          _curThemeSetting = ThemeSetting(selection);
        });
      });
    }
  }
  `;


  languageDe: CustomImage = {
    name: '',
    url: ''
  }

  languageAr: CustomImage = {
    name: '',
    url: ''
  }

  changeLanguageCode : string = `
  Future<void> _languageDialog() async {
    AvailableLanguage selection = await showAppDialog<AvailableLanguage>(
        ...);
    sl
        .get<SharedPrefsUtil>()
        .setLanguage(LanguageSetting(selection))
        .then((result) {
      if (StateContainer.of(context).curLanguage.language != selection) {
        setState(() {
          StateContainer.of(context).updateLanguage(LanguageSetting(selection));
        });
      }
    });
  }
  `;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.commonImages && this.commonImages.length > 0) {
      for (let item of this.commonImages) {
        if (item.name.includes('theme_natrium')) {
          this.themePhotosList[0].url = item.url;
        }
        else if (item.name.includes('theme_titanium')) {
          this.themePhotosList[1].url = item.url;
        }
        else if (item.name.includes('theme_indium')) {
          this.themePhotosList[2].url = item.url;
        }
        else if (item.name.includes('theme_neptunium')) {
          this.themePhotosList[3].url = item.url;
        }
        else if (item.name.includes('theme_thorium')) {
          this.themePhotosList[4].url = item.url;
        }
        else if (item.name.includes('natrium_fonts')) {
          this.natriumFontsPhoto = { ...item };
        }
        else if (item.name.includes('changing_theme_vid')) {
          this.changingThemeGif = { ...item };
        }
        else if (item.name.includes('font_nunito_sans_example')) {
          this.natriumFontNunitoSansExamplePhoto = { ...item };
        }
        else if (item.name.includes('language_de')) {
          this.languageDe = { ...item };
        }
        else if (item.name.includes('language_ar')) {
          this.languageAr = { ...item };
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