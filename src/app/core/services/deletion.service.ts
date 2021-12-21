import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { WidgetComponent } from '../models/widget-component';

@Injectable({
  providedIn: 'root'
})
export class DeletionService {

  private subject: Subject<any>;

  private isDialogShownSubject: BehaviorSubject<boolean | null>;
  public isDialogShownState: Observable<boolean | null>;

  constructor() {
    this.subject = new Subject<any>()

    this.isDialogShownSubject = new BehaviorSubject<boolean | null>(null);
    this.isDialogShownState = this.isDialogShownSubject.asObservable();
  }

  /* ---------------------------------------------- */

  // Methods
  sendEvent(widget: WidgetComponent | null) {
    this.subject.next(widget)
  }

  getEvent(): Observable<any> {
    return this.subject.asObservable()
  }

  showDialog(isShown: boolean): void {
    this.isDialogShownSubject.next(isShown);
  }
}

