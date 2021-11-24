import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-preview-topbar',
  templateUrl: './preview-topbar.component.html',
  styleUrls: ['./preview-topbar.component.scss']
})
export class PreviewTopbarComponent implements OnInit {

  @Input() toptext: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
