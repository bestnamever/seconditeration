import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WidgetComponent } from '../models/widget-component';
import { WidgetType } from '../models/widget-type';

@Injectable()
export class DataSharingService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeWidgetType(widget: WidgetComponent) {
    this.messageSource.next(widget.widgetData.toString())
  }




}