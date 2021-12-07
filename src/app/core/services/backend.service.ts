import { defineInjectable, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Design } from "../models/design";
import { tr } from 'date-fns/locale';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private httpClient: HttpClient) { }

  public uploadDesign(design: Design) {
    if (design != null) {
      if (design.display_device != null) { design.display_device = design.display_device.toString(); }
      else { design.display_device = "" }

      design.id = 1;

      if (design.page == null) {
        design.page = {
          id: 1,
          is_homepage: true,
          in_navigation: true,
          name: "pages"
        }
      }
      else
        design.page.id = 1;

      this.httpClient.post('backend/api/design', JSON.stringify(design), {
        headers: {
          "Content-Type": "application/json"
        }
      }).subscribe(result => {
        console.log(result);
      })
    }

  }
}
