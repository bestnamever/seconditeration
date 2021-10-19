import {Component, Input, OnInit} from '@angular/core';
import {WidgetType} from "../../../core/models/widget-type";
import {AssetType} from "../../../core/models/asset-type";

@Component({
  selector: 'app-preview-parentwidget',
  templateUrl: './preview-parentwidget.component.html',
  styleUrls: ['./preview-parentwidget.component.scss']
})
export class PreviewParentwidgetComponent implements OnInit {

  // Variables
  @Input('widgetType') widgetType: WidgetType | undefined;
  @Input('assetType') assetType: AssetType | undefined;

  // Constructor
  constructor() { }

  ngOnInit(): void {
  }

  /* -------------------------------- */

  // ngIf methods
  isLabel(): boolean { return this.widgetType === WidgetType.LABEL; }
  isGraph(): boolean { return this.widgetType === WidgetType.GRAPH; }

}
