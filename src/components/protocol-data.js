import { LitElement, html } from "lit-element";

class ProtocolData extends LitElement {
  render() {
    return html`
      <h1>Protocol Data</h1>
    `;
  }
}

window.customElements.define("protocol-data", ProtocolData);
