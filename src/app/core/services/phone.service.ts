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
    const properties = this.getPhone(phoneType);
    if(properties != null) {
      this.currentPhoneSubject.next(properties);
    }
  }

  getPhone(phoneType: PhoneType): PhoneProperties | undefined {
    switch (phoneType) {
      case PhoneType["Samsung S20"]: {
        return {
          phoneType: PhoneType["Samsung S20"],
          borderThickness: '4px',
          borderRadius: '30px',
          smallNotch: true,
          smallNotchRadius: '6px',
          smallNotchWidth: '12px',
          largeNotch: false,
          largeNotchWidth: '0px',
          aspectRatio: '9/20'
        };
      }
      case PhoneType["Samsung S10"]: {
        return {
          phoneType: PhoneType["Samsung S10"],
          borderThickness: '5px',
          borderRadius: '60px',
          smallNotch: true,
          smallNotchRadius: '6px',
          smallNotchWidth: '12px',
          largeNotch: false,
          largeNotchWidth: '0px',
          aspectRatio: '9/15'
        };
      }
      case PhoneType["IPad Pro 12.9"]: {
        return {
          phoneType: PhoneType["IPad Pro 12.9"],
          borderThickness: '8px',
          borderRadius: '24px',
          smallNotch: false,
          smallNotchRadius: '0px',
          smallNotchWidth: '0px',
          largeNotch: true,
          largeNotchWidth: '0px',
          aspectRatio: '3/4'
        };
      }
      default:
        return undefined;
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
      return this.getPhone(PhoneType["Samsung S20"]);
    }
  }
}
