import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Design} from "../models/design";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DesignService {

  // Variables
  private currentDesignSubject: BehaviorSubject<Design>;
  public currentDesignState: Observable<Design>;


  // Constructor
  constructor(private httpClient: HttpClient) {

    // Initialize variables
    this.currentDesignSubject = new BehaviorSubject<Design>(this.getFirstDesign());
    this.currentDesignState = this.currentDesignSubject.asObservable();

    // A method that sends a message to console when the Design gets updated
    this.currentDesignState.subscribe((design) => {
      console.log('The design has been updated!');
      console.log(design);
    });
  }

  /* ----------------------------------------- */

  // Making a New design
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

