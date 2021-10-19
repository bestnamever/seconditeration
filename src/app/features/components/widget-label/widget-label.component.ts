import {Component, Input, OnInit} from '@angular/core';
import {AssetType} from "../../../core/models/asset-type";

@Component({
  selector: 'app-widget-label',
  templateUrl: './widget-label.component.html',
  styleUrls: ['./widget-label.component.scss']
})
export class WidgetLabelComponent implements OnInit {

  // Input fields
  @Input('assetType') assetType: AssetType | undefined;


  // Variables

  // Constructor
  constructor() {
  }

  ngOnInit(): void {
  }

  isThermostat(): any { return this.assetType === AssetType.THERMOSTAT; }
  isSolar(): any { return this.assetType === AssetType.SOLAR; }

}
