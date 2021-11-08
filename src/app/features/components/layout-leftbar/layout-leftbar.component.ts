import { AssetFilter } from './../../../core/models/asset-filter';
import {
  Component,
  OnInit
} from '@angular/core';
import { AssetType } from 'src/app/core/models/asset-type';
import { AssetFilterService } from 'src/app/core/services/assetFilter.service';
import { ComponentType } from 'src/app/core/models/component-type';
import { unescapeIdentifier } from '@angular/compiler';


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

  //array for components
  components: ComponentType[]

  //array for selected components
  selectedComponents: ComponentType[] | undefined

  constructor(private assetFiterService: AssetFilterService) {
    this.searchValue = '';
    this.assetTypeData = Object.values(AssetType);
    this.selectedFilter = null;
    this.selectedAssetType = AssetType.ALL
    this.components = this.getComponents()
  }

  ngOnInit(): void {
    this.assetFiterService.currentAssetFilterState.subscribe(assetFilter => {
      this.selectedFilter = assetFilter;
    })

    this.selectedComponents = this.components
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
  filterComponent(): ComponentType[] {
    var component = this.getComponents()
    component = component.filter(item => item.componentTitle.toLowerCase().match(this.searchValue.toLowerCase()))
    if (this.selectedAssetType !== AssetType.ALL) (
      component = component.filter(item => item.assetType.includes(this.selectedAssetType))
    )
    return component
  }

  // init all components
  getComponents(): ComponentType[] {
    return [
      { componentTitle: "Data card", iconCode: "crop_3_2", componentType: "data-card", assetType: [AssetType.AIR, AssetType.SOLAR, AssetType.THERMOSTAT] },
      { componentTitle: "Bar chart", iconCode: "insert_chart_outlined", componentType: "bar-chart", assetType: [AssetType.AIR, AssetType.SOLAR] },
      { componentTitle: "Pie chart", iconCode: "pie_chart", componentType: "pie-chart", assetType: [AssetType.AIR, AssetType.SOLAR] },
      { componentTitle: "Graph", iconCode: "show_chart", componentType: "graph", assetType: [AssetType.AIR, AssetType.HUE] },
    ]
  }
}