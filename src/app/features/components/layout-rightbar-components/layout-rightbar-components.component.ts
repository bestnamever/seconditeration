import { Component, Input, OnInit } from '@angular/core';
import { PreviewService } from "../../../core/services/preview.service"

interface optionList {
  value: string,
  viewValue: string
}

@Component({
  selector: 'app-layout-rightbar-components',
  templateUrl: './layout-rightbar-components.component.html',
  styleUrls: ['./layout-rightbar-components.component.scss']
})
export class LayoutRightbarComponentsComponent implements OnInit {

  // selected asset 
  assetSelected: string | undefined

  // selected measurement
  measurementSelected: string | undefined

  assets: optionList[]
  properties: optionList[]

  text: string

  constructor(private data: PreviewService) {
    this.assets = [
      { value: "ALTA Wireless Temperature Sensor", viewValue: "ALTA Wireless Temperature Sensor" },
      { value: "Govee Thermometer", viewValue: "Govee Thermometer" },
      { value: "Govee WIFI Thermometer", viewValue: "Govee WIFI Thermometer" },
      { value: "Zigbee 2500W", viewValue: "Zigbee 2500W" },
      { value: "0", viewValue: "Thermometer" },
      { value: '1', viewValue: "Solar panel" }
    ]

    this.properties = [
      { value: "°C", viewValue: "Temperature(°C)" },
      { value: "°F", viewValue: "Temperature(°F)" },
      { value: "K", viewValue: "Temperature(K)" }
    ]

    // set value on right side bar
    this.data.currentlySelectedWidgetState.subscribe(widget => (
      this.assetSelected = widget?.widgetData.assetType.toString(),
      this.measurementSelected = widget?.widgetData.values[0].measurement))

    this.text = "example"

  }

  ngOnInit(): void {
  }

  setCardSetting(message: string) {
    this.text = message;
  }

}


