import { Component, OnInit } from '@angular/core';
import { OpenremoteService } from 'src/app/core/services/openremote.service';
import { AttributePickerControlService } from 'src/app/core/services/attributePickerControl.service';

@Component({
  selector: 'app-attribute-picker',
  templateUrl: './attribute-picker.component.html',
  styleUrls: ['./attribute-picker.component.scss']
})
export class AttributePickerComponent implements OnInit {

  usedAssets : any[];
  isOpened : boolean;

  constructor(private openremoteService : OpenremoteService, private attributePickerControl : AttributePickerControlService) {
    this.usedAssets = this.openremoteService.getAssets();
    this.isOpened = this.attributePickerControl.isOpened;

    this.attributePickerControl.isOpenedChange.subscribe(value => {
      console.log("[ATTRIBUTEPICKER]", "Changed opened to:", value);
      this.isOpened = value;
    });
  }

  ngOnInit() {
    console.log('[ATTRIBUTE PICKER]', "USED ASSETS:", this.usedAssets);
  }

}
