import {GridsterItem} from 'angular-gridster2';
import {WidgetType} from './widget-type';
import {AssetType} from "./asset-type";

export interface WidgetComponent {
  gridsterItem: GridsterItem;
  widgetType: WidgetType;
  assetType: AssetType;
}
