import {Component, Input, OnInit} from '@angular/core';
import {WidgetType} from "../../../core/models/widget-type";
import {DesignElement} from "../../../core/models/design-element";

@Component({
  selector: 'app-preview-parentwidget',
  templateUrl: './preview-parentwidget.component.html',
  styleUrls: ['./preview-parentwidget.component.scss']
})
export class PreviewParentwidgetComponent implements OnInit {

  // Variables
  @Input('widgetData') widgetData: DesignElement | undefined;

  // Constructor
  constructor() {
  }

  ngOnInit(): void {
    console.log('Rendering PreviewParentWidget with the following data:');
    console.log(this.widgetData);
  }

  /* -------------------------------- */

  // ngIf methods
  isLabel(): boolean { return this.widgetData?.widgetType === WidgetType.LABEL; }
  isGraph(): boolean { return this.widgetData?.widgetType === WidgetType.GRAPH; }
  isBarChart(): boolean { return this.widgetData?.widgetType === WidgetType.BARCHART }

}
