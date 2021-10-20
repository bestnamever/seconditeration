import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
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
  constructor(private httpClient: HttpClient) {

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

  // Update a design
  update(designPage: DesignPage): void {

    // TEMPORARY EXAMPLE: Save the new design in the state because there is no API
    this.currentDesignSubject.next(designPage);

    // Send the design to the database, and listen to the response sent back by the API
    /*this.httpClient.put<any>(`/api/designs/` + design.id, design)
      .pipe(first((response: any) => {
        console.log(response);
        this.currentDesignSubject.next(response.newDesign); // Updates the object in the state
        return response;
    }));*/
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

  /*  { gridsterItem: { id: 'item1', cols: 1, rows: 1, y: 0, x: 0, minItemCols: 1, minItemRows: 1 }, widgetType: WidgetType.LABEL, assetType: AssetType.THERMOSTAT },
      { gridsterItem: { id: 'item1', cols: 1, rows: 1, y: 0, x: 1, minItemCols: 1, minItemRows: 1 }, widgetType: WidgetType.LABEL, assetType: AssetType.SOLAR },
      { gridsterItem: { id: 'item3', cols: 2, rows: 2, y: 1, x: 0, minItemCols: 2, minItemRows: 2 }, widgetType: WidgetType.GRAPH, assetType: AssetType.THERMOSTAT }

   */


}

