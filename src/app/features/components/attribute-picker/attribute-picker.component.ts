import { Component, OnInit } from '@angular/core';
import { OpenremoteService } from 'src/app/core/services/openremote.service';
import { AttributePickerControlService } from 'src/app/core/services/attributePickerControl.service';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import { sub } from 'date-fns';

// Setup of Material Tree component
interface PickerNode {
  id : number;
  name: string;
  children?: PickerNode[];
}

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-attribute-picker',
  templateUrl: './attribute-picker.component.html',
  styleUrls: ['./attribute-picker.component.scss']
})


export class AttributePickerComponent implements OnInit {

  // Custom variables
  usedAssets : any[];
  isOpened : boolean;

  // Material Design Tree Setup
  treeData : PickerNode[] | any;

  private _transformer = (node: PickerNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private openremoteService : OpenremoteService, private attributePickerControl : AttributePickerControlService) {
    // Get currently used assets
    this.usedAssets = this.openremoteService.getAssets();
   
    // Subscribe to service variables for opening the pop-up
    this.isOpened = this.attributePickerControl.isOpened;

    this.attributePickerControl.isOpenedChange.subscribe(value => {
      console.log("[ATTRIBUTEPICKER]", "Changed opened to:", value);
      this.isOpened = value;

      // Load data if the picker is opened
      if (this.isOpened) console.log("[ATTRIBUTEPICKER]", this.formatData());
      this.treeData = <PickerNode[]>this.formatData();
      this.dataSource.data = this.treeData;
      
    });    
  }

  ngOnInit() {
    console.log('[ATTRIBUTE PICKER]', "USED ASSETS:", this.usedAssets);
  }

  closePicker() : void {
    this.attributePickerControl.setIsOpened(false);
  }

  formatData() : object[] {
    this.usedAssets = this.openremoteService.getAssets();
    let formattedArray = [{name : "placeholder", children : [{}]}];
    console.log("[FORMATDATA]", this.usedAssets);

    this.usedAssets.forEach((element : any) => {
       let asset = {
         id : element.id,
         name : element.name,
         children : []
       }

       if (element.parentName){
          
        let index = formattedArray.map(e => e.name).indexOf(element.parentName);
        // Append asset id to the name
        asset.name = `${element.name}_${element.id}`;

        formattedArray[index].children.push(asset);
       }
       else{
          formattedArray.push(asset);
       }
    });
    
    formattedArray.splice(0,1);
    return formattedArray;
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  onAssetSelect(assetId? : string) : void {
    console.log("[AssetSelectEvent]", "Following asset ID was selected", assetId? assetId : undefined);

    // Get the list of attributes
    let selectedAsset = this.usedAssets.find(obj => {
      return obj.id == assetId;
    })

    console.log("[AseetSelectEvent]", "ID belongs to asset:", selectedAsset);
    
  }

  /**
   * Function to split the name of a tree-node from the ID
   * @param {string} nodeName The full name of the node including the ID, formatted: "name_id"
   * @returns {string} The name of the node without the ID
   */
  splitNodeName(nodeName : string) : string{
    let subString = nodeName.replace(`_${nodeName.split("_").pop()}`, "");

    return (subString) ? subString : nodeName;
  }

  /**
   * Function to split the ID of a tree node from the rest of the name
   * @param {string} nodeName The full name of the node including the ID, formatted: "name_id"
   * @returns {string} The unique ID of the node from the OpenRemote Manager
   */
  splitNodeId(nodeName : string) :string {
    let nodeId = nodeName.split("_").pop();

    return (nodeId) ? nodeId : nodeName;
  }

}
