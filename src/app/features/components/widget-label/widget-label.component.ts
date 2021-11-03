import { Component, Input, OnInit } from '@angular/core';
import { AssetType } from "../../../core/models/asset-type";
import { DesignElement } from "../../../core/models/design-element";

@Component({
  selector: 'app-widget-label',
  templateUrl: './widget-label.component.html',
  styleUrls: ['./widget-label.component.scss']
})
export class WidgetLabelComponent implements OnInit {

  // Input fields
  @Input('widgetData') widgetData: DesignElement | undefined;
  assetType: AssetType | undefined;
  value: string | undefined;
  text: string | undefined;
  measurement: string | undefined;

  // Variables

  // Constructor
  constructor() { }

  ngOnInit(): void {
    this.assetType = (this.widgetData?.assetType != null) ? this.widgetData?.assetType : AssetType.THERMOSTAT;
    this.value = (this.widgetData?.values[0].value != null) ? this.widgetData.values[0].value : 'NaN';
    this.text = (this.widgetData?.text != null) ? this.widgetData.text : 'Invalid Widget';
    this.measurement = (this.widgetData?.values[0].measurement != null) ? this.widgetData.values[0].measurement : "°C"
  }

  isThermostat(): any { return this.widgetData?.assetType === AssetType.THERMOSTAT; }
  isSolar(): any { return this.widgetData?.assetType === AssetType.SOLAR; }

}
