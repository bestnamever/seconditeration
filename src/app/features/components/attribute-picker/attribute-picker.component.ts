import { Component, OnInit } from '@angular/core';
import { OpenremoteService } from 'src/app/core/services/openremote.service';
import { AttributePickerControlService } from 'src/app/core/services/attributePickerControl.service';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';

@Component({
  selector: 'app-attribute-picker',
  templateUrl: './attribute-picker.component.html',
  styleUrls: ['./attribute-picker.component.scss']
})


export class AttributePickerComponent implements OnInit {

  // Custom variables
  isOpened : boolean;


  constructor(private attributePickerControl : AttributePickerControlService) {
   
    // Subscribe to service variables for opening the pop-up
    this.isOpened = this.attributePickerControl.isOpened;

    this.attributePickerControl.isOpenedChange.subscribe(value => {
      console.log("[ATTRIBUTEPICKER]", "Changed opened to:", value);
      this.isOpened = value;
    });    
  }

  ngOnInit() {
  }

  closePicker() : void {
    this.attributePickerControl.setIsOpened(false);
  }
}
