import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  searchboxValue : string;

  constructor() {
    this.searchboxValue = '';
  }

  ngOnInit() {
  }

  @Output() searchUpdateEvent = new EventEmitter<string>();

  updateValue(e: Event) : void {
    this.searchboxValue = (e.target) ? (<HTMLTextAreaElement>e.target).value : '';
    this.searchUpdateEvent.emit((e.target) ? (<HTMLTextAreaElement>e.target).value : '');
  }
  
  readValue(e : Event) : void {
    e.preventDefault();
    console.log('Dit werkt');
  }

}
