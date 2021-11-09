import { AssetFilter } from './../../../core/models/asset-filter';
import {
  Component,
  OnInit
} from '@angular/core';
import { AssetType } from 'src/app/core/models/asset-type';
import { AssetFilterService } from 'src/app/core/services/assetFilter.service';
import { Components } from 'src/app/core/models/components';
import { unescapeIdentifier } from '@angular/compiler';
import { WidgetType } from 'src/app/core/models/widget-type';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { DragAndDropService } from 'src/app/core/services/dragAnddrop.service';
import { GridsterItemComponentInterface } from 'angular-gridster2';
import { ComponentType } from '@angular/cdk/portal';
import { ComponentOptions } from 'vue';
import { tr } from 'date-fns/locale';



@Component({
  selector: 'app-layout-leftbar',
  templateUrl: './layout-leftbar.component.html',
  styleUrls: ['./layout-leftbar.component.scss']
})
export class LayoutLeftbarComponent implements OnInit {

  searchValue: string; // Value for the component searchbox
  selectedAssetType: AssetType; // Value for the asset-type dropdown

  assetTypeData: Array<AssetType>; // All availible asset types

  selectedFilter: AssetFilter | null;

  isSelected: Boolean | null;

  dragPosition: { x: 0, y: 0 };

  isDragging = false

  //array for components
  components: Components[]

  //array for selected components
  selectedComponents: Components[]
  gridItemCoordinates: any;

  constructor(private assetFiterService: AssetFilterService, private dragdropService: DragAndDropService) {
    this.searchValue = '';
    this.assetTypeData = Object.values(AssetType);
    this.selectedFilter = null;
    this.selectedAssetType = AssetType.ALL
    this.components = this.getComponents()
    this.selectedComponents = this.components
    this.isSelected = false
    this.dragPosition = { x: 0, y: 0 };
    this.isDragging = false
  }

  ngOnInit(): void {
    this.assetFiterService.currentAssetFilterState.subscribe(assetFilter => {
      this.selectedFilter = assetFilter;
    })


  }

  /* -------------------Methods--------------------------- */

  /**
   * Function that updates the searchvalue
   * @param {string} value Value of the linked searchform
   */
  updateSearchValue(value: string): void {
    this.searchValue = value;
    console.log(`The searchbox value is: ${value}`); // DEBUG
    this.selectedComponents = this.filterComponent()
  }

  /**
   * Function that reads the new selected asset type whenever the dropdown value updates
   */
  updateAssetValue(): void {
    this.selectedComponents = this.filterComponent()
  }

  // Function to filter the components
  filterComponent(): Components[] {
    var component = this.getComponents()
    component = component.filter(item => item.componentTitle.toLowerCase().match(this.searchValue.toLowerCase()))
    if (this.selectedAssetType !== AssetType.ALL) (
      component = component.filter(item => item.assetType.includes(this.selectedAssetType))
    )
    return component
  }

  // init all components
  getComponents(): Components[] {
    return [
      { componentTitle: "Data card", iconCode: "crop_3_2", componentType: WidgetType.LABEL, assetType: [AssetType.AIR, AssetType.SOLAR, AssetType.THERMOSTAT], isdragging: false },
      { componentTitle: "Bar chart", iconCode: "insert_chart_outlined", componentType: WidgetType.BARCHART, assetType: [AssetType.AIR, AssetType.SOLAR], isdragging: false },
      { componentTitle: "Pie chart", iconCode: "pie_chart", componentType: WidgetType.PIECHART, assetType: [AssetType.AIR, AssetType.SOLAR], isdragging: false },
      { componentTitle: "Graph", iconCode: "show_chart", componentType: WidgetType.GRAPH, assetType: [AssetType.AIR, AssetType.HUE], isdragging: false },
    ]
  }

  /**
   * drag and drop 
   *  FUNCTIONS
   */
  onclick(type: WidgetType) {
    this.dragdropService.sendEvent(type)
  }

  onDrop(event: MouseEvent): void {
    console.log("droping ");
    const firstItem = this.gridItemCoordinates.keys().next().value as GridsterItemComponentInterface;
    const xLocInGrid = (event.screenX - firstItem.gridster.el.getBoundingClientRect().left);
    const yLocInGrid = (event.screenY - firstItem.gridster.el.getBoundingClientRect().top);
    const column = firstItem.gridster.pixelsToPositionX(xLocInGrid, (x) => Math.floor(x));
    const row = (firstItem.gridster.pixelsToPositionY((yLocInGrid + firstItem.gridster.el.scrollTop), (y) => Math.floor(y)) - 1);
    console.log('X to pixels returns [' + column + ']');
    console.log('Y to pixels returns [' + row + ']');
    this.isSelected = false
    this.dragdropService.gridOption(this.isSelected)
  }

  onDragStart(event: MouseEvent, component: Components): void {
    console.log(event);
    console.log('Picking up a Component!');

    var index = this.components.indexOf(component)
    this.components[index].isdragging = true
    console.log(component)

    this.isSelected = true
    this.dragdropService.gridOption(this.isSelected)
  }

}