import { Component, OnInit } from '@angular/core';
import {DesignService} from "../../../core/services/design.service";

@Component({
  selector: 'app-preview-updatedtext',
  templateUrl: './preview-updatedtext.component.html',
  styleUrls: ['./preview-updatedtext.component.scss']
})
export class PreviewUpdatedtextComponent implements OnInit {

  // Variables
  designUpdatedAt: string | undefined;

  // Constructor
  constructor(private designService: DesignService) {
    this.designService.currentDesignState.subscribe(() => {
      this.designUpdatedAt = new Date().toLocaleString();
    })
  }

  ngOnInit(): void {

  }

}
