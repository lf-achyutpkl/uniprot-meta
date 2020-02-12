import { LitElement, html } from 'lit-element';

/**
 * `protocol-steps`
 * Display protocol steps for any process.
 *
 * @customElement
 * @polymer
 */
class ProtocolSteps extends LitElement {
  render() {
    return html`
      <h1> Protocol Steps </h1>
    `;
  }
}

window.customElements.define('protocol-steps', ProtocolSteps);
