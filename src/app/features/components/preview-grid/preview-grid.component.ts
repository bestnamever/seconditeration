import {Component, OnInit} from '@angular/core';
import {GridsterConfig, GridsterItem, GridsterItemComponentInterface} from "angular-gridster2";
import {WidgetComponent} from "../../../core/models/widgetComponent";
import {WidgetType} from "../../../core/models/widget-type";
import {PhoneProperties} from "../../../core/models/phone-properties";
import {PhoneType} from "../../../core/models/phone-type";
import {PreviewService} from "../../../core/services/preview.service";

@Component({
  selector: 'app-preview-grid',
  templateUrl: './preview-grid.component.html',
  styleUrls: ['./preview-grid.component.scss']
})
export class PreviewGridComponent implements OnInit {

  // Variables
  gridOptions: GridsterConfig;
  phoneOptions: PhoneProperties;
  dashboardComponents: Array<WidgetComponent> | undefined;

  selectedWidget: WidgetComponent | null;

  // Constructor
  constructor(private previewService: PreviewService) {
    this.selectedWidget = null;

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
    this.phoneOptions = this.applyPhoneOptions(PhoneType.SAMSUNG_S20);
  }


  /* ------------------------------------------------------- */

  // Method called on init of the page
  ngOnInit(): void {
    this.dashboardComponents = [
      { gridsterItem: { id: 'item1', cols: 1, rows: 1, y: 0, x: 0, minItemCols: 1, minItemRows: 1 }, widgetType: WidgetType.LABEL },
      { gridsterItem: { id: 'item1', cols: 1, rows: 1, y: 0, x: 1, minItemCols: 1, minItemRows: 1 }, widgetType: WidgetType.LABEL },
      { gridsterItem: { id: 'item3', cols: 2, rows: 2, y: 1, x: 0, minItemCols: 2, minItemRows: 2 }, widgetType: WidgetType.GRAPH }
    ];

    // Subscribe to the currently selected Widget
    this.previewService.currentlySelectedWidgetState.subscribe(widget => {
      this.selectedWidget = widget;
    });
  }

  /* ----------------------------------------------- */

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
  }

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

  applyPhoneOptions(phoneType: PhoneType): any {
    switch (phoneType) {
      case PhoneType.SAMSUNG_S20:
        return {
          phoneType: PhoneType.SAMSUNG_S20,
          borderThickness: '4px',
          borderRadius: '30px',
          notch: true,
          notchRadius: '4px'
        }
    }
  }

}
