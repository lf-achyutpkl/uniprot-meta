import { LitElement, html } from 'lit-element';

/**
 * `protocol-base`
 * Display protocol for any process.
 *
 * @customElement
 * @polymer
 */
class ProtocolBase extends LitElement {
  render() {
    return html`
      <h1> Protocol Base </h1>
    `;
  }
}

window.customElements.define('protocol-base', ProtocolBase);
