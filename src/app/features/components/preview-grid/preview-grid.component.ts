import { Component, OnDestroy, OnInit } from '@angular/core';
import { GridsterConfig, GridsterItem, GridsterItemComponentInterface } from "angular-gridster2";
import { WidgetComponent } from "../../../core/models/widget-component";
import { PhoneProperties } from "../../../core/models/phone-properties";
import { PhoneType } from "../../../core/models/phone-type";
import { PreviewService } from "../../../core/services/preview.service";
import { DesignPage } from "../../../core/models/design-page";
import { DesignService } from "../../../core/services/design.service";
import { PhoneService } from "../../../core/services/phone.service";
import {skip, take, takeLast} from "rxjs/operators";



@Component({
  selector: 'app-preview-grid',
  templateUrl: './preview-grid.component.html',
  styleUrls: ['./preview-grid.component.scss']
})
export class PreviewGridComponent implements OnInit {

  // Variables
  gridOptions: GridsterConfig;
  phoneOptions: PhoneProperties | undefined;
  dashboardComponents: Array<WidgetComponent>;

  currentDesignPage: DesignPage | null;
  selectedWidget: WidgetComponent | null;

  //selected type
  // message: string;
  // subscription: Subscription;

  /* ---------------------------------------------------------- */

  // Constructor
  constructor(private previewService: PreviewService, private designService: DesignService, private phoneService: PhoneService) {
    this.selectedWidget = null;
    this.currentDesignPage = null;
    this.dashboardComponents = new Array<WidgetComponent>();

    this.gridOptions = {
      isMobile: true,
      mobileBreakpoint: 1,
      draggable: {
        enabled: true
      },
      resizable: {
        enabled: true
      },
      pushItems: true,
      margin: 12,
      outerMargin: true,
      outerMarginTop: 36,
      outerMarginBottom: 18,
      outerMarginLeft: 18,
      outerMarginRight: 18,
      minCols: 2,
      maxCols: 2,
      minRows: 2,
      maxRows: 100,
      gridType: 'scrollVertical',
      pushResizeItems: true,
      disableScrollHorizontal: true,
      displayGrid: 'onDrag&Resize',
      itemInitCallback: (item, itemComponent) => { this.itemInit(item, itemComponent); },
      itemChangeCallback: (item, itemComponent) => { this.itemChange(item, itemComponent); },
      // itemResizeCallback: PreviewGridComponent.itemResize,
    };

    // Apply phone options
    this.phoneService.currentPhoneState.subscribe(phone => {
      this.phoneOptions = phone;
    });

    //subscribe to type of selected widght
    // this.message = ""
    // this.subscription = this.data.currentMessage.subscribe((message: string) => this.message = message)
  }

  /* ------------------------------------------------------- */

  // Method called on init of the page
  ngOnInit(): void {

    // Subscribe to changes of the Design
    this.designService.currentDesignState.pipe(skip(this.designService.getHistorySize() - 1)).subscribe(design => {
      console.log('Starting to render the design..');
      this.currentDesignPage = design;
      if (design != null) {
        design.positions.forEach(position => {
          const item = {
            gridsterItem: {
              id: position.id,
              cols: position.width,
              rows: position.height,
              x: position.positionX,
              y: position.positionY
            },
            widgetData: position.element
          };

          // Check if the component is already added with the same properties (width, height, x, y, etc)
          if (this.dashboardComponents.filter(x => { return (x.widgetData == item.widgetData); }).length == 0) {
            this.dashboardComponents.push(item);
          }
        });
        console.log('Rendering finished!');
        console.log(this.dashboardComponents);
      }
    });

    // Subscribe to the currently selected Widget
    this.previewService.currentlySelectedWidgetState.subscribe(widget => {
      this.selectedWidget = widget;
    });

  }

  /* ----------------------------------------------- */

  itemInit(item: GridsterItem, itemComponent: GridsterItemComponentInterface): void {

  }

  itemChange(item: GridsterItem, itemComponent: GridsterItemComponentInterface): void {

    // Update the design in the storage
    if (this.currentDesignPage != null) {
      this.currentDesignPage.positions.forEach(position => {
        if (position.id == item.id) {
          console.log('An item with the id [' + position.id + '] changed!');
          position.positionX = item.x;
          position.positionY = item.y;
          position.width = item.cols;
          position.height = item.rows;
          if (this.currentDesignPage != null) {
            this.designService.updateLocation(this.currentDesignPage);
          } else {
            console.error("Could not update the Design! CurrentDesignPage state does not exist!");
          }
        }
      })
    }
  }




  /* --------------------------------------- */


  selectItem(component: WidgetComponent): void {
    this.previewService.selectWidget(component);
    // console.log(this.previewService.currentlySelectedWidgetState)
  }

  getBorderState(component: WidgetComponent): any {
    if (this.isWidgetSelected(component)) {
      return 'inset 0px 0px 0px 2px #4D9D2A';
    } else {
      return 'inset 0px 0px 0px 2px #E0E0E0';
    }
  }

  isWidgetSelected(component: WidgetComponent): any {
    return this.selectedWidget === component;
  }

}
