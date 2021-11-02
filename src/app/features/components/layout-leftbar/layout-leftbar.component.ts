import {
  Component,
  OnInit
} from '@angular/core';
import { AssetType } from 'src/app/core/models/asset-type';

@Component({
  selector: 'app-layout-leftbar',
  templateUrl: './layout-leftbar.component.html',
  styleUrls: ['./layout-leftbar.component.scss']
})
export class LayoutLeftbarComponent implements OnInit {

  searchValue: string; // Value for the component searchbox
  selectedAssetType : string; // Value for the asset-type dropdown

  assetTypeData : Array<string>; // All availible asset types

  constructor() {
    this.searchValue = '';
    this.selectedAssetType = '';
    this.assetTypeData = Object.values(AssetType);
  }

  ngOnInit(): void {
    console.log(this.assetTypeData);
  }

  /* ---------------------------------------------- */
  /**
   * Function that updates the searchvalue
   * @param {string} value Value of the linked searchform
   */
  updateSearchValue(value: string): void {
    this.searchValue = value;
    console.log(`The searchbox value is: ${value}`);

    // -- Filter the component browser --
    // Get the component thumbnail html-elements
    var components = (<HTMLScriptElement[]><any>document.getElementById('component-list')?.childNodes);

    // Check if there are components found
    if (!components) return;

    // Check for each component if it matches the search-term
    components.forEach(item => {
      var componentName = item.getAttribute('componenttitle');
      if (!componentName?.toLowerCase()?.match(value.toLowerCase()) && !item.classList.contains('hidden')){
        item.classList.add('hidden');
      }
      else if (componentName?.toLowerCase()?.match(value.toLowerCase()) && item.classList.contains('hidden')){
        item.classList.remove('hidden');
      }
    });
  }

  /**
   * Function that reads the new selected asset type whenever the dropdown value updates
   */
  updateAssetValue(): void {
    console.log(`The searchbox value is: ${this.selectedAssetType}`);

    // Filter the component browser

  }
}
