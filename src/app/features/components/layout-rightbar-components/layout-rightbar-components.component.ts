import {Component, OnDestroy, OnInit} from '@angular/core';
import { GridsterItem } from 'angular-gridster2';
import { DesignPage } from 'src/app/core/models/design-page';
import { DesignService } from 'src/app/core/services/design.service';
import { PreviewService } from "../../../core/services/preview.service"
import { OptionList } from 'src/app/core/models/option-list';
import { Subscription } from "rxjs";
import { AttributePickerControlService } from 'src/app/core/services/attributePickerControl.service';

@Component({
  selector: 'app-layout-rightbar-components',
  templateUrl: './layout-rightbar-components.component.html',
  styleUrls: ['./layout-rightbar-components.component.scss']
})
export class LayoutRightbarComponentsComponent implements OnInit, OnDestroy {

  //page value
  designPage: DesignPage | undefined

  // selected widget
  widget: GridsterItem | undefined

  // selected asset & attribute
  assetSelected: string | undefined
  attributeSelected : string | undefined

  // selected measurement
  measurementSelected: string | undefined

  private selectedWidgetSub: Subscription;
  private currentDesignSub: Subscription;

  constructor(private data: PreviewService, private outputData: DesignService, private attributePicker: AttributePickerControlService) {
     // set value on right side bar
    this.selectedWidgetSub = this.data.currentlySelectedWidgetState.subscribe(widget => (
      this.widget = widget?.gridsterItem,
      this.assetSelected = widget?.widgetData.values[0].asset,
      this.attributeSelected = widget?.widgetData.values[0].attributeName,
      this.measurementSelected = widget?.widgetData.values[0].measurement,
      console.log("property is ::" + this.measurementSelected)
    ))

    this.currentDesignSub = this.outputData.currentDesignState.subscribe(designpage => {
      this.designPage = JSON.parse(JSON.stringify(designpage));
    })

    this.attributePicker.lastSelectionChange.subscribe((value) => {
      console.log("[RightbarComponents]", "The selected attribute was changed", value);
      this.setNewValues(value);
    })

  }

  // === ON-INIT ===
  ngOnInit(): void {
  }

  // === ON-DESTROY ===
  ngOnDestroy(): void {
    this.selectedWidgetSub.unsubscribe();
    this.currentDesignSub.unsubscribe();
  }

  // === FUNCTIONS ===
  //get type of properties
  getPropertyType(): boolean {
    return (this.measurementSelected === "KW" || this.measurementSelected === "W") ? true : false
  }

  /**
   * Sets variable to open the attribute picker
   */
  openPicker() : void {
    this.attributePicker.setIsOpened(true);
  }

  /**
   * Updates the data in the currently selected widget to the new values form the selected asset and attribute in the picker
   * @param {any} newValues Object containing the new values for the asset and attribute
   */
  setNewValues(newValues : any) : void {
    // Get all used assets
    const assets = <any[]>this.outputData.currentAssets;

    // Get the selected asset
    const selectedAsset = assets.find((x : any) => x.id === newValues.assetId);
    const assetName = selectedAsset.name;

    // Get the selected attribute on the found asset
    const selectedAttribute = <any>Object.values(selectedAsset.attributes).find((x : any) => x.name === newValues.attributeName)

    // Get the value of the selected attribute
    const attributeValue = selectedAttribute.value;

    // Debug
    console.log("[RightbarComponents]", "Found following value for this attribute", selectedAttribute, attributeValue);

    // Update values of the selected widget
    this.designPage?.positions.forEach(element => {
      if (element.id == this.widget?.id) {

        // Set all the values of the widget
        element.element.assetType = selectedAsset.type;
        element.element.values[0].assetId = selectedAsset.id;
        element.element.values[0].asset = assetName;
        element.element.values[0].attributeName = selectedAttribute.name;
        element.element.values[0].value = (attributeValue)? attributeValue : "Null";
        element.element.values[0].time = new Date();
        element.element.values[0].measurement = undefined;

        // Debug
        console.log("[RightbarComponents]", "Updated Widget:", element.element, selectedAsset, selectedAttribute);

        // Set variables for updating the component settings tab text
        this.assetSelected = assetName;
        this.attributeSelected = selectedAttribute.name;
      }
    });

    // Save the changed design
    if (this.designPage != null) this.outputData.updateData(this.designPage);
  }

  /**
   * Function to format a string for display based on the used asset and attribute of the currently selected widget
   * @returns {string} A string containing the text to be displayed on the application inside the "Selected Data" input
   */
  getSelectedAsset() : string {
    let value : string;

    if (this.assetSelected === "All" || this.assetSelected === undefined){
        value = "Select Data"
    }
    else{
      value = `${this.assetSelected} | ${this.attributeSelected}`
    }

    return value;
  }

  // OBSOLETE BECAUSE OF ATTRIBUTE PICKER
  //change value
  // setValue(key: string, value: string) {

  //   this.designPage?.positions.forEach(element => {
  //     if (element.id == this.widget?.id) {
  //       if (key === "asset") {
  //         element.element.values[0].asset = value
  //       }
  //       else if (key === "measurement") {
  //         element.element.values[0].measurement = value
  //       }
  //     }
  //   })

  //   if (this.designPage != null)
  //     this.outputData.updateData(this.designPage)
  // }

  //selection change
  // change(chosenkey: string, chosenValue: string) {
  //   console.log(chosenValue)
  //   this.setValue(chosenkey, chosenValue)
  // }
}


