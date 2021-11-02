import { LitElement, css, html, property, customElement} from 'lit-element';

@customElement('element-vd-graph')
export class VdGraphComponent extends LitElement {

  // Variables
  @property() helloMessage: string | undefined;

  // Constructor
  constructor() {

    super();
  }

  /* ------------------------------------- */

  render() {
    return html`
        <div>
          <h1>${this.helloMessage}</h1>
        </div>
    `
  }

  static get styles() {
    return css`
      div { color: green; }
    `;
  }

}
