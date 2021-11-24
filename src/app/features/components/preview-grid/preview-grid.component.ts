
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DisplayGrid, GridsterConfig, GridsterItem, GridsterItemComponentInterface } from "angular-gridster2";
import { WidgetComponent } from "../../../core/models/widget-component";
import { PhoneProperties } from "../../../core/models/phone-properties";
import { PreviewService } from "../../../core/services/preview.service";
import { DesignPage } from "../../../core/models/design-page";
import { DesignService } from "../../../core/services/design.service";
import { PhoneService } from "../../../core/services/phone.service";
import { DesignElement } from 'src/app/core/models/design-element';
import { WidgetType } from 'src/app/core/models/widget-type';
import { AssetType } from 'src/app/core/models/asset-type';
import { DragAndDropService } from 'src/app/core/services/dragAnddrop.service';
import { CdkDragDrop, CdkDragEnter } from '@angular/cdk/drag-drop';
import { empty, Subscription } from 'rxjs';
import { DesignPosition } from 'src/app/core/models/design-position';
import { DeletionService } from 'src/app/core/services/deletion.service';
import { el } from 'date-fns/locale';



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

  dragEventSubscription: Subscription

  deletionEventSubscription: Subscription

  gridItemCoordinates: Map<GridsterItemComponentInterface, { x: number, y: number, width: number, height: number }>;
  //selected type
  // message: string;
  // subscription: Subscription;

  /* ---------------------------------------------------------- */

  // Constructor
  constructor(private previewService: PreviewService, private designService: DesignService, private phoneService: PhoneService, private dragDropService: DragAndDropService, private deletionService: DeletionService) {
    this.selectedWidget = null;
    this.currentDesignPage = null;
    this.dashboardComponents = new Array<WidgetComponent>();

    this.gridItemCoordinates = new Map<GridsterItemComponentInterface, { x: number, y: number, width: number, height: number }>();

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
      itemInitCallback: (item, itemComponent) => { this.itemChange(item, itemComponent); },
      itemChangeCallback: (item, itemComponent) => { this.itemChange(item, itemComponent); },
      // itemResizeCallback: PreviewGridComponent.itemResize,
    };

    // Apply phone options
    this.phoneService.currentPhoneState.subscribe(phone => {
      this.phoneOptions = phone;
    });

    this.dragEventSubscription = this.dragDropService.getEvent().subscribe(param => {
      this.addItem(param.type, param.x, param.y)
    })

    this.deletionEventSubscription = this.deletionService.getEvent().subscribe(data => {
      this.removeItem(data)
    })

    this.dragDropService.isOptionShownState.subscribe(isShown => {
      if (isShown) {
        this.gridOptions.displayGrid = 'always'
        this.changedOptions()
      }
      else {
        this.gridOptions.displayGrid = 'onDrag&Resize'
        this.changedOptions()
      }
    })



    //subscribe to type of selected widght 

    // this.message = ""
    // this.subscription = this.data.currentMessage.subscribe((message: string) => this.message = message)
  }

  /* ------------------------------------------------------- */

  // Method called on init of the page
  ngOnInit(): void {

    // Subscribe to changes of the Design
    this.designService.currentDesignState.subscribe(design => {
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
          if (this.dashboardComponents.filter(x => { return x.gridsterItem.id == item.gridsterItem.id }).length == 0) {
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

    this.dragDropService.sendGridItemCoordinates(this.gridItemCoordinates)

  }

  /* ----------------------------------------------- */

  changedOptions(): void {
    if (this.gridOptions.api && this.gridOptions.api.optionsChanged)
      this.gridOptions.api?.optionsChanged()
  }


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

    console.log('itemChanged', item, itemComponent);
    // const itemComponent = this.gridOptions.api.getItemComponent(item);
    const domRect = itemComponent.el.getBoundingClientRect();
    const clientX = domRect.left;
    const clientY = domRect.top;
    const width = domRect.width;
    const height = domRect.height;
    this.gridItemCoordinates.set(itemComponent, { x: clientX, y: clientY, width, height });
    console.log(this.gridItemCoordinates);
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

  //generate gristerItem's widget data
  generateWidgetData(type: WidgetType): DesignElement {

    let newDesignElement: DesignElement
    let text: string

    switch (type) {
      case WidgetType.LABEL:
        text = "Label"
        break;
      case WidgetType.GRAPH:
        text = "Graph"
        break;
      case WidgetType.BUTTON:
        text = "Button"
        break;
      case WidgetType.BARCHART:
        text = "Barchart"
        break;
      case WidgetType.PIECHART:
        text = "Piechart"
        break;
      case WidgetType.CARD:
        text = "Card"
        break;
      default:
        text = "Label"
        break
    }
    //value of new element should be pre-seted
    newDesignElement = {
      widgetType: type,
      assetType: AssetType.THERMOSTAT,
      text: "Label for " + text,
      values: [{
        asset: "Thermostat 1",
        time: new Date("2019-01-16"),
        value: "25",
        measurement: "°C"
      }]
    }
    return newDesignElement
  }

  /**
   * add an item into preivew
   */
  public addItem(value: WidgetType, x: number, y: number) {
    var maxCurrentId = this.currentDesignPage?.positions[this.currentDesignPage.positions.length - 1].id
    if (maxCurrentId != null) {
      const designpostion: DesignPosition = {
        id: maxCurrentId + 1,
        positionX: x,
        positionY: y,
        width: 1,
        height: 1,
        element: this.generateWidgetData(value)
      }
      // this.dashboardComponents.push({
      //   gridsterItem: { cols: 1, rows: 1, x, y, minItemCols: 1, minItemRows: 1 },
      //   widgetData: this.generateWidgetData(value)
      // })
      if (this.currentDesignPage != null) {
        this.currentDesignPage?.positions.push(designpostion)
        this.designService.updateData(this.currentDesignPage)
      }
    }
  }

  public removeItem(widget: WidgetComponent) {
    if (this.currentDesignPage != null) {
      this.currentDesignPage.positions = this.currentDesignPage.positions.filter(obj => JSON.stringify(obj.element) !== JSON.stringify(widget.widgetData))
      console.log(this.currentDesignPage)
      this.designService.updateData(this.currentDesignPage)
    }
  }

  /**
   * drag and drop
   * entered
   */
  enter(event: CdkDragEnter<any>) {
    console.log('entered');
  }

  // onDrop(event: CdkDragDrop<WidgetComponent[]>) {
  //   this.dragDropService.drop(event);
  // }
}
