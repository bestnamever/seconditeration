import { Injectable } from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";
import { DesignPage } from "../models/design-page";
import { WidgetType } from "../models/widget-type";
import { AssetType } from "../models/asset-type";
import { environment } from "../../../environments/environment";
import {skip, takeLast} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DesignService {

  // Variables
  private currentDesignSubject: ReplaySubject<DesignPage>; // The state which we can edit
  public currentDesignState: Observable<DesignPage>; // The view-only state, where we can subscribe on to get updates.
  private historySize: number;

  // Constructor
  constructor() {
    this.historySize = 0;

    // Initialize variables
    this.currentDesignSubject = new ReplaySubject<DesignPage>(5); // Set the 1st design on init
    this.currentDesignState = this.currentDesignSubject.asObservable(); // Make a clone of the state which is read-only

    this.currentDesignSubject.next(this.getFirstDesign());
    this.historySize++;

    // A method that sends a message to console when the Design gets updated
    if (environment.useLocalStorage) {
      this.currentDesignState.pipe(skip(this.getHistorySize() - 1)).subscribe((design) => {
        localStorage.setItem('savedDesign', JSON.stringify(design))
      });
    }
  }

  public getHistorySize(): number {
    return this.historySize;
  }

  /* ----------------------------------------- */

  updateLocation(designPage: DesignPage): any {
    if(this.historySize < 5) { this.historySize++; }
    this.currentDesignState.pipe(skip(this.getHistorySize() - 1)).subscribe(x => {
      console.log("Look this is the OLD designPage:");
      console.log(x);
      console.log("Look this is the NEW designPage:");
      console.log(designPage);
      // this.currentDesignSubject.next(designPage);
    }).unsubscribe();
  }
  updateData(value: DesignPage): any {
    if(this.historySize < 5) { this.historySize++; }
    this.currentDesignState.pipe(skip(this.getHistorySize() - 1)).subscribe(x => {
      console.log("Look this is the OLD designPage:");
      console.log(x);
      console.log("Look this is the NEW designPage:");
      console.log(value);
      // this.currentDesignSubject.next(value);
    }).unsubscribe();
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
                  measurement: "KW"
                },
                {
                  asset: "Solar Collector 1",
                  time: new Date(new Date().getTime() - (1000 * 60 * 60 * 10)),
                  value: "1.2",
                  measurement: "KW"
                },
                {
                  asset: "Solar Collector 1",
                  time: new Date(new Date().getTime() - (1000 * 60 * 60 * 8)),
                  value: "1.3",
                  measurement: "KW"
                },
                {
                  asset: "Solar Collector 1",
                  time: new Date(new Date().getTime() - (1000 * 60 * 60 * 6)),
                  value: "1.9",
                  measurement: "KW"
                },
                {
                  asset: "Solar Collector 1",
                  time: new Date(new Date().getTime() - (1000 * 60 * 60 * 4)),
                  value: "1.8",
                  measurement: "KW"
                },
                {
                  asset: "Solar Collector 1",
                  time: new Date(new Date().getTime() - (1000 * 60 * 60 * 2)),
                  value: "1.2",
                  measurement: "KW"
                },
                {
                  asset: "Solar Collector 1",
                  time: new Date(new Date().getTime() + (1000 * 60 * 60 * 2)),
                  value: "1.1",
                  measurement: "KW"
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
  getSecondDesign(): DesignPage {
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
          }
        ]
      }
      //}
    }
  }
}

