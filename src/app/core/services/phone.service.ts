import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {PhoneProperties} from "../models/phone-properties";
import {PhoneType} from "../models/phone-type";

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  // Variables
  private currentPhoneSubject: BehaviorSubject<PhoneProperties>; // The state which we can edit
  public currentPhoneState: Observable<PhoneProperties>; // The view-only state, where we can subscribe on to get updates.

  // Constructor
  constructor() {

    // Initialize variables
    this.currentPhoneSubject = new BehaviorSubject<PhoneProperties>(this.getDefaultPhone()); // Set the value on init
    this.currentPhoneState = this.currentPhoneSubject.asObservable(); // Make a clone of the state which is read-only
  }

  /* ---------------------------------------------- */

  // Methods
  changePhone(phoneType: PhoneType): void {
    switch (phoneType) {

      case PhoneType.SAMSUNG_S20: {
        this.currentPhoneSubject.next(this.getDefaultPhone());
        break;
      }
      case PhoneType.SAMSUNG_S10: {
        this.currentPhoneSubject.next({
          phoneType: PhoneType.SAMSUNG_S10,
          borderThickness: '4px',
          borderRadius: '30px',
          notch: true,
          notchRadius: '4px',
          aspectRatio: '9/17.5'
        });
        break;
      }
    }
  }


  /* ---------------------------------------------------------- */

  // Setting the default Phone
  getDefaultPhone(): any {
    return {
      phoneType: PhoneType.SAMSUNG_S20,
      borderThickness: '4px',
      borderRadius: '30px',
      notch: true,
      notchRadius: '4px',
      aspectRatio: '9/17.5'
    } as PhoneProperties;
  }
}
