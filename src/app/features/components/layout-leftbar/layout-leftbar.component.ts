import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-leftbar',
  templateUrl: './layout-leftbar.component.html',
  styleUrls: ['./layout-leftbar.component.scss']
})
export class LayoutLeftbarComponent implements OnInit {

  searchValue : string;

  constructor() {
    this.searchValue = '';
  }

  ngOnInit(): void {
    
  }

   /* ---------------------------------------------- */
   updateSearchValue(value : string){
     this.searchValue = value;
     console.log(`The searchbox value is: ${value}`);
   }
}
