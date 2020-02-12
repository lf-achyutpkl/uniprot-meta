import { LitElement, html } from 'lit-element';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-button/paper-button';
import '../components/list-wrapper';

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
      <list-wrapper-tag></list-wrapper-tag>
    
    `;
  }
}

window.customElements.define('protocol-steps', ProtocolSteps);
