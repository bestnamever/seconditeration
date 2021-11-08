import { AssetFilter } from './../../../core/models/asset-filter';
import {
  Component,
  OnInit
} from '@angular/core';
import { AssetType } from 'src/app/core/models/asset-type';
import { AssetFilterService } from 'src/app/core/services/assetFilter.service';
import { ComponentType } from 'src/app/core/models/component-type';
import { el } from 'date-fns/locale';
import { AST } from '@angular/compiler';
// import { timeStamp } from 'console';


@Component({
  selector: 'app-layout-leftbar',
  templateUrl: './layout-leftbar.component.html',
  styleUrls: ['./layout-leftbar.component.scss']
})
export class LayoutLeftbarComponent implements OnInit {

  searchValue: string; // Value for the component searchbox
  selectedAssetType: AssetType | undefined; // Value for the asset-type dropdown

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

    this.components = this.getComponents()



  }

  ngOnInit(): void {
    this.assetFiterService.currentAssetFilterState.subscribe(assetFilter => {
      this.selectedFilter = assetFilter;
    })

    this.selectedComponents = this.components
  }

  /* ---------------------------------------------- */
  /**
   * Function that updates the searchvalue
   * @param {string} value Value of the linked searchform
   */
  updateSearchValue(value: string): void {
    this.searchValue = value;
    console.log(`The searchbox value is: ${value}`); // DEBUG

    // Filter the component browser
    this.filterComponentsBySearchbox();
  }

  /**
   * Function that reads the new selected asset type whenever the dropdown value updates
   */
  updateAssetValue(): void {
    console.log(`The dropdown value is: ${this.selectedAssetType}`); // DEBUG

    // Filter the component browser
    if (this.selectedAssetType != null) {
      if (this.selectedAssetType !== "All")
        this.filterCompomentsByDropDown(this.selectedAssetType);
      else
        this.selectedComponents = this.getComponents()
    }
    // console.log("what :::" + this.getAvailibleComponents());
  }

  /**
   * Function that uses the searchbox value together with the dropdown to filter the components in the browser
   */
  filterComponentsBySearchbox(): void {

    this.selectedComponents = this.components.filter(item => item.componentTitle.toLowerCase().match(this.searchValue.toLowerCase()))

    // Get the component thumbnail html-elements
    // var components = (<HTMLScriptElement[]><any>document.getElementById('component-list')?.childNodes);

    // console.log("here" + components.length)

    // Check if there are components found
    // if (!components) return;

    // ==== Searchbox filtering ====
    // Check for each component if it matches the search-term
    // components.forEach(item => {
    //   var componentName = item.getAttribute('componenttitle');
    // Hide the elemnent if the strings don't match
    // if (!componentName?.toLowerCase()?.match(this.searchValue.toLowerCase()) && !item.classList.contains('hidden')) {
    //   item.classList.add('hidden');
    // }
    // Remove the hidden class if the string does match and the element was hidden
    //   else if (componentName?.toLowerCase()?.match(this.searchValue.toLowerCase()) && item.classList.contains('hidden')) {
    //     item.classList.remove('hidden');
    //   }
    // });

    // this.components.forEach(element => {
    //   element.

    // });
  }

  /**
   * Function to filter the components by dropdown
   */
  filterCompomentsByDropDown(assetType: AssetType): void {
    this.selectedComponents = this.components.filter(
      item =>
        item.assetType.includes(assetType))
  }

  // getAvailibleComponents(): Array<string> | boolean {

  //   this.assetTypeData.forEach(assetType => {
  //     switch (this.selectedAssetType) {
  //       case assetType:
  //         return false;
  //         break;

  //       case 'any':
  //         return false;
  //         break;

  //       default:
  //         return false;
  //         break;
  //     }
  //   });

  //   return false;
  // }


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


