import {css, customElement, html, LitElement, property, PropertyValues} from "lit-element";
import {Chart, registerables} from "chart.js";

/* -------------------------------- */

interface DesignElement {
  'assetType': AssetType;
  'text': string;
  'values': Array<DesignElementvalue>;
  'details'?: Map<string, string>;
}
interface DesignElementvalue {
  assetName: string;
  asset_name?: string; // FROM DATABASE
  assetId: string;
  asset_id?: string; // FROM DATABASE
  time: Date;
  attributeName: string;
  attribute_name?: string; // FROM DATABASE
  value: string;
  measurement?: string;
}
enum AssetType {
  ALL = "All",
  GROUP = 'GroupAsset',
  CONSOLE = 'ConsoleAsset',
  BUILDING = 'BuildingAsset',
  ROOM = 'RoomAsset',
  CITY = "CityAsset",
  SOLAR = "ElectricityProducerSolarAsset",
  THERMOSTAT= "Thermostat",
  WEATHER = "WeatherAsset"
}

/* ------------------------ */

@customElement('element-vd-barchart')
export class VdBarChartComponent extends LitElement {

  // Variables
  @property() widgetData: DesignElement | undefined;
  assetType: AssetType | undefined;
  value: string | undefined;
  text: string | undefined;
  chart: Object | undefined;

  // Constructor
  constructor() {
    super();
    Chart.register(...registerables);
  }

  /* ------------------------------------- */

  render() {
    this.text = (this.widgetData?.text != null) ? this.widgetData.text : 'Invalid Widget';
    return html`
      <div style="height: 100%;">
        <div class="flex-one">
          <div class="flex-two">
            <canvas id="barChart" class="fillChart"></canvas>
          </div>
        </div>
      </div>
    `
  }

  static get styles() {
    return css`
      .flex-one {
        display: flex;
        height: 100%;
        width: 100%;
      }
      .flex-two {
        flex: 1 1 auto;
        flex-direction: column;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .fillChart {
        margin: 4px 6px -6px 6px;
      }
    `;
  }


  /* ------------------------------------------------------ */

  // Util methods for type checking
  isThermostat(): any { return this.widgetData?.assetType === AssetType.THERMOSTAT; }
  isSolar(): any { return this.widgetData?.assetType === AssetType.SOLAR; }

  // Update method where all Chart properties get set
  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);

    // @ts-ignore
    const ctx = this.renderRoot.querySelector( '#barChart' ).getContext('2d');

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.getWidgetLabels(),
        datasets: [{
          label: this.widgetData?.assetType != null ? this.widgetData?.assetType.toString() : "NaN",
          data: this.getWidgetData(),
          backgroundColor: ['#4D9D2A']
        }]
      },
      options: {
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
      }
    });
  }

  /* ---------------------------------------- */

  getWidgetLabels(): any[] {
    let values: string[] = [];
    console.log("getWidgetLabels() has the following widgetData: ", this.widgetData?.values)
    this.widgetData?.values.forEach((x) => {
      values.push(x.assetName);
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
