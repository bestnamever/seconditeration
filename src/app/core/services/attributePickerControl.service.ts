import { Injectable } from '@angular/core';
import { isThursday } from 'date-fns';
import { is } from 'date-fns/locale';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttributePickerControlService {

  isOpened : boolean;

  isOpenedChange : Subject<boolean> = new Subject<boolean>();

constructor() { 
  this.isOpened = false
  this.isOpenedChange.subscribe((value) => {
    this.isOpened = value;
  })
}

setIsOpened(value : boolean){
  this.isOpenedChange.next(value);
}
}
