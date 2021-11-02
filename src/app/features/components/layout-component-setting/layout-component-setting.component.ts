import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { DataSharingService } from "../../../core/services/data-sharing.service"
import { Subscription } from 'rxjs';

interface width {
  value: number
  viewValue: string
}

@Component({
  selector: 'app-layout-component-setting',
  templateUrl: './layout-component-setting.component.html',
  styleUrls: ['./layout-component-setting.component.scss']
})
export class LayoutComponentSettingComponent implements OnInit {

  message: string;
  subscription: Subscription;

  text: string;
  widths: width[];
  widthValue: number;

  constructor(private data: DataSharingService) {
    this.message = "something"
    this.text = "Room Temperature"
    this.widths = [
      { value: 30, viewValue: '30%' },
      { value: 50, viewValue: '50%' },
      { value: 66, viewValue: '66%' },
      { value: 100, viewValue: '100%' }
    ]
    this.widthValue = 0

    this.subscription = this.data.currentMessage.subscribe(message => this.message = message)
  }


  ngOnInit() {
  }

  selection(chip: MatChip, value: number) {
    this.widthValue = value
    chip.toggleSelected();
  }

}
