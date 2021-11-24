import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from 'src/environments/environment';
import {PhoneProperties} from "../models/phone-properties";
import {PhoneType} from "../models/phone-type";
import {PhoneDirection} from "../models/phone-direction";

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  // Variables
  private currentPhoneSubject: BehaviorSubject<PhoneProperties>; // The state which we can edit
  public currentPhoneState: Observable<PhoneProperties>; // The view-only state, where we can subscribe on to get updates.
  private currentOrientationSubject: BehaviorSubject<PhoneDirection>;
  public currentOrientationState: Observable<PhoneDirection>;

  // Constructor
  constructor() {

    // Initialize variables
    this.currentPhoneSubject = new BehaviorSubject<PhoneProperties>(this.getDefaultPhone()); // Set the value on init
    this.currentPhoneState = this.currentPhoneSubject.asObservable(); // Make a clone of the state which is read-only

    this.currentOrientationSubject = new BehaviorSubject<PhoneDirection>(this.getDefaultOrientation());
    this.currentOrientationState = this.currentOrientationSubject.asObservable();

    // A method that sends a message to console when the Design gets updated
    if (environment.useLocalStorage) {
      this.currentPhoneState.subscribe((phone) => {
        localStorage.setItem('savedPhone', JSON.stringify(phone))
      });
    }
  }

  /* ---------------------------------------------- */

  // Methods
  changeOrientation(phoneOrientation: PhoneDirection) {
    console.log("Switching Phone Orientation to " + PhoneDirection[phoneOrientation] + "..")
    this.currentOrientationSubject.next(phoneOrientation);
  }

  changePhone(phoneType: PhoneType): void {
    switch (phoneType) {

      case PhoneType["Samsung S20"]: {
        this.currentPhoneSubject.next({
          phoneType: PhoneType["Samsung S20"],
          borderThickness: '4px',
          borderRadius: '30px',
          notch: true,
          notchRadius: '4px',
          aspectRatio: '9/17'
        });
        break;
      }
      case PhoneType["Samsung S10"]: {
        this.currentPhoneSubject.next({
          phoneType: PhoneType["Samsung S10"],
          borderThickness: '5px',
          borderRadius: '60px',
          notch: true,
          notchRadius: '4px',
          aspectRatio: '9/15'
        });
        break;
      }
      case PhoneType["IPad Pro 12.9"]: {
        this.currentPhoneSubject.next({
          phoneType: PhoneType["IPad Pro 12.9"],
          borderThickness: '8px',
          borderRadius: '24px',
          notch: false,
          notchRadius: '0px',
          aspectRatio: '3/4'
        })
      }
    }
  }


  /* ---------------------------------------------------------- */

  getDefaultOrientation(): PhoneDirection {
    return PhoneDirection.PORTRAIT;
  }
  // Setting the default Phone
  getDefaultPhone(): any {
    const savedPhone = localStorage.getItem('savedPhone');
    if (environment.useLocalStorage && savedPhone != null) {
      console.log('Got the phone from local Storage!');
      console.log(savedPhone);
      return JSON.parse(savedPhone) as PhoneProperties;
    } else {
      return {
        phoneType: PhoneType["Samsung S20"],
        borderThickness: '4px',
        borderRadius: '30px',
        notch: true,
        notchRadius: '4px',
        aspectRatio: '9/17'
      } as PhoneProperties;
    }
  }
}
