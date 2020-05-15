import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';

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

  connectivityCode = `
  import 'package:connectivity/connectivity.dart';
  var connectivityResult = await (Connectivity().checkConnectivity());
  if (connectivityResult == ConnectivityResult.mobile) {
  // I am connected to a mobile network.
  } else if (connectivityResult == ConnectivityResult.wifi) {
  // I am connected to a wifi network.
  }`;
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    console.log('this.commonImages', this.commonImages)
    if (this.commonImages && this.commonImages.length > 0) {
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

