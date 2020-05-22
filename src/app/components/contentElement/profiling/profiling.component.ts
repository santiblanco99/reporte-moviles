import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CustomImage } from 'src/app/models/customImage';

@Component({
  selector: 'app-profiling',
  templateUrl: './profiling.component.html',
  styleUrls: ['./profiling.component.css']
})
export class ProfilingComponent implements OnChanges {
  @Input() commonImages: CustomImage[];
  networkBeforeChangesVid: CustomImage = {
    name: 'Video network before changes',
    url: ''
  }


  memoryBeforeChangesImg: CustomImage = {
    name: 'Memory on network before before changes',
    url: ''
  }

  networkAfterChangesVid: CustomImage = {
    name: 'Video network before changes',
    url: ''
  }


  memoryAfterChangesImg: CustomImage = {
    name: 'Memory on network after before changes',
    url: ''
  }

  memoryOnChangingWalletImg: CustomImage = {
    name: 'Memory on changing wallet',
    url: ''
  }
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.commonImages && this.commonImages.length > 0) {
      for (let item of this.commonImages) {
        if (item.name.includes('network_before_vid')) {
          this.networkBeforeChangesVid = { ...item };
        }
        if (item.name.includes('network_before_img')) {
          this.memoryBeforeChangesImg = { ...item };
        }
        if (item.name.includes('network_after_img')) {
          this.memoryAfterChangesImg = { ...item };
        }
        if (item.name.includes('network_after_vid')) {
          this.networkAfterChangesVid = { ...item };
        }
        if (item.name.includes('memory_changing_wallet')) {
          this.memoryOnChangingWalletImg = { ...item };
        }
      }
    }
  }

}
