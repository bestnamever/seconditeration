import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { WidgetComponent } from 'src/app/core/models/widget-component';
import { component } from 'vue/types/umd';
import { PreviewService } from "../../../core/services/preview.service"
import { DesignService } from "../../../core/services/design.service";
import { GridsterItem } from 'angular-gridster2';
import { DesignPage } from 'src/app/core/models/design-page';
import { concat } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

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

  //page value
  designPage: DesignPage | undefined

  // selected widget
  widget: GridsterItem | undefined

  // selected widget type
  type: string | undefined;

  // selected widget label text
  text: string | undefined;

  // selected widget value
  value: string | undefined;


  widths: width[];
  widthValue: number;

  constructor(private inputData: PreviewService, private outputData: DesignService) {
    this.text = "Room Temperature"
    this.widths = [
      { value: 30, viewValue: '30%' },
      { value: 50, viewValue: '50%' },
      { value: 66, viewValue: '66%' },
      { value: 100, viewValue: '100%' }
    ]
    this.widthValue = 0

    // set value on right side bar
    this.inputData.currentlySelectedWidgetState.subscribe(widget => (
      this.widget = widget?.gridsterItem,
      this.type = widget?.widgetData.widgetType.toString(),
      this.text = widget?.widgetData.text,
      this.value = widget?.widgetData.values[0].value,
      console.log(this.widget)
    ))

    this.outputData.currentDesignState.subscribe(designpage => (
      this.designPage = designpage
    ))
  }

  ngOnInit() {

  }

  // select width by chips
  selectionOnChip(chip: MatChip, value: number) {
    this.widthValue = value
    chip.toggleSelected();
  }

  //select value by input textarea
  setValue(value: string) {

    //set textarea
    this.value = value

    // change value in designpage
    this.designPage?.positions.forEach(element => {
      if (element.id == this.widget?.id) {
        element.element.values[0].value = value
      }
    })

    // subscript to this.deisgnpage
    if (this.designPage != null)
      this.outputData.updateData(this.designPage)
  }

  testsetvalue() {
    this.designPage?.positions.forEach(element => {
      if (element.id == this.widget?.id) {
        console.log(element.element.values[0]) //out before design page
        console.log("before value is :" + element.element.values[0].value) //output 25

        this.setValue("300")

        this.outputData.currentDesignState.subscribe(designPage => console.log(designPage.positions[0].element.values[0])) //output current design page
        console.log("now value is :" + element.element.values[0].value) //output 100
      }
    })
  }
}



