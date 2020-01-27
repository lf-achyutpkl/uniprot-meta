import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `unipro-meta`
 * Convert any component metadata aware.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class UniproMeta extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'unipro-meta',
      },
    };
  }
}

window.customElements.define('unipro-meta', UniproMeta);
