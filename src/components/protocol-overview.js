import { LitElement, html } from 'lit-element';

/**
 * `protocol-overview`
 * Display protocol overview for any process.
 *
 * @customElement
 * @polymer
 */
class ProtocolOverview extends LitElement {
  render() {
    return html`
      <h1> Protocol Overview </h1>
    `;
  }
}

window.customElements.define('protocol-overview', ProtocolOverview);
