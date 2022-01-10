import { Injectable } from '@angular/core';
import {WidgetType} from "../models/widget-type";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TooltipService {

  // Variables
  private currentlyHoveredWidgetTypeSubject: BehaviorSubject<WidgetType | undefined>
  public currentlyHoveredWidgetTypeState: Observable<WidgetType | undefined>


  constructor() {
    this.currentlyHoveredWidgetTypeSubject = new BehaviorSubject<WidgetType | undefined>(undefined);
    this.currentlyHoveredWidgetTypeState = this.currentlyHoveredWidgetTypeSubject.asObservable();
  }

  update(widgetType: WidgetType | undefined) {
    this.currentlyHoveredWidgetTypeSubject.next(widgetType);
  }
}
