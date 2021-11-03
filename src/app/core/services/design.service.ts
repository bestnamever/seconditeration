import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { DesignPage } from "../models/design-page";
import { WidgetType } from "../models/widget-type";
import { AssetType } from "../models/asset-type";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DesignService {

  // Variables
  private currentDesignSubject: BehaviorSubject<DesignPage>; // The state which we can edit
  public currentDesignState: Observable<DesignPage>; // The view-only state, where we can subscribe on to get updates.


  // Constructor
  constructor() {

    // Initialize variables
    this.currentDesignSubject = new BehaviorSubject<DesignPage>(this.getFirstDesign()); // Set the 1st design on init
    this.currentDesignState = this.currentDesignSubject.asObservable(); // Make a clone of the state which is read-only

    // A method that sends a message to console when the Design gets updated
    if (environment.useLocalStorage) {
      this.currentDesignState.subscribe((design) => {
        localStorage.setItem('savedDesign', JSON.stringify(design))
      });
    }
  }

  /* ----------------------------------------- */

  updateLocation(designPage: DesignPage): any {
    this.currentDesignSubject.next(designPage);
  }

  /* ----------------------------------------- */

  getFirstDesign(): DesignPage {
    const savedDesign = localStorage.getItem('savedDesign');
    if (environment.useLocalStorage && savedDesign != null) {
      console.log('Got the design from local Storage!');
      console.log(savedDesign);
      return JSON.parse(savedDesign) as DesignPage;
    } else {
      return {
        name: "Temporary Page",
        positions: [
          {
            id: 0,
            positionX: 0,
            positionY: 0,
            width: 1,
            height: 1,
            element: {
              widgetType: WidgetType.LABEL,
              assetType: AssetType.THERMOSTAT,
              text: "Label for Thermostat",
              values: [{
                asset: "Thermostat 1",
                time: new Date("2019-01-16"),
                value: "25",
                measurement: "°C"
              }]
            }
          },
          {
            id: 1,
            positionX: 0,
            positionY: 1,
            width: 2,
            height: 1,
            element: {
              widgetType: WidgetType.GRAPH,
              assetType: AssetType.SOLAR,
              text: "Solar Energy",
              values: [
                {
                  asset: "Solar Collector 1",
                  time: new Date(new Date().getTime() - (1000 * 60 * 60 * 12)),
                  value: "0.1",
                  measurement: "°C"
                },
                {
                  asset: "Solar Collector 1",
                  time: new Date(new Date().getTime() - (1000 * 60 * 60 * 10)),
                  value: "1.2",
                  measurement: "°C"
                },
                {
                  asset: "Solar Collector 1",
                  time: new Date(new Date().getTime() - (1000 * 60 * 60 * 8)),
                  value: "1.3",
                  measurement: "°C"
                },
                {
                  asset: "Solar Collector 1",
                  time: new Date(new Date().getTime() - (1000 * 60 * 60 * 6)),
                  value: "1.9",
                  measurement: "°C"
                },
                {
                  asset: "Solar Collector 1",
                  time: new Date(new Date().getTime() - (1000 * 60 * 60 * 4)),
                  value: "1.8",
                  measurement: "°C"
                },
                {
                  asset: "Solar Collector 1",
                  time: new Date(new Date().getTime() - (1000 * 60 * 60 * 2)),
                  value: "1.2",
                  measurement: "°C"
                },
                {
                  asset: "Solar Collector 1",
                  time: new Date(new Date().getTime() + (1000 * 60 * 60 * 2)),
                  value: "1.1",
                  measurement: "°C"
                }
              ]
            }
          },
          {
            id: 2,
            positionX: 0,
            positionY: 2,
            width: 2,
            height: 1,
            element: {
              widgetType: WidgetType.BARCHART,
              assetType: AssetType.THERMOSTAT,
              text: "Temperature Bar",
              values: [
                {
                  asset: "Thermostat 1",
                  time: new Date("2019-01-16"),
                  value: "25",
                  measurement: "°C"
                },
                {
                  asset: "Thermostat 2",
                  time: new Date("2019-01-16"),
                  value: "19",
                  measurement: "°C"
                }
              ]
            }
          }
        ]
      }
      //}
    }
  }

  updateData(value: DesignPage): any {
    this.currentDesignSubject.next(value);
  }
}

