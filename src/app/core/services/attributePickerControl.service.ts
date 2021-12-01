import { Injectable } from '@angular/core';
import { isThursday } from 'date-fns';
import { is } from 'date-fns/locale';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttributePickerControlService {

  isOpened : boolean;
  selectedAsset : string | null;
  selectedAttribute : string | null;

  isOpenedChange : Subject<boolean> = new Subject<boolean>();
  selectedAssetChange : Subject<string> = new Subject<string>();
  selectedAttributeChange : Subject<string> = new Subject<string>();

constructor() { 
  this.isOpened = false
  this.isOpenedChange.subscribe((value) => {
    this.isOpened = value;
  })

  this.selectedAsset = null
  this.selectedAssetChange.subscribe((value) => {
    this.selectedAsset = value;
  })

  this.selectedAttribute = null;
  this.selectedAttributeChange.subscribe((value) => {
    this.selectedAttribute = value;
  })
}

setIsOpened(value : boolean){
  this.isOpenedChange.next(value);
}

setSelectedAsset(value : string){
  this.selectedAssetChange.next(value);
}

setSelectedAttribute(value : string){
  this.selectedAttributeChange.next(value);
}

}
