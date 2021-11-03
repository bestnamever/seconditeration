import { Component, Input, OnInit } from '@angular/core';

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

  assets: optionList[]
  properties: optionList[]

  text: string

  constructor() {
    this.assets = [
      { value: "ALTA Wireless Temperature Sensor", viewValue: "ALTA Wireless Temperature Sensor" },
      { value: "Govee Thermometer", viewValue: "Govee Thermometer" },
      { value: "Govee WIFI Thermometer", viewValue: "Govee WIFI Thermometer" },
      { value: "Zigbee 2500W", viewValue: "Zigbee 2500W" }
    ]

    this.properties = [
      { value: "C", viewValue: "Temperature(°C)" },
      { value: "F", viewValue: "Temperature(°F)" },
      { value: "K", viewValue: "Temperature(K)" }
    ]

    this.text = "example"
  }

  ngOnInit(): void {
  }

  setCardSetting(message: string) {
    this.text = message;
  }

}


