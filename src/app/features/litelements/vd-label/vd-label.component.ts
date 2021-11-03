import { LitElement, css, html, property, customElement} from 'lit-element';

interface DesignElement {
  'assetType': AssetType;
  'text': string;
  'values': Array<DesignElementvalue>;
  'details'?: Map<string, string>;
}
interface DesignElementvalue {
  'asset': string;
  'time': Date;
  'value': string;
}
enum AssetType {
  THERMOSTAT,
  SOLAR
}

@customElement('element-vd-label')
export class VdLabelComponent extends LitElement {

  // Variables
  @property() widgetData: DesignElement | undefined;
  assetType: AssetType | undefined;
  value: string | undefined;
  text: string | undefined;

  // Constructor
  constructor() {
    super();
  }

  /* ------------------------------------- */

  isThermostat(): any { return this.widgetData?.assetType === AssetType.THERMOSTAT; }
  isSolar(): any { return this.widgetData?.assetType === AssetType.SOLAR; }

  render() {
    console.log(this.widgetData)
    this.assetType = (this.widgetData?.assetType != null) ? this.widgetData?.assetType : AssetType.THERMOSTAT;
    this.value = (this.widgetData?.values[0].value != null) ? this.widgetData.values[0].value : 'NaN';
    this.text = (this.widgetData?.text != null) ? this.widgetData.text : 'Invalid Widget';
    return html`
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <div style="height: 100%;">
        <div class="align-topleft">
          ${this.isThermostat() ? html`<span class="material-icons md-18" style="color: #B2B2B2">thermostat</span>` : null}
          ${this.isSolar() ? html`<span class="material-icons md-18" style="color: #B2B2B2">bolt</span>` : null}
        </div>
        <div class="flex-one">
          <div class="flex-two">
            ${this.isThermostat()
              ? html`<h1 style="text-align: center; color: #4D9D2A">${this.value}°c</h1>`
              : html`<h1 style="text-align: center; color: #4D9D2A">${this.value}</h1>`
            }
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
