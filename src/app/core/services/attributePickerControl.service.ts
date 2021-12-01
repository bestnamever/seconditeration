import { Injectable } from '@angular/core';
import { isThursday } from 'date-fns';
import { is } from 'date-fns/locale';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttributePickerControlService {

  isOpened : boolean;
  selectedAsset : string | undefined

  isOpenedChange : Subject<boolean> = new Subject<boolean>();
  selectedAssetChange : Subject<string> = new Subject<string>();

constructor() { 
  this.isOpened = false
  this.isOpenedChange.subscribe((value) => {
    this.isOpened = value;
  })

  this.selectedAsset = undefined
  this.selectedAssetChange.subscribe((value) => {
    this.selectedAsset = value;
  })
}

setIsOpened(value : boolean){
  this.isOpenedChange.next(value);
}

setSelectedAsset(value : string){
  this.selectedAssetChange.next(value);
}

}
