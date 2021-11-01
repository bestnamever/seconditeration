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

  assetTypeData : Array<string>; // TEMPORARY - List of availible asset types 

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

    // Do something
  }

  /**
   * Function that reads the new selected asset type whenever the dropdown value updates
   */
  updateAssetValue(): void {
    console.log(`The searchbox value is: ${this.selectedAssetType}`);

    // Do something
  }
}
