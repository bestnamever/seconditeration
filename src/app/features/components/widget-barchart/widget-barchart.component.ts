import {Component, Input, OnInit} from '@angular/core';
import {ChartData, ChartOptions, ChartType} from "chart.js";
import {DesignElement} from "../../../core/models/design-element";

@Component({
  selector: 'app-widget-barchart',
  templateUrl: './widget-barchart.component.html',
  styleUrls: ['./widget-barchart.component.scss']
})
export class WidgetBarchartComponent implements OnInit {

  // Variables
  @Input('widgetData') widgetData: DesignElement | undefined;
  barChartData: ChartData;
  barChartOptions: ChartOptions;
  type: ChartType;
  text: string | undefined;

  // Constructor
  constructor() {
    this.barChartData = {
      labels: [],
      datasets: []
    };
    this.barChartOptions = {
      aspectRatio: 1,
      maintainAspectRatio: false,
      // devicePixelRatio: 1,
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    };
    this.type = 'bar';
  }

  ngOnInit(): void {
    this.text = (this.widgetData?.text != null) ? this.widgetData.text : 'Invalid Widget';
    this.barChartData = {
      labels: this.getWidgetLabels(),
      datasets: [{
        label: this.widgetData?.assetType.toString(),
        data: this.getWidgetData(),
        backgroundColor: ['red', 'blue', 'green']
      }]
    }
  }

  getWidgetLabels(): any[] {
    let values: string[] = [];
    this.widgetData?.values.forEach((x) => {
      values.push(x.asset);
    })
    return values;
  }

  getWidgetData(): any[] {
    let data: number[] = [];
    this.widgetData?.values.forEach((x) => {
      data.push(Number.parseInt(x.value));
    })
    return data;
  }

}
