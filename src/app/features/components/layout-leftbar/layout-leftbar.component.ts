import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-leftbar',
  templateUrl: './layout-leftbar.component.html',
  styleUrls: ['./layout-leftbar.component.scss']
})
export class LayoutLeftbarComponent implements OnInit {

  searchboxValue : string;

  constructor() {
    this.searchboxValue = '';
  }

  ngOnInit(): void {
  }

   /* ---------------------------------------------- */
  updateValue(e: Event) : void {
    this.searchboxValue = (e.target) ? (<HTMLTextAreaElement>e.target).value : '';
    console.log(this.searchboxValue);
  }
  

  readValue(e : Event) : void {
    e.preventDefault();
    console.log('Dit werkt');
  }
}
