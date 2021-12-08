import { LitElement, css, html, property, customElement} from 'lit-element';

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

@customElement('element-vd-label')
export class VdLabelComponent extends LitElement {

  // Variables
  @property() widgetData: DesignElement | undefined;
  assetType: AssetType | undefined;
  value: string | undefined;
  text: string | undefined;
  measurement: string | undefined;

  // Constructor
  constructor() {
    super();
  }

  /* ------------------------------------- */

  isThermostat(): any {
    console.log("isThermostat has the following assetType: ", this.widgetData?.assetType)
    switch (this.widgetData?.assetType) {
      case AssetType.THERMOSTAT: return true;
      case AssetType.WEATHER: return true;
      default: return false;
    }
  }
  isSolar(): any { return this.widgetData?.assetType === AssetType.SOLAR; }

  getIconByAssetType(): any {
    const usedAssetTypes = localStorage.getItem("usedAssetTypes");
    if(usedAssetTypes != null) {
      const usedAssetTypesArray: any[] = JSON.parse(usedAssetTypes);
      console.log("usedAssetTypesArray is ", usedAssetTypesArray);
      const type = Object.values(AssetType).find(x => { return x == this.widgetData?.assetType; })
      if(type != null) {
        const ortype = usedAssetTypesArray.find(x => { return x.name == type })
        console.log("Found the following ortype: ", ortype)
        return ortype.icon;
      }
    }
    return "home";
  }

  render() {
    console.log(this.widgetData)
    this.assetType = (this.widgetData?.assetType != null) ? this.widgetData?.assetType : AssetType.ALL;
    this.value = (this.widgetData?.values[0].value != null) ? this.widgetData.values[0].value : 'NaN';
    this.text = (this.widgetData?.text != null) ? this.widgetData.text : 'Invalid Widget';
    this.measurement = (this.widgetData?.values[0].measurement != null) ? this.widgetData.values[0].measurement : "";
    return html`
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <div style="height: 100%;">
        <div class="align-topleft">
          <or-icon icon="${this.getIconByAssetType()}" style="--or-icon-fill: #B2B2B2; padding: 4px;"></or-icon>
        </div>
        <div class="flex-one">
          <div class="flex-two">
            <h1 style="text-align: center; color: #4D9D2A; word-wrap: break-word">${this.value}${this.measurement}</h1>
            <p class="cardSubtext" style="text-align: center;">${this.text}</p>
          </div>
        </div>
      </div>
    `
  }

  static get styles() {
    return css`
      .align-topleft {
        position: absolute;
      }
      .flex-center {
        justify-content: center;
        align-items: center;
      }
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
    `;
  }

}
