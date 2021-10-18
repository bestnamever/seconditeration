import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Design} from "../models/design";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DesignService {

  // Variables
  private currentDesignSubject: BehaviorSubject<Design>; // The state which we can edit
  public currentDesignState: Observable<Design>; // The view-only state, where we can subscribe on to get updates.


  // Constructor
  constructor(private httpClient: HttpClient) {

    // Initialize variables
    this.currentDesignSubject = new BehaviorSubject<Design>(this.getFirstDesign()); // Set the 1st design on init
    this.currentDesignState = this.currentDesignSubject.asObservable(); // Make a clone of the state which is read-only

    // A method that sends a message to console when the Design gets updated
    this.currentDesignState.subscribe((design) => {
      console.log('The design has been updated!');
      console.log(design);
    });
  }

  /* ----------------------------------------- */

  // Making a first design; uses the Design model.
  getFirstDesign(): Design {
    return {
      id: 0,
      randomField: 'nothing',
      anotherField: 'nothing'
    };
  }

  // Update a design
  update(design: Design): void {

    // TEMPORARY EXAMPLE: Save the new design in the state because there is no API
    this.currentDesignSubject.next(design);

    // Send the design to the database, and listen to the response sent back by the API
    /*this.httpClient.put<any>(`/api/designs/` + design.id, design)
      .pipe(first((response: any) => {
        console.log(response);
        this.currentDesignSubject.next(response.newDesign); // Updates the object in the state
        return response;
    }));*/
  }

  /* ----------------------------------------- */


}

