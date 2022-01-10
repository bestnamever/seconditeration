import { ChangeDetectorRef, Component, HostListener, Input, OnDestroy, OnInit, ɵclearResolutionOfComponentResourcesQueue } from '@angular/core';
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
import { PhoneDirection } from "../../../core/models/phone-direction";
import { el, tr } from 'date-fns/locale';
import { Components } from 'src/app/core/models/components';
import { Design } from 'src/app/core/models/design';
import { BackendService } from 'src/app/core/services/backend.service';
import { environment } from 'src/environments/environment';
import { ComponentThumbnailComponent } from '../component-thumbnail/component-thumbnail.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-preview-grid',
  templateUrl: './preview-grid.component.html',
  styleUrls: ['./preview-grid.component.scss']
})
export class PreviewGridComponent implements OnInit {

  @HostListener('window:keyup.delete', ['$event']) keyUp(e: KeyboardEvent) {
    if (this.selectedWidget != null) {
      console.log('key up', e);

      const data = {
        title: this.delete_title,
        descriptionHtml:
          'Are you sure you want to delete this <b>' + this.delete_component + '</b>?<br /><br />' +
          'Deleting this component is a <b>destructive</b> action, meaning that it cannot be reverted later.',
        alignActions: 'start',
        cancelText: 'CANCEL',
        successText: 'DELETE ' + this.delete_component.toUpperCase(),
        selectedWidget: this.selectedWidget
      }
      if (!this.isDialogShown) {
        const dialogRef = this.dialog.open(DialogComponent, {
          width: '30%',
          data: data
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result === "true") {
            this.deletionService.sendEvent(data.selectedWidget)
          }
        });
      }
      else {
        this.deletionService.sendEvent(data.selectedWidget)
      }
    }
  }

  // Input
  @Input('fullscreen') fullscreen: boolean | undefined;
  @Input('editMode') editMode: boolean | undefined;

  // Variables
  gridOptions: GridsterConfig;
  phoneOptions: PhoneProperties | undefined;
  phoneOrientation: PhoneDirection | undefined;
  dashboardComponents: Array<WidgetComponent>;
  pageName: string | undefined;
  delete_title: string;
  delete_component: string

  currentDesignPage: Design | null;
  selectedWidget: WidgetComponent | null;
  isDragging: boolean | null;
  selectedComponent: Components | null;
  isDialogShown: boolean | undefined;


  // dragEventSubscription: Subscription

  deletionEventSubscription: Subscription

  // NOT USED ANYMORE
  // gridItemCoordinates: Map<GridsterItemComponentInterface, { x: number, y: number, width: number, height: number }>;


  //selected type
  // message: string;
  // subscription: Subscription;

  /* ---------------------------------------------------------- */

  // Constructor
  constructor(private dialog: MatDialog, private backendService: BackendService, private previewService: PreviewService, private designService: DesignService, private phoneService: PhoneService, private dragDropService: DragAndDropService, private deletionService: DeletionService) {
    this.selectedWidget = null;
    this.currentDesignPage = null;
    this.isDragging = false;
    this.dashboardComponents = new Array<WidgetComponent>();
    this.selectedComponent = null;
    this.delete_title = "Delete this Component"
    this.delete_component = "Component"

    // this.gridItemCoordinates = new Map<GridsterItemComponentInterface, { x: number, y: number, width: number, height: number }>();

    this.gridOptions = {
      isMobile: true,
      mobileBreakpoint: 1,
      draggable: {
        enabled: false
      },
      resizable: {
        enabled: false
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

      //drag and drop
      enableEmptyCellClick: false,
      enableEmptyCellDrop: false,
      enableEmptyCellDrag: false,  // this one will give the background color
      enableOccupiedCellDrop: false,
      emptyCellClickCallback: this.emptyCellClick.bind(this),
      emptyCellDropCallback: this.emptyCellClick.bind(this),
      emptyCellDragCallback: this.emptyCellClick.bind(this),
      // itemResizeCallback: PreviewGridComponent.itemResize,
    };

    this.dragDropService.selectedWidgetState.subscribe(component => {
      this.selectedComponent = component
    }

    )

    this.deletionEventSubscription = this.deletionService.getEvent().subscribe(data => {
      this.removeItem(data)
    })

    this.dragDropService.isOptionShownState.subscribe(isShown => {
      if (isShown) {
        this.gridOptions.displayGrid = 'always'
        this.gridOptions.enableEmptyCellClick = true
        this.gridOptions.enableEmptyCellDrag = true
        this.gridOptions.enableEmptyCellDrop = true
        this.changedOptions()
      }
      else {
        this.gridOptions.displayGrid = 'onDrag&Resize'
        this.gridOptions.enableEmptyCellClick = false
        this.gridOptions.enableEmptyCellDrag = false
        this.gridOptions.enableEmptyCellDrop = false
        this.changedOptions()
      }
    });

    deletionService.isDialogShownState.subscribe(isShown => {
      if (isShown != null)
        this.isDialogShown = isShown
    })



    //subscribe to type of selected widght

    // this.message = ""
    // this.subscription = this.data.currentMessage.subscribe((message: string) => this.message = message)
  }


  /* ------------------------------------------------------- */

  // Method called on init of the page
  ngOnInit(): void {

    // Apply phone options
    this.phoneService.currentPhoneState.subscribe(phone => {
      this.phoneOptions = phone;
      if (this.gridOptions.api && this.gridOptions.api.resize) {
        this.gridOptions.api.resize();
      }
    });

    this.phoneService.currentOrientationState.subscribe(orientation => {
      this.phoneOrientation = orientation;
      if (this.gridOptions.api && this.gridOptions.api.resize) {
        this.gridOptions.api.resize();
      }
    })

    this.dragDropService.isOptionShownState.subscribe(data => {
      this.isDragging = data;
    })

    this.gridOptions.draggable = {
      enabled: this.editMode
    };
    this.gridOptions.resizable = {
      enabled: this.editMode
    }
    this.changedOptions();


    // Subscribe to changes of the Design
    this.designService.currentDesignState.subscribe(design => {
      if (design != null) {
        var ids = new Array<number>()
        var deletedComponentId!: any
        console.log('Starting to render the design..');
        console.log(design)

        this.currentDesignPage = design;
        if (design != null && design.widgets != null) {
          design.widgets.forEach((widget: DesignPosition) => {
            const item = {
              gridsterItem: {
                id: widget.id,
                cols: widget.width,
                rows: widget.height,
                x: widget.positionX,
                y: widget.positionY
              },
              widgetData: widget.element
            };

            ids.push(widget.id)

            // Check if the component is already added with the same properties (width, height, x, y, etc)
            if (this.dashboardComponents.filter(x => { return x.gridsterItem.id == item.gridsterItem.id }).length == 0) {
              this.dashboardComponents.push(item);
            }

            this.dashboardComponents.forEach(component => {
              if (component.widgetData != widget.element && component.gridsterItem.id == widget.id) {
                component.widgetData = widget.element
              }
            })
          });

          // get the component's id which is not inside of the design
          this.dashboardComponents.forEach(component => {
            if (!ids.includes(component.gridsterItem.id))
              deletedComponentId = component.gridsterItem.id
          })

          var temp = this.dashboardComponents
          var temp2 = temp.filter(x => {
            return x.gridsterItem.id != deletedComponentId
          })

          console.log("deleted component is ", this.dashboardComponents[deletedComponentId])
          //this.dashboardComponents.splice(deletedComponentId, 1)  infinite loop
          this.dashboardComponents = temp2
          console.log("final", this.dashboardComponents);
          console.log('Rendering finished!');
        }
      }
    });

    // Subscribe to the currently selected Widget
    this.previewService.currentlySelectedWidgetState.subscribe(widget => {
      this.selectedWidget = widget;

    });

    // this.dragDropService.sendGridItemCoordinates(this.gridItemCoordinates)

    // Subscirbe to page name
    this.previewService.currentPageNameState.subscribe(pageName => {
      if (pageName != null) {
        this.pageName = pageName
      }
      else {
        this.pageName = "Homepage";
        this.previewService.changePageName(this.pageName)
      }
    })
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
      this.currentDesignPage.widgets.forEach((widget: DesignPosition) => {
        if (widget.id == item.id) {
          console.log('An item with the id [' + widget.id + '] changed!');
          widget.positionX = item.x;
          widget.positionY = item.y;
          widget.width = item.cols;
          widget.height = item.rows;
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
    /*    const domRect = itemComponent.el.getBoundingClientRect();
        const clientX = domRect.left;
        const clientY = domRect.top;
        const width = domRect.width;
        const height = domRect.height;*/
    // this.gridItemCoordinates.set(itemComponent, { x: clientX, y: clientY, width, height });
    // console.log(this.gridItemCoordinates);
  }

  /* --------------------------------------- */

  selectItem(component: WidgetComponent): void {
    this.previewService.selectWidget(component);
    console.log("selected ", component)
  }

  getAspectRatio(): any {
    if (this.phoneOrientation == PhoneDirection.PORTRAIT) {
      return this.phoneOptions?.aspectRatio;
    } else {
      let aspectRatio = this.phoneOptions?.aspectRatio;
      const splittedRatio = aspectRatio?.split('/');
      // console.log(splittedRatio);
      if (splittedRatio != null) {
        aspectRatio = splittedRatio[1] + "/" + splittedRatio[0];
      }
      // console.log("Aspect Ratio is now [" + aspectRatio + "]");
      return aspectRatio;
    }
    return undefined;
  }

  getPreviewHeight(): any {
    if (this.phoneOptions?.phoneType == undefined) {
      const splittedRatio = this.phoneOptions?.aspectRatio.split("/");
      if (splittedRatio != null) {
        if (Number.parseInt(splittedRatio[0]) > Number.parseInt(splittedRatio[1])) {
          return undefined; // Width is higher, so LANDSCAPE mode
        } else {
          if (this.phoneOptions?.customHeight != null) {
            return this.phoneOptions.customHeight;
          }
          return '75%'; // Height is higher, so PORTRAIT mode
        }
      }
    } else {
      if (this.phoneOrientation == PhoneDirection.PORTRAIT) {
        if (this.phoneOptions?.customHeight != null) {
          return this.phoneOptions.customHeight;
        }
        return '75%';
      }
    }
    return undefined;
  }
  getPreviewWidth(): any {
    if (this.phoneOptions?.phoneType == undefined) {
      const splittedRatio = this.phoneOptions?.aspectRatio.split("/");
      if (splittedRatio != null) {
        if (Number.parseInt(splittedRatio[0]) > Number.parseInt(splittedRatio[1])) {
          if (this.phoneOptions?.customWidth != null) {
            return this.phoneOptions.customWidth;
          }
          return '65%'; // Width is higher, so LANDSCAPE mode
        } else {
          return undefined; // Height is higher, so PORTRAIT mode
        }
      }
    } else {
      if (this.phoneOrientation == PhoneDirection.PORTRAIT) {
        return undefined;
      } else {
        if (this.phoneOptions?.customWidth != null) {
          return this.phoneOptions.customWidth;
        }
        return '65%';
      }
    }
  }


  getMarginTop(): string | undefined {
    if (this.phoneOrientation == PhoneDirection.PORTRAIT) { return this.phoneOptions?.marginTop; }
    else { return undefined; }
  }
  getMarginBottom(): string | undefined {
    if (this.phoneOrientation == PhoneDirection.PORTRAIT) { return this.phoneOptions?.marginBottom }
    else { return undefined; }
  }
  getMarginLeft(): string | undefined {
    if (this.phoneOrientation == PhoneDirection.LANDSCAPE) { return this.phoneOptions?.marginTop; }
    else { return undefined; }
  }
  getMarginRight(): string | undefined {
    if (this.phoneOrientation == PhoneDirection.LANDSCAPE) { return this.phoneOptions?.marginBottom; }
    else { return undefined; }
  }

  getBorderState(component: WidgetComponent): any {
    if (this.isWidgetSelected(component) && this.editMode) {
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
      assetType: AssetType.ALL,
      text: "New " + text,
      values: [{
        assetName: "",
        assetId: "",
        time: new Date(),
        attributeName: "",
        value: "",
        measurement: ""
      }]
    }
    return newDesignElement
  }


  public removeItem(widget: WidgetComponent) {
    if (this.currentDesignPage != null) {
      console.log("current design page is ", this.currentDesignPage)
      this.currentDesignPage.widgets = this.currentDesignPage.widgets.filter(obj => JSON.stringify(obj.id) !== JSON.stringify(widget.gridsterItem.id))
      console.log(this.currentDesignPage)
      this.designService.updateData(this.currentDesignPage)
      console.log("current designpage is : ", this.currentDesignPage)
    }
  }



  // drag and drop
  emptyCellClick(event: MouseEvent, item: GridsterItem): void {

    var temp_component: WidgetComponent | undefined

    if (this.gridOptions.enableEmptyCellClick != false) {
      console.info('empty cell click', event, item, this.selectedComponent);
      const designpostion: DesignPosition = {
        id: (this.currentDesignPage?.widgets != null) && (this.currentDesignPage?.widgets.length != 0) ? this.currentDesignPage?.widgets[this.currentDesignPage.widgets.length - 1].id! + 1 : 1,
        positionX: item.x,
        positionY: item.y,
        width: 1,
        height: 1,
        element: this.generateWidgetData(this.selectedComponent?.componentType!)
      }
      if (this.currentDesignPage != null) {
        if (this.currentDesignPage?.widgets != null) {
          console.log("new add component is ", designpostion)
          this.currentDesignPage?.widgets.push(designpostion)
          console.log("Current design page :", this.currentDesignPage)
        }
        this.designService.updateData(this.currentDesignPage)
      }
    }
    this.dashboardComponents.forEach(component => {
      (component.gridsterItem.x == item.x && component.gridsterItem.y == item.y)
      temp_component = component
    })
    if (temp_component != null)
      this.selectItem(temp_component)
  }
}
