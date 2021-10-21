import { Component, OnInit } from '@angular/core';
import {ChartData, ChartOptions, ChartType} from "chart.js";

@Component({
  selector: 'app-widget-barchart',
  templateUrl: './widget-barchart.component.html',
  styleUrls: ['./widget-barchart.component.scss']
})
export class WidgetBarchartComponent implements OnInit {

  // Variables
  barChartData: ChartData;
  barChartOptions: ChartOptions;
  type: ChartType;

  // Constructor
  constructor() {
    this.barChartData = {
      labels: ['Red', 'Blue', 'Nog iets'],
      datasets: [{
        label: 'temp',
        data: [2,4,3],
        backgroundColor: ['red', 'blue', 'green']
      }]
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

  }

}
