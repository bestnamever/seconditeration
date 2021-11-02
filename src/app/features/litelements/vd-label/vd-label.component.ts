import { LitElement, css, html, property, customElement} from 'lit-element';

@customElement('element-vd-label')
export class VdLabelComponent extends LitElement {

  // Variables
  @property() firstName: string | undefined;
  @property() lastName: string | undefined;

  // Constructor
  constructor() {

    super();
  }

  /* ------------------------------------- */

  render() {
    return html`
        <div>
          <h1>Hello ${this.firstName} ${this.lastName}</h1>
        </div>
    `
  }

  static get styles() {
    return css`
      div { color: red; }
    `;
  }

}
