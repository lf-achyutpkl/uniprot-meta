import { LitElement, html, css } from 'lit-element';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-input/paper-input-container'
import '@polymer/paper-button/paper-button'
import '@polymer/paper-dialog/paper-dialog'
import '@polymer/paper-toolbar/paper-toolbar'
import '@polymer/paper-icon-button/paper-icon-button'

import '../components/protocol-overview'
import '../components/protocol-steps'
import '../components/protocol-data'

/**
 * `protocol-base`
 * Display protocol for any process.
 *
 * @customElement
 * @polymer
 */
class ProtocolBase extends LitElement {

  static get properties () {
    return {
      label: { type: String },
      selected: { type: Number },
      isEditable: { type: Boolean },
      showDialog: { type: Boolean }
    }
  }

  constructor () {
    super()
    this.tabs = [
      { title: 'Overview'},
      { title: 'Protocol'},
      { title: 'Data'}
    ]
    this.selected = 0
    this.showDialog = false
  }

  static get styles() {
    return css`
      paper-dialog {
        width: 50%;
      }
      .ma-0 {
        margin: 0;
      }
      .light-grey{
        background: rgb(241, 241, 241);
      }
      #show-protocol {
        background: #4285f4;
        color: white;
      }
      #hide-protocol {
        color: #fff;
      }
      paper-tabs {
        --paper-tab-ink: #4285f4;
        --paper-tabs-selection-bar-color: #4285f4;   
      }
    `;
  }

  render() {
    return html `
    <paper-input-container attr-for-value="ssn-value">    
      <label slot="label">
        ${this.label}
      </label>
      <input slot="input" class="paper-input-input">
      <span slot="suffix">
        <paper-button
          id="show-protocol"
          @click="${() => { this.showDialog = true}}"
        >
          Show Protocol
        </paper-button>
      </span>
    </paper-input-container>
    
    <paper-dialog
      .opened="${this.showDialog}"
      modal
    >
      <paper-toolbar
        justify="start"
        bottom-justify="end"
        class="ma-0"
      >
        <h2 slot="top">Protocol </h2>         
        <paper-button 
          slot="bottom"
          id="hide-protocol"
          @click="${() => { this.showDialog = false}}"
        >
          Close
        </paper-button>         
      </paper-toolbar>
      <paper-tabs 
        selected="${this.selected}"
        class="ma-0"
      >
          ${this.tabs.map((tab, index) => {
            return html`
              <paper-tab
                @click="${() => {this.selected = index}}"
              >
                <h3>${tab.title}</h3>
              </paper-tab>
            `
          })}
      </paper-tabs>
      <iron-pages 
        class="light-grey ma-0"
        selected=${this.selected} 
      >
        <protocol-overview
          .isEditable="${this.isEditable}"
        ></protocol-overview>
        <protocol-steps></protocol-steps>
        <protocol-data></protocol-data>
      </iron-pages> 
    </paper-dialog>
    `;
  }
}

window.customElements.define('protocol-base', ProtocolBase);
