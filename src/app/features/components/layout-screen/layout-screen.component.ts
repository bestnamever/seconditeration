import { AfterContentChecked, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-screen',
  templateUrl: './layout-screen.component.html',
  styleUrls: ['./layout-screen.component.scss']
})




export class LayoutScreenComponent implements OnInit {

  constructor() {
    this.homepage = "homepage"
  }

  ngOnInit(): void {
  }
  homepage: string;
  propertyItems: string[] = ['Set Homepage', 'Show in navigation'];
  text: string = "Use custom screen size";
  isHidden = true



  toggle(){
    this.isHidden=!this.isHidden;
  }
}
