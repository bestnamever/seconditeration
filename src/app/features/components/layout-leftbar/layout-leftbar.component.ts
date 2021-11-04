import { AssetFilter } from './../../../core/models/asset-filter';
import {
  Component,
  OnInit
} from '@angular/core';
import { AssetType } from 'src/app/core/models/asset-type';
import { AssetFilterService } from 'src/app/core/services/assetFilter.service';

@Component({
  selector: 'app-layout-leftbar',
  templateUrl: './layout-leftbar.component.html',
  styleUrls: ['./layout-leftbar.component.scss']
})
export class LayoutLeftbarComponent implements OnInit {

  searchValue: string; // Value for the component searchbox
  selectedAssetType : string; // Value for the asset-type dropdown

  assetTypeData : Array<string>; // All availible asset types

  selectedFilter : AssetFilter | null;

  constructor(private assetFiterService : AssetFilterService) {
    this.searchValue = '';
    this.selectedAssetType = '';
    this.assetTypeData = Object.values(AssetType);
    this.selectedFilter = null;
  }

  ngOnInit(): void {
    this.assetFiterService.currentAssetFilterState.subscribe(assetFilter => {
      this.selectedFilter = assetFilter;
    })
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
    this.filterComponents();
  }

  /**
   * Function that reads the new selected asset type whenever the dropdown value updates
   */
  updateAssetValue(): void {
    console.log(`The searchbox value is: ${this.selectedAssetType}`); // DEBUG

    // Filter the component browser
    this.filterComponents();
    console.log(this.getAvailibleComponents());
  }

  /**
   * Function that uses the searchbox value together with the dropdown to filter the components in the browser
   */
  filterComponents() : void {
    // Get the component thumbnail html-elements
    var components = (<HTMLScriptElement[]><any>document.getElementById('component-list')?.childNodes);

    // Check if there are components found
    if (!components) return;

    // ==== Searchbox filtering ====
    // Check for each component if it matches the search-term
    components.forEach(item => {
      var componentName = item.getAttribute('componenttitle');
      // Hide the elemnent if the strings don't match
      if (!componentName?.toLowerCase()?.match(this.searchValue.toLowerCase()) && !item.classList.contains('hidden')){
        item.classList.add('hidden');
      }
      // Remove the hidden class if the string does match and the element was hidden
      else if (componentName?.toLowerCase()?.match(this.searchValue.toLowerCase()) && item.classList.contains('hidden')){
        item.classList.remove('hidden');
      }
    });  
    

  }

  getAvailibleComponents() : Array<string> | boolean {
   
    this.assetTypeData.forEach(assetType => {
      switch (this.selectedAssetType) {
        case assetType:
          return false;
          break;

        case 'any':
          return false;
          break;

        default:
          return false;
          break;
      }
    });

    return false;
  }
}
