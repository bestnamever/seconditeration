import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {DesignPage} from "../models/design-page";
import {WidgetType} from "../models/widget-type";
import {AssetType} from "../models/asset-type";

@Injectable({
  providedIn: 'root'
})
export class DesignService {

  // Variables
  private currentDesignSubject: BehaviorSubject<DesignPage | null>; // The state which we can edit
  public currentDesignState: Observable<DesignPage | null>; // The view-only state, where we can subscribe on to get updates.


  // Constructor
  constructor() {

    // Initialize variables
    this.currentDesignSubject = new BehaviorSubject<DesignPage | null>(this.getFirstDesign()); // Set the 1st design on init
    this.currentDesignState = this.currentDesignSubject.asObservable(); // Make a clone of the state which is read-only

    // A method that sends a message to console when the Design gets updated
    this.currentDesignState.subscribe((design) => {
      localStorage.setItem('savedDesign', JSON.stringify(design))
    });
  }

  /* ----------------------------------------- */

  update(designPage: DesignPage): any {
    this.currentDesignSubject.next(designPage);
  }

  /* ----------------------------------------- */

  getFirstDesign(): DesignPage {
    const savedDesign = localStorage.getItem('savedDesign');
    if(savedDesign != null) {
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
                value: "25"
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
              widgetType: WidgetType.LABEL,
              assetType: AssetType.SOLAR,
              text: "Solar Energy",
              values: [{
                asset: "Solar Collector 1",
                time: new Date("2019-01-16"),
                value: "1060"
              }]
            }
          }
        ]
      }
    }
  }


}

