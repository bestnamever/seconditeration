import { Component, OnDestroy, OnInit } from '@angular/core';
import { GridsterItem } from 'angular-gridster2';
import { DesignPage } from 'src/app/core/models/design-page';
import { DesignService } from 'src/app/core/services/design.service';
import { PreviewService } from "../../../core/services/preview.service"
import { OptionList } from 'src/app/core/models/option-list';
import { skip } from "rxjs/operators";
import { Subscription } from "rxjs";
import { AttributePickerControlService } from 'src/app/core/services/attributePickerControl.service';
import { Design } from "../../../core/models/design";
import { DesignPosition } from "../../../core/models/design-position";

@Component({
  selector: 'app-layout-rightbar-components',
  templateUrl: './layout-rightbar-components.component.html',
  styleUrls: ['./layout-rightbar-components.component.scss']
})
export class LayoutRightbarComponentsComponent implements OnDestroy {

  // Design object
  currentDesign: Design | undefined

  // Selection state variables
  selectedGridsterItem: GridsterItem | undefined
  assetSelected: string | undefined
  attributeSelected : string | undefined
  measurementSelected: string | undefined

  // Subscription Variables
  private selectedWidgetSub: Subscription;
  private currentDesignSub: Subscription;




  /* -------------------------------------------------------------------- */
  /*                       Constructor Method                             */
  /* -------------------------------------------------------------------- */

  constructor(private data: PreviewService, private outputData: DesignService, private attributePicker: AttributePickerControlService) {

     // Subscribe to the Selected widget, and change details to that
    this.selectedWidgetSub = this.data.currentlySelectedWidgetState.subscribe(widget => {
      const widgetValues = widget?.widgetData.values[0];
      this.selectedGridsterItem = widget?.gridsterItem;
      this.assetSelected = (widgetValues?.asset_name != null) ? widgetValues.asset_name : widgetValues?.assetName;
      this.attributeSelected = (widgetValues?.attribute_name != null) ? widgetValues.attribute_name : widgetValues?.attributeName
      this.measurementSelected = widgetValues?.measurement;
      console.log("property is ::" + this.measurementSelected)
    })

    // Subscribe to the current design
    this.currentDesignSub = this.outputData.currentDesignState.subscribe(designpage => {
      if(designpage != null) {
        this.currentDesign = JSON.parse(JSON.stringify(designpage));
      }
    })

    // Subscribe to the attribute picker selection
    this.attributePicker.lastSelectionChange.subscribe((value) => {
      console.log("[RightbarComponents]", "The selected attribute was changed", value);
      this.setNewValues(value);
    })

  }



  /* -------------------------------------------------------------------- */
  /*                       Attribute Picker related                       */
  /* -------------------------------------------------------------------- */

  openAttributePicker() : void {
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
    const selectedAsset = assets.find((x: any) => x.id === newValues.assetId);
    const assetName = selectedAsset.name;

    // Get the selected attribute on the found asset
    const selectedAttribute = <any>Object.values(selectedAsset.attributes).find((x: any) => x.name === newValues.attributeName)

    // Get the value of the selected attribute
    const attributeValue = selectedAttribute.value;

    // Debug
    console.log("[RightbarComponents]", "Found following value for this attribute", selectedAttribute, attributeValue);


    // Update values of the selected widget
    this.currentDesign?.widgets.forEach(element => {
      if (element.id == this.selectedGridsterItem?.id) {

        // Set all the values of the widget
        element.element.assetType = selectedAsset.type;
        element.element.values[0].assetId = selectedAsset.id;
        element.element.values[0].assetName = assetName;
        element.element.values[0].attributeName = selectedAttribute.name;
        element.element.values[0].value = (attributeValue)? attributeValue : "Null";
        element.element.values[0].time = new Date();
        element.element.values[0].measurement = "";

        // Debug
        console.log("[RightbarComponents]", "Updated Widget:", element.element, selectedAsset, selectedAttribute);

        // Set variables for updating the component settings tab text
        this.assetSelected = assetName;
        this.attributeSelected = selectedAttribute.name;
      }
    });

    // Save the changed design
    if (this.currentDesign != null) 
    {
      this.outputData.updateData(this.currentDesign);
    }
  }

  /**
   * Function to format a string for display based on the used asset and attribute of the currently selected widget
   * @returns {string} A string containing the text to be displayed on the application inside the "Selected Data" input
   */
  getSelectedAsset() : string {
    let value : string;

    if (this.assetSelected === "All" || this.assetSelected?.length == 0 || this.assetSelected === undefined){
        value = "Select Data"
    }
    else{
      value = `${this.assetSelected}  |  ${this.attributeSelected}`
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



  // === ON-DESTROY ===
  ngOnDestroy(): void {
    // this.selectedWidgetSub.unsubscribe();
    // this.currentDesignSub.unsubscribe();
  }
}


