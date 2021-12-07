import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Design} from "../models/design";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private httpClient: HttpClient) { }

  public uploadDesign(design: Design) {
    design.display_device = design.display_device.toString();
    design.id = 1;
    design.page.id = 1;
    this.httpClient.post('http://207.180.246.34:8000/api/design', JSON.stringify(design), {
      headers: {
        "Content-Type": "application/json"
      }
    }).subscribe(result => {
      console.log(result);
    })
  }
}
