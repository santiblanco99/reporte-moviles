import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';

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
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.commonImages && this.commonImages.length > 0) {
      const themePhotoTemp = this.commonImages.find(item => item.name.includes('natrium_themes'));
      const natriumFontsPhotoTemp = this.commonImages.find(item => item.name.includes('natrium_fonts'));
      if (themePhotoTemp) {
        this.themePhoto = { ...themePhotoTemp };
      }
      if (natriumFontsPhotoTemp){
        this.natriumFontsPhoto = {...natriumFontsPhotoTemp};
      }
    }
  }
}

class CustomImage {
  url: string;
  name: string;
}