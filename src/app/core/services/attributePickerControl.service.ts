import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttributePickerControlService {

  isOpened : boolean;
  selectedAsset : string;
  selectedAttribute : string;
  lastSelection : object;
  validSelection: boolean;

  isOpenedChange : Subject<boolean> = new Subject<boolean>();
  selectedAssetChange : Subject<string> = new Subject<string>();
  selectedAttributeChange : Subject<string> = new Subject<string>();
  lastSelectionChange : Subject<object> = new Subject<object>();
  validSelectionChange: Subject<boolean> = new Subject<boolean>();

constructor() { 
  this.isOpened = false
  this.isOpenedChange.subscribe((value) => {
    this.isOpened = value;
  })

  this.selectedAsset = "";
  this.selectedAssetChange.subscribe((value) => {
    this.selectedAsset = value;
  })

  this.selectedAttribute = "";
  this.selectedAttributeChange.subscribe((value) => {
    this.selectedAttribute = value;
  })

  this.lastSelection = {};
  this.lastSelectionChange.subscribe((value) => {
    this.lastSelection = value;
  })

  this.validSelection = false;
  this.validSelectionChange.subscribe((value) => {
    this.validSelection = value;
  })
}

setIsOpened(value : boolean){
  this.isOpenedChange.next(value);
}

setSelectedAsset(value : any){
  this.selectedAssetChange.next(value);
}

setSelectedAttribute(value : string){
  this.selectedAttributeChange.next(value);
}

setLastSelection(assetId : string, attributeName : string){
  let newValue = {
    assetId : assetId,
    attributeName : attributeName,
    timeStamp: new Date().toLocaleString()
  }

  // Debug
  console.log("[AttributePickerControlService]", "Saved new last selection", newValue);

  this.lastSelectionChange.next(newValue);
}

setValidSelection(value:boolean){
  this.validSelectionChange.next(value);
  console.log("[Picker]", "Valid selection now is:", value);
}

}
