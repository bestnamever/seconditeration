import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { WidgetComponent } from 'src/app/core/models/widget-component';
import { component } from 'vue/types/umd';
import { PreviewService } from "../../../core/services/preview.service"

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

  widgetSelected: WidgetComponent | null;
  message: string | undefined;

  text: string | undefined
  measurement : string | undefined
  widths: width[];
  widthValue: number;

  constructor(private data: PreviewService) {
    this.message = "something"
    this.text = "Room Temperature"
    this.widths = [
      { value: 30, viewValue: '30%' },
      { value: 50, viewValue: '50%' },
      { value: 66, viewValue: '66%' },
      { value: 100, viewValue: '100%' }
    ]
    this.widthValue = 0
    this.widgetSelected = null
    this.data.currentlySelectedWidgetState.subscribe(widget => (
      this.message = widget?.widgetData.widgetType.toString(), 
      this.text = widget?.widgetData.text

      
      ))
  }

  ngOnInit() {

  }

  selection(chip: MatChip, value: number) {
    this.widthValue = value
    chip.toggleSelected();
  }

}
