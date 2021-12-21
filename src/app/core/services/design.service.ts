import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { WidgetType } from "../models/widget-type";
import { AssetType } from "../models/asset-type";
import { environment } from "../../../environments/environment";
import { OpenremoteService } from "./openremote.service";
import { Design } from "../models/design";
import { PhoneType } from "../models/phone-type";
import { BackendService } from "./backend.service";
import { DesignPosition } from '../models/design-position';
import {DesignElementvalue} from "../models/design-elementvalue";

@Injectable({
  providedIn: 'root'
})
export class DesignService {


  // Variables
  private currentDesignSubject: BehaviorSubject<Design | undefined>; // The state which we can edit
  public readonly currentDesignState: Observable<Design | undefined>; // The view-only state, where we can subscribe on to get updates.
  private readonly designHistory: Design[] // List of all submitted Designs, to keep track of history (for undo-ing but also for checking whether it has changed)
  public readonly currentAssets: any;



  // Constructor
  constructor(private openremoteService: OpenremoteService, private backendService: BackendService) {

    // Initialize variables
    const firstDesign = this.getFirstDesign();
    this.currentDesignSubject = new BehaviorSubject<Design | undefined>(firstDesign); // Set the 1st design on init
    this.currentDesignState = this.currentDesignSubject.asObservable(); // Make a clone of the state which is read-only
    this.currentAssets = openremoteService.getAssets();

    // Setup history object
    this.designHistory = [];
    if(firstDesign != null) {
      this.designHistory.push(firstDesign);
    }

    // If using local storage: Save when the design changes.
    if (environment.useLocalStorage) {
      this.currentDesignState.subscribe((design) => {
        localStorage.setItem('savedDesign', JSON.stringify(design))
      });
    }

    // If using database: Get the initial database objects
    else if (environment.useDatabase) {
      this.getDesignFromDatabase();
/*      this.currentDesignState.subscribe(design => {
        console.log("Current designState in DesignService is the following: ", design)
        if(design != null) {
          console.log("Pushing new Design into Database! [History length is " + this.designHistory.length + "]");
          this.backendService.uploadDesign(design);
        }
      });*/
    }
  }


  /* -------------------------------------------------------------------------------- */
  /*                Update Methods for saving new Data into state                     */
  /* -------------------------------------------------------------------------------- */

  public updateLocation(design: Design): any {
    console.log("Started updating the data in DesignService...");
    const newDesignPage = JSON.stringify(design); // Duplicating the variable so it does not update here when frontend changes.
    this.currentDesignSubject.next(JSON.parse(newDesignPage));
    this.designHistory.push(JSON.parse(newDesignPage));
    console.log("Updated the location! New history is the following:");
    console.log(this.designHistory);
  }

  public updateData(value: Design): any {
    console.log("Started updating the data in DesignService...");
    const newDesignPage = JSON.stringify(value); // Duplicating the variable so it does not update here when frontend changes.
    this.currentDesignSubject.next(JSON.parse(newDesignPage));
    this.designHistory.push(JSON.parse(newDesignPage));
    console.log("Updated the data! New history is the following:");
    console.log(this.designHistory);
  }




  /* -------------------------------------------------------------------------------- */
  /*                         Database Related Functions                               */
  /* -------------------------------------------------------------------------------- */

  // Get design from database
  private getDesignFromDatabase() {

    // Get design from database
    this.backendService.getResponse("design/1").subscribe(res => {
      console.log("Result from design/1 was: ", res);
      const response_design = res[0];
      let response_widgets;
      this.backendService.getResponse("widget/1").subscribe(res_widgets => {
        console.log("Result from widget/1 was: ", res_widgets)
        response_widgets = res_widgets[0];

        // Converting received data into Design object.
        const designPage: Design = {
          name: response_design.name,
          id: response_design.id,
          display_device: response_design.display_device,
          safe_space: response_design.safe_space,
          display_safe_space: response_design.display_safe_space,
          page: {
            id: response_widgets.id,
            name: response_widgets.name,
            is_homepage: response_widgets.is_homepage,
            in_navigation: response_widgets.in_navigation,
          },
          widgets: []
        };

        // Looping through Widgets, and converting their data.
        for (var i = 0; i < response_widgets.widgets.length; i++) {
          let currentItem = response_widgets.widgets[i];
          let designpostion: DesignPosition = {
            id: currentItem.id - 1,
            positionX: currentItem.position_x,
            positionY: currentItem.position_y,
            width: currentItem.width,
            height: currentItem.height,
            element: {
              widgetType: currentItem.widget_type,
              assetType: currentItem.asset_type,
              text: currentItem.label,
              values: currentItem.values as DesignElementvalue[],
            }
          }
          designPage.widgets.push(designpostion);
        }

        // Last function is to update the data in state.
        this.updateData(designPage)
      })
    })
  }





