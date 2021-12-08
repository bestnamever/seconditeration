import { defineInjectable, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Design } from "../models/design";
import { tr } from 'date-fns/locale';
import { Observable } from 'rxjs';
import {DesignElementvalue} from "../models/design-elementvalue";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private httpClient: HttpClient) { }

  public uploadDesign(design: Design) {

    // Create a duplicate object, since we're editing the Design object here
    console.log("Old design without JSON stringify is: " + JSON.stringify(design));
    const newDesign: Design = JSON.parse(JSON.stringify(design));
    console.log("New design WITH JSON stringify is: " + JSON.stringify(newDesign));

    // Change design properties
    if (newDesign != null) {
      newDesign.id = 1;
      if (newDesign.display_device != null) {
        newDesign.display_device = design.display_device.toString();
      } else {
        newDesign.display_device = ""
      }

      // IN HERE EVERYTHING IS HARDCODED
      newDesign.display_safe_space = false;
      newDesign.page = {
        id: 1,
        is_homepage: true,
        in_navigation: true,
        name: "Homepage"
      }

      // Set the widget ID's back to their original number (which is +1)
      newDesign.widgets.forEach((x, index) => {
        newDesign.widgets[index].id = x.id + 1;
        newDesign.widgets[index]
        x.element.values.forEach((y, indextwo) => {
          let value: DesignElementvalue = newDesign.widgets[index].element.values[indextwo];
          value.assetName = (value.asset_name != null) ? value.asset_name : value.assetName;
          value.assetId = (value.asset_id != null) ? value.asset_id : value.assetId;
          value.attributeName = (value.attribute_name != null) ? value.attribute_name : value.attributeName;
          value.value = value.value.toString();
        });
      });

      console.log("Posting the following data:", JSON.stringify(newDesign));

      // POST content to database
      this.httpClient.post('backend/api/design', JSON.stringify(newDesign), {
        headers: {
          "Content-Type": "application/json"
        }
      }).subscribe(result => {
        console.log(result);
      })
    }
  }

  public getResponse(uri: string): Observable<any> {
    const url = 'backend/api/' + uri;
    return this.httpClient.get(url);
  }
}
