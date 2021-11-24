import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-preview-topbar',
  templateUrl: './preview-topbar.component.html',
  styleUrls: ['./preview-topbar.component.scss']
})
export class PreviewTopbarComponent implements OnInit {

  @Input() toptext: string | undefined;
  @Input() fullscreen: boolean | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  getWidth(): string {
    switch (this.fullscreen) {
      case true:
        return "100vw";
        break;
      default:
        return "100%";
    }
  }

}
