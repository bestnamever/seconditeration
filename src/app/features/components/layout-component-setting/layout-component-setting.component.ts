import { Component, Input, OnInit } from '@angular/core';
import { MatChip } from '@angular/material/chips';

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

  @Input('type')
  message: string;

  text: string;

  widths: width[];
  widthValue: number;

  constructor() {
    this.message = "something"
    this.text = "Room Temperature"
    this.widths = [
      { value: 30, viewValue: '30%' },
      { value: 50, viewValue: '50%' },
      { value: 66, viewValue: '66%' },
      { value: 100, viewValue: '100%' }
    ]
    this.widthValue = 0
  }

  ngOnInit() {
  }

  selection(chip: MatChip, value: number) {
    this.widthValue = value
    chip.toggleSelected();
  }

}
