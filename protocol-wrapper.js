import { LitElement, html, css } from 'lit-element';

import { nothing } from 'lit-html';

import './protocol-viewer.js';

/**
 * `protocol-wrapper`
 * Display protocol for any process.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class ProtocolWrapper extends LitElement {

    constructor() {
        super();
     
        this.isLoading = true;
    }

    static get styles() {
      return css`
          :host {
            display: block;
          }
          .meta-wrp {
            display: flex;
            align-items: center 
          }
      `;
    }

    firstUpdated() {
        this.fetchAndSetMetaData();
    }

    /**
     * Fetch meta data from any api provided by user.
     */
    async fetchAndSetMetaData() {
        const protocol  = await this.apiCall(this.protocolId);
        this.protocol = protocol.protocol;
        this.isLoading = false;
    }

    /**
     * Actual api call.
     * @param { String } protocolId 
     */
    async apiCall(protocolId) {
        const uri = `https://www.protocols.io/api/v3/protocols/${protocolId}`
        const res = await fetch(uri, {
            headers: {
                'Authorization': 'Bearer f65a3b6d865033b00a90520c0e2314585f7c4146f20ddac2a568e82985bec276'
              }
        });

        return await res.json();
    }

    _openProtocolViewer() {
      const dialog = this.shadowRoot.querySelector('#protocol');
      dialog && dialog.open();
    }

    render() {
      return html`
      <span class="meta-wrp">
        <slot></slot>
        <button @click=${this._openProtocolViewer}">show protocol</paper>
        ${!this.isLoading ? html`<protocol-viewer id="protocol" .protocol=${this.protocol}></protocol-viewer>` : nothing}
      </span>`;
    }

    static get properties() {
        return { 
          protocolId: { type: String },
          isLoading: { type: Boolean },
          protocol: { type: Object }
        };
      }
}

window.customElements.define('protocol-wrapper', ProtocolWrapper);
