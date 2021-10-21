import {Component, Input, OnInit} from '@angular/core';
import {ChartData, ChartOptions, ChartType} from "chart.js";
import {DesignElement} from "../../../core/models/design-element";
import {AssetType} from "../../../core/models/asset-type";
import 'chartjs-adapter-date-fns';
import { format } from 'date-fns'

@Component({
  selector: 'app-widget-graph',
  templateUrl: './widget-graph.component.html',
  styleUrls: ['./widget-graph.component.scss']
})
export class WidgetGraphComponent implements OnInit {

  // Variables
  @Input('widgetData') widgetData: DesignElement | undefined;
  barChartData: ChartData;
  barChartOptions: ChartOptions;
  type: ChartType;
  isLoading: boolean;

  // Constructor
  constructor() {
    this.isLoading = true;
    this.barChartData = {datasets: [], labels: []};
    this.barChartOptions = {};
    this.type = 'line';
  }

  ngOnInit(): void {
    console.log(this.getGraphData());
    this.barChartData = {
      labels: this.getGraphTimes(),
      datasets: [{
        label: 'Temperature',
        data: this.getGraphData(),
        backgroundColor: ['red', 'blue', 'green']
      }]
    };
    this.barChartOptions = {
      aspectRatio: 1,
      maintainAspectRatio: false,
      /*layout: {
        padding: 12
      },*/
      // devicePixelRatio: 1,
      parsing: false,
      scales: {
        xAxes: {
          type: "time",
          display: true,
          time: {
            isoWeekday: true
          }
        },
        /*yAxes: {
          beginAtZero: true,
          max: this.getMaxHeight()
        }*/
      },
      plugins: {
        legend: {
          display: false
        }
      }
    };
    this.isLoading = false;
  }

  getGraphTimes(): Date[] {
    let data: Date[] = [];
    this.widgetData?.values.forEach(x => { data.push(x.time); })
    return data;
  }


  getGraphData(): any[] {
    let data: any[] = [];
    this.widgetData?.values.forEach(x => {
      data.push({ 'x': x.time, 'y': Number.parseFloat(x.value) });
    });
    return data;
  }

  getMaxHeight(): number {
    console.log('The asset type in getMaxHeight is the following: ' + this.widgetData?.assetType);
    switch (this.widgetData?.assetType) {
      case AssetType.THERMOSTAT:
        const values = this.widgetData?.values.filter(x => { return (Number.parseFloat(x.value) > 30); });
        if(values.length > 0) { return Number.parseFloat(values[0].value); }
        else { return 30; }
      case AssetType.SOLAR:
        return 4;
    }
    return 100;
  }
}
