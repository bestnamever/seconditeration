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

@Injectable({
  providedIn: 'root'
})
export class DesignService {

  // Variables
  private currentDesignSubject: BehaviorSubject<Design>; // The state which we can edit
  public readonly currentDesignState: Observable<Design>; // The view-only state, where we can subscribe on to get updates.
  private readonly designHistory: Design[] // List of all submitted Designs, to keep track of history (for undo-ing but also for checking whether it has changed)
  public readonly currentAssets: any;

  // Constructor
  constructor(private openremoteService: OpenremoteService, private backendService: BackendService) {

    // Initialize variables
    this.currentDesignSubject = new BehaviorSubject<Design>(this.getFirstDesign()); // Set the 1st design on init
    this.currentDesignState = this.currentDesignSubject.asObservable(); // Make a clone of the state which is read-only
    this.designHistory = [];
    this.designHistory.push(this.getFirstDesign());
    this.currentAssets = openremoteService.getAssets();

    // openremote impl

    // A method that sends a message to console when the Design gets updated
    if (environment.useLocalStorage) {
      this.currentDesignState.subscribe((design) => {
        localStorage.setItem('savedDesign', JSON.stringify(design))
      });
    }
    else if (environment.useDatabase) {

      // Get design from database
      this.backendService.getResponse("design/1").subscribe(res => {

        console.log("get design 1: " + JSON.stringify(res))

        var response_desgin = res[0]
        var response_widgets

        this.backendService.getResponse("widget/1").subscribe(res_widgets => {

          response_widgets = res_widgets[0]
          console.log("get widgets : " + JSON.stringify(response_widgets.widgets))

          var designPage: Design = {
            name: response_desgin.name,
            id: response_desgin.id,
            display_device: response_desgin.display_device,
            safe_space: response_desgin.safe_space,
            display_safe_space: response_desgin.display_safe_space,
            page: {
              id: response_widgets.id,
              name: response_widgets.name,
              is_homepage: response_widgets.is_homepage,
              in_navigation: response_widgets.in_navigation,
            },
            widgets: []
          }
          for (var i = 0; i < response_widgets.widgets.length; i++) {
            console.log("get widgets are : " + response_widgets.widgets.length)
            var currentItem = response_widgets.widgets[i]
            console.log("get widget element is : " + JSON.stringify(currentItem))
            var designpostion: DesignPosition
            designpostion = {
              id: currentItem.id - 1,
              positionX: currentItem.position_x,
              positionY: currentItem.position_y,
              width: currentItem.width,
              height: currentItem.height,
              element: {
                widgetType: currentItem.widget_type,
                assetType: currentItem.assetType,
                text: currentItem.label,
                values: currentItem.values,
              }
            }
            console.log("get widget is : " + JSON.stringify(currentItem))
            designPage?.widgets.push(designpostion)
          }
          // this.currentDesignPage = designPage
          // console.log("here is it ：" + this.currentDesignPage)
          console.log("designpage :", designPage)
          this.updateData(designPage)
        })
      })
    }
  }

  public getHistoryByNumber(commitsAgo: number): Design {
    console.log("Current state of designHistory is:");
    console.log(this.designHistory);
    return this.designHistory[this.designHistory.length - commitsAgo];
  }
  public getHistoryLength(): number {
    return this.designHistory.length;
  }

  /* ----------------------------------------- */

  public updateLocation(design: Design): any {
    console.log("Started updating the location in DesignService...");
    const newDesignPage = JSON.stringify(design); // Duplicating the variable so it does not update here when frontend changes.
    this.currentDesignSubject.next(JSON.parse(newDesignPage));
    this.designHistory.push(JSON.parse(newDesignPage));
    console.log("Updated the location! New history is the following:");
    console.log(this.designHistory);

    if (environment.useDatabase) {
      // this.backendService.uploadDesign(design);
    }
  }

  public updateData(value: Design): any {
    console.log("Started updating the data in DesignService...");
    const newDesignPage = JSON.stringify(value); // Duplicating the variable so it does not update here when frontend changes.
    this.currentDesignSubject.next(JSON.parse(newDesignPage));
    this.designHistory.push(JSON.parse(newDesignPage));
    console.log("Updated the data! New history is the following:");
    console.log(this.designHistory);

    if (environment.useDatabase) {
      // this.backendService.uploadDesign(value);
    }
  }

  /* ----------------------------------------- */

  private getFirstDesign(): Design {
    const savedDesign = localStorage.getItem('savedDesign');
    if (environment.useLocalStorage && savedDesign != null) {
      console.log('Got the design from local Storage!');
      /*      console.log(savedDesign);*/
      return JSON.parse(savedDesign) as Design;
    }
    else {
      return {
        id: 0,
        name: "Main Design",
        display_device: PhoneType["Apple IPhone 13"],
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
                attributeName: "",
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
                  assetName: "Solar Collector 1",
                  assetId: "",
                  attributeName: "",
                  time: new Date(new Date().getTime() - (1000 * 60 * 60 * 12)),
                  value: "0.1",
                  measurement: "KW"
                },
                {
                  assetName: "Solar Collector 1",
                  assetId: "",
                  attributeName: "",
                  time: new Date(new Date().getTime() - (1000 * 60 * 60 * 10)),
                  value: "1.2",
                  measurement: "KW"
                },
                {
                  assetName: "Solar Collector 1",
                  assetId: "",
                  attributeName: "",
                  time: new Date(new Date().getTime() - (1000 * 60 * 60 * 8)),
                  value: "1.3",
                  measurement: "KW"
                },
                {
                  assetName: "Solar Collector 1",
                  assetId: "",
                  attributeName: "",
                  time: new Date(new Date().getTime() - (1000 * 60 * 60 * 6)),
                  value: "1.9",
                  measurement: "KW"
                },
                {
                  assetName: "Solar Collector 1",
                  assetId: "",
                  attributeName: "",
                  time: new Date(new Date().getTime() - (1000 * 60 * 60 * 4)),
                  value: "1.8",
                  measurement: "KW"
                },
                {
                  assetName: "Solar Collector 1",
                  assetId: "",
                  attributeName: "",
                  time: new Date(new Date().getTime() - (1000 * 60 * 60 * 2)),
                  value: "1.2",
                  measurement: "KW"
                },
                {
                  assetName: "Solar Collector 1",
                  assetId: "",
                  attributeName: "",
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
                  assetName: "Thermostat 1",
                  assetId: "",
                  attributeName: "",
                  time: new Date("2019-01-16"),
                  value: "25",
                  measurement: "°C"
                },
                {
                  assetName: "Thermostat 2",
                  assetId: "",
                  attributeName: "",
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
}

