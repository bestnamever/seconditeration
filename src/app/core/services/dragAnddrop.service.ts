import { Injectable } from '@angular/core';
import { GridsterItemComponentInterface } from 'angular-gridster2';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { WidgetType } from '../models/widget-type';

@Injectable({
  providedIn: 'root'
})
export class DragAndDropService {

  private subject: Subject<any>;

  private isOptionShown: BehaviorSubject<Boolean | null>;
  public isOptionShownState: Observable<Boolean | null>;

  private gridItemCoordinates: BehaviorSubject<any>;
  public gridItemCoordinatesState: Observable<any>;

  constructor() {

    this.subject = new Subject<any>()
    this.isOptionShown = new BehaviorSubject<Boolean | null>(false)
    this.isOptionShownState = this.isOptionShown.asObservable()

    this.gridItemCoordinates = new BehaviorSubject<any>(null)
    this.gridItemCoordinatesState = this.gridItemCoordinates.asObservable()

  }

  /* ---------------------------------------------- */

  // Methods
  sendEvent(type: WidgetType, x: number, y: number) {
    this.subject.next({ type, x, y })
  }

  getEvent(): Observable<any> {
    return this.subject.asObservable()
  }

  gridOption(widgetIn: Boolean) {
    this.isOptionShown.next(widgetIn)
  }

  sendGridItemCoordinates(gridItemCoordinates: Map<GridsterItemComponentInterface, { x: number, y: number, width: number, height: number }>) {
    this.gridItemCoordinates.next(gridItemCoordinates)
  }

}
