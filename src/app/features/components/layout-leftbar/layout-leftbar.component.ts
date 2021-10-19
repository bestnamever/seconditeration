import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-leftbar',
  templateUrl: './layout-leftbar.component.html',
  styleUrls: ['./layout-leftbar.component.scss']
})
export class LayoutLeftbarComponent implements OnInit {

  searchValue : string; // Value for the component searchbox

  constructor() {
    this.searchValue = '';
  }

  ngOnInit(): void {
    
  }

   /* ---------------------------------------------- */
   /**
    * Function that updates the searchvalue
    * @param {string} value Value of the linked searchform
    */
   updateSearchValue(value : string){
     this.searchValue = value;
     console.log(`The searchbox value is: ${value}`);

     // Do something
   }
}
