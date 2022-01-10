import {Component, Input, OnInit} from '@angular/core';
import {WidgetType} from "../../../core/models/widget-type";

@Component({
  selector: 'app-component-tooltip',
  templateUrl: './component-tooltip.component.html',
  styleUrls: ['./component-tooltip.component.scss']
})
export class ComponentTooltipComponent implements OnInit {

  // Variables
  @Input('widgetType') widgetType: WidgetType | undefined;
  @Input('widgetTitle') widgetTitle: string;

  // Constructor
  constructor() {
    this.widgetTitle = "Unknown"
  }

  // Init
  ngOnInit(): void {
  }

  /* ------------------------------------------------- */


}
