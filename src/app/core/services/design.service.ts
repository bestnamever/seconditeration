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
      console.log('The design has been updated!');
      console.log(design);
    });
  }

  /* ----------------------------------------- */

  update(): any {

  }

  /* ----------------------------------------- */

  getFirstDesign(): DesignPage {
    return {
      name: "Temporary Page",
      positions: [{
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
      }]
    }
  }


}

