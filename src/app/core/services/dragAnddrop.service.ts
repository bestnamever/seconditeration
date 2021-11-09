import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { WidgetType } from '../models/widget-type';

@Injectable({
  providedIn: 'root'
})
export class DragAndDropService {

  private subject: Subject<any>;

  private isOptionShown: BehaviorSubject<Boolean | null>;
  public isOptionShownState: Observable<Boolean | null>;

  constructor() {

    this.subject = new Subject<any>()
    this.isOptionShown = new BehaviorSubject<Boolean | null>(false)
    this.isOptionShownState = this.isOptionShown.asObservable()

  }

  sendEvent(type: WidgetType) {
    this.subject.next(type)
  }

  getEvent(): Observable<any> {
    return this.subject.asObservable()
  }

  gridOption(widgetIn: Boolean) {
    this.isOptionShown.next(widgetIn)
  }

}
