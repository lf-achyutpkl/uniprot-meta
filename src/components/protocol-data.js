import { LitElement, html } from 'lit-element';

/**
 * `protocol-data`
 * Display protocol data for any process.
 *
 * @customElement
 * @polymer
 */
class ProtocolData extends LitElement {
  render() {
    return html`
      <h1> Protocol Data </h1>
    `;
  }
}

window.customElements.define('protocol-data', ProtocolData);
