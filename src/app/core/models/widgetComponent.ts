import {GridsterItem} from 'angular-gridster2';
import {WidgetType} from './widget-type';

export interface WidgetComponent {
  gridsterItem: GridsterItem;
  widgetType: WidgetType;
}
