import {Component, OnInit} from '@angular/core';
import {GridsterConfig, GridsterItem, GridsterItemComponentInterface} from "angular-gridster2";
import {WidgetComponent} from "../../../core/models/widget-component";
import {PhoneProperties} from "../../../core/models/phone-properties";
import {PhoneType} from "../../../core/models/phone-type";
import {PreviewService} from "../../../core/services/preview.service";
import {DesignPage} from "../../../core/models/design-page";
import {DesignService} from "../../../core/services/design.service";
import {PhoneService} from "../../../core/services/phone.service";

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
  }


  /* ------------------------------------------------------- */

  // Method called on init of the page
  ngOnInit(): void {
    this.designService.currentDesignState.subscribe(design => {
      console.log('Starting to render the design..');
      this.currentDesignPage = design;
      this.dashboardComponents.length = 0; // clearing the array
      if(design != null) {
        design.positions.forEach(position => {
          console.log('Checking position with these properties:');
          console.log(position);
          this.dashboardComponents.push({
            gridsterItem: {
              id: 'item',
              cols: position.width,
              rows: position.height,
              x: position.positionX,
              y: position.positionY
            },
            widgetData: position.element
          })
        })
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
    console.log('itemChanged', item, itemComponent);
    // const itemComponent = this.gridOptions.api.getItemComponent(item);
    const domRect = itemComponent.el.getBoundingClientRect();
    const clientX = domRect.left;
    const clientY = domRect.top;
    const width = domRect.width;
    const height = domRect.height;
    // this.gridItemCoordinates.set(itemComponent, { x: clientX, y: clientY, width, height });
    // console.log(this.gridItemCoordinates);

    // Update the design in the storage
    if(this.currentDesignPage != null) {
      this.currentDesignPage.positions.forEach(position => {
        if(position.positionX == item.x && position.positionY == item.y) {

        }
      })
    }
  }




  /* --------------------------------------- */


  selectItem(component: WidgetComponent): void {
    this.previewService.selectWidget(component);
  }

  getBorderState(component: WidgetComponent): any {
    if(this.isWidgetSelected(component)) {
      return 'inset 0px 0px 0px 2px #4D9D2A';
    } else {
      return 'inset 0px 0px 0px 2px #E0E0E0';
    }
  }

  isWidgetSelected(component: WidgetComponent): any {
    return this.selectedWidget === component;
  }

}
