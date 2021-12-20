import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { WidgetComponent } from "../models/widget-component";

@Injectable({
  providedIn: 'root'
})
export class PreviewService {

  // Variables
  private currentlySelectedWidgetSubject: BehaviorSubject<WidgetComponent | null>; // The state which we can edit
  public currentlySelectedWidgetState: Observable<WidgetComponent | null>; // The view-only state, where we can subscribe on to get updates.

  private currentPageNameSubject: BehaviorSubject<string | null>;
  public currentPageNameState: Observable<string | null>;
  // Constructor
  constructor() {

    // Initialize variables
    this.currentlySelectedWidgetSubject = new BehaviorSubject<WidgetComponent | null>(null); // Set the value on init
    this.currentlySelectedWidgetState = this.currentlySelectedWidgetSubject.asObservable(); // Make a clone of the state which is read-only

    this.currentPageNameSubject = new BehaviorSubject<string | null>(null);
    this.currentPageNameState = this.currentPageNameSubject.asObservable();
  }

  /* ---------------------------------------------- */

  // Methods
  selectWidget(widget: WidgetComponent): void {
    this.currentlySelectedWidgetSubject.next(widget);
  }

  changePageName(name: string): void {
    this.currentPageNameSubject.next(name);
  }




}