  /* -------------------------------------------------------------------------------- */
  /*                       Simple filter / query methods                              */
  /* -------------------------------------------------------------------------------- */

  public getHistoryByNumber(commitsAgo: number): Design {
    console.log("Current state of designHistory is:");
    console.log(this.designHistory);
    return this.designHistory[this.designHistory.length - commitsAgo];
  }

  public getHistoryLength(): number {
    return this.designHistory.length;
  }





  /* -------------------------------------------------------------------------------- */
  /*               Initial Value methods (getting 1st design etc)                     */
  /* -------------------------------------------------------------------------------- */

  private getFirstDesign(): Design | undefined {
    const savedDesign = localStorage.getItem('savedDesign');
    if (environment.useLocalStorage && savedDesign != null) {
      console.log('Got the design from local Storage!');
      /*      console.log(savedDesign);*/
      return JSON.parse(savedDesign) as Design;
    }
    else if(environment.useDatabase == false) {
      return {
        id: 0,
        name: "Main Design",
        display_device: "Apple IPhone 13",
        safe_space: 0,
        display_safe_space: false,
        page: {
          id: 0,
          name: "Homepage",
          is_homepage: true,
          in_navigation: true
        },
        widgets: [
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
                assetName: "Thermostat 1",
                assetId: "",
                time: new Date("2019-01-16"),
                attributeName: "",
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
                  assetName: "Solar Collector 1",
                  assetId: "",
                  time: new Date(new Date().getTime() - (1000 * 60 * 60 * 12)),
                  attributeName: "",
                  value: "0.1",
                  measurement: "KW"
                },
                {
                  assetName: "Solar Collector 1",
                  assetId: "",
                  time: new Date(new Date().getTime() - (1000 * 60 * 60 * 10)),
                  attributeName: "",
                  value: "1.2",
                  measurement: "KW"
                },
                {
                  assetName: "Solar Collector 1",
                  assetId: "",
                  time: new Date(new Date().getTime() - (1000 * 60 * 60 * 8)),
                  attributeName: "",
                  value: "1.3",
                  measurement: "KW"
                },
                {
                  assetName: "Solar Collector 1",
                  assetId: "",
                  time: new Date(new Date().getTime() - (1000 * 60 * 60 * 6)),
                  attributeName: "",
                  value: "1.9",
                  measurement: "KW"
                },
                {
                  assetName: "Solar Collector 1",
                  assetId: "",
                  time: new Date(new Date().getTime() - (1000 * 60 * 60 * 4)),
                  attributeName: "",
                  value: "1.8",
                  measurement: "KW"
                },
                {
                  assetName: "Solar Collector 1",
                  assetId: "",
                  time: new Date(new Date().getTime() - (1000 * 60 * 60 * 2)),
                  attributeName: "",
                  value: "1.2",
                  measurement: "KW"
                },
                {
                  assetName: "Solar Collector 1",
                  assetId: "",
                  time: new Date(new Date().getTime() + (1000 * 60 * 60 * 2)),
                  attributeName: "",
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
                  assetName: "Thermostat 1",
                  assetId: "",
                  time: new Date("2019-01-16"),
                  attributeName: "",
                  value: "25",
                  measurement: "°C"
                },
                {
                  assetName: "Thermostat 2",
                  assetId: "",
                  time: new Date("2019-01-16"),
                  attributeName: "",
                  value: "19",
                  measurement: "°C"
                }
              ]
            }
          }
        ]
      }
    } else {
      return undefined;
    }
  }
}

