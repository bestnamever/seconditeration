import { AssetFilter } from './../../../core/models/asset-filter';
import {
  Component,
  OnInit,
  Optional
} from '@angular/core';
import { AssetType } from 'src/app/core/models/asset-type';
import { AssetFilterService } from 'src/app/core/services/assetFilter.service';
import { Components } from 'src/app/core/models/components';
import { WidgetType } from 'src/app/core/models/widget-type';
import { DragAndDropService } from 'src/app/core/services/dragAnddrop.service';
import { GridsterItemComponentInterface } from 'angular-gridster2';
import { OpenremoteService } from 'src/app/core/services/openremote.service';
import {TooltipService} from "../../../core/services/tooltip.service";

@Component({
  selector: 'app-layout-leftbar',
  templateUrl: './layout-leftbar.component.html',
  styleUrls: ['./layout-leftbar.component.scss']
})
export class LayoutLeftbarComponent implements OnInit {

  searchValue: string; // Value for the component searchbox
  selectedAssetType: AssetType; // Value for the asset-type dropdown

  //assetTypeData: Array<AssetType>; // All availible asset types

  selectedFilter: AssetFilter | null;
  hoveredWidgetType: WidgetType | undefined;

  isSelected: boolean | null;

  dragPosition: { x: 0, y: 0 };

  isDragging = false

  //array for components
  components: Components[]
  assetTypes: any[]

  //array for selected components
  selectedComponents: Components[]
  gridItemCoordinates: any;

  constructor(private assetFiterService: AssetFilterService, private dragdropService: DragAndDropService, private openremoteService: OpenremoteService, private tooltipService: TooltipService) {
    this.searchValue = '';
    //this.assetTypeData = Object.values(AssetType);
    this.selectedFilter = null;
    this.selectedAssetType = AssetType.ALL
    this.components = this.getComponents()
    this.selectedComponents = this.components
    this.isSelected = false
    this.dragPosition = { x: 0, y: 0 };
    this.isDragging = false
    this.assetTypes = this.openremoteService.getAssetTypes();
  }

  ngOnInit(): void {
    this.assetFiterService.currentAssetFilterState.subscribe(assetFilter => {
      this.selectedFilter = assetFilter;
    });
    this.tooltipService.currentlyHoveredWidgetTypeState.subscribe(widgetType => {
      this.hoveredWidgetType = widgetType;
    })

    // Debug
    // console.log('[LEFT BAR]', this.openremoteService.getAssetTypes());
    // console.log('[LEFT BAR]', this.assetTypes);
  }

  /* -------------------Methods--------------------------- */

  /**
   * Function that reads the new selected asset type whenever the dropdown value updates
   */
  updateAssetValue(): void {
    this.selectedComponents = this.filterComponent()
  }

  // Function to filter the components
  filterComponent(): Components[] {
    var component = this.getComponents()
    if (this.selectedAssetType !== AssetType['ALL']) {
      component = component.filter(item => item.compatibleAssetTypes.includes(this.selectedAssetType));
    }
    return component
  }

  // init all components and set variable asset types
  getComponents(): Components[] {
    return [
      { componentTitle: "Data card", iconCode: "crop_3_2", componentType: WidgetType.LABEL, compatibleAssetTypes: [AssetType.CONSOLE, AssetType.ROOM, AssetType.WEATHER, AssetType.BUILDING, AssetType.SOLAR], isdragging: false },
      { componentTitle: "Bar chart", iconCode: "insert_chart_outlined", componentType: WidgetType.BARCHART, compatibleAssetTypes: [AssetType.WEATHER, AssetType.SOLAR ], isdragging: false },
      { componentTitle: "Pie chart", iconCode: "pie_chart", componentType: WidgetType.PIECHART, compatibleAssetTypes: [AssetType.WEATHER, AssetType.SOLAR], isdragging: false },
      { componentTitle: "Graph", iconCode: "show_chart", componentType: WidgetType.GRAPH, compatibleAssetTypes: [AssetType.WEATHER, AssetType.SOLAR], isdragging: false },
    ]
  }


  /**
   * Formats a string of the name of an asset type from the openremote api
   * @param {string} name The name of the asset type from openremote
   * @returns {string} A fromatted string containing the name of the asset type
   */
  formatAssetTypeName(name: string): string {
    let formattedName = name.replace("Asset", "");

    formattedName = formattedName.replace(/([a-z])([A-Z])/g, '$1 $2');

    return formattedName;
  }


  /* -------------------Gridster2 Drag and Drop Methods--------------------------- */

  dragStartHandler(event: any, component: Components): void {
    console.log("drag starts" + event)
    /**
   * set selected component's isdragging to ture
   * create a duplicated component
   */
    var index = this.selectedComponents.indexOf(component)
    this.selectedComponents[index].isdragging = true
    // for showing grid
    this.isSelected = true
    this.dragdropService.gridOption(this.isSelected)
    this.dragdropService.widgetSelected(component)
  }

  dragEndHandler(event: any, component: Components): void {
    console.log("drag ends")
    this.isSelected = false
    this.dragdropService.gridOption(this.isSelected)
    this.dragPosition = { x: 0, y: 0 }

    var index = this.selectedComponents.indexOf(component)
    this.selectedComponents[index].isdragging = false
  }


  changeHoverTo(widgetType: WidgetType) {
    this.tooltipService.update(widgetType);
  }
  removeHover() {
    this.tooltipService.update(undefined);
  }
}
