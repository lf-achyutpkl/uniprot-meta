import { LitElement, html, css } from "lit-element";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

class StepsComponent extends LitElement {
  static get properties() {
    return {
      description: { type: String },
      stepIndex: { type: Number }
    };
  }
  static get styles() {
    return css`
      .step {
        display: flex;
      }
      table {
        border-collapse: collapse;
        width: calc(100% - 20px);
      }
      td {
        padding: 10px;
      }
    `;
  }

  constructor() {
    super();
    this.description = "";
    this.stepIndex = "";
  }

  render() {
    return html`
      <p class="step">
        ${this.stepIndex}. ${unsafeHTML(this.description)}
      </p>
    `;
  }
}

window.customElements.define("steps-component", StepsComponent);
