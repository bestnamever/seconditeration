import { Injectable } from '@angular/core';
import { GridsterItemComponentInterface } from 'angular-gridster2';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Components } from '../models/components';
import { WidgetType } from '../models/widget-type';

@Injectable({
  providedIn: 'root'
})
export class DragAndDropService {

  private isOptionShown: BehaviorSubject<boolean | null>;
  public isOptionShownState: Observable<boolean | null>;

  private gridItemCoordinates: BehaviorSubject<any>;
  public gridItemCoordinatesState: Observable<any>;

  private selectedWidget: BehaviorSubject<any>;
  public selectedWidgetState: Observable<any>


  constructor() {

    this.isOptionShown = new BehaviorSubject<boolean | null>(false)
    this.isOptionShownState = this.isOptionShown.asObservable()

    this.gridItemCoordinates = new BehaviorSubject<any>(null)
    this.gridItemCoordinatesState = this.gridItemCoordinates.asObservable()

    this.selectedWidget = new BehaviorSubject<any>(null)
    this.selectedWidgetState = this.selectedWidget.asObservable()
  }

  /* ---------------------------------------------- */

  // Methods

  widgetSelected(widget: Components) {
    this.selectedWidget.next(widget)
  }

  gridOption(widgetIn: boolean) {
    this.isOptionShown.next(widgetIn)
  }

  sendGridItemCoordinates(gridItemCoordinates: Map<GridsterItemComponentInterface, { x: number, y: number, width: number, height: number }>) {
    this.gridItemCoordinates.next(gridItemCoordinates)
  }

}
