import { LitElement, html, css } from 'lit-element';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-input/paper-input'
import '@polymer/paper-button/paper-button'
import '@polymer/paper-dialog/paper-dialog'
import '@polymer/app-layout/app-toolbar/app-toolbar'
import '@polymer/paper-spinner/paper-spinner'
import '@polymer/iron-icons'
import '../components/protocol-overview'
import './protocol-tab/protocol-tab'
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
      selectedTab: { type: Number },
      isEditable: { type: Boolean },
      showDialog: { type: Boolean },
      protocolId: { type: String },
      protocolDetails: {type: Object },
      loading: { type: Boolean }
    }
  }

  constructor () {
    super()
    this.tabs = [
      { title: 'Overview'},
      { title: 'Protocol'},
      { title: 'Data'}
    ]
    this.selectedTab = 0
    this.showDialog = false
  }

  async displayDialog () {
    this.protocolDetails = await this.fetchProtocolDetails()
    this.showDialog = true
  }

  hideDialog () {
    this.showDialog = false
    this.selectedTab = 0
  }

  async fetchProtocolDetails() {
    this.loading = true
    const uri = `https://www.protocols.io/api/v3/protocols/${this.protocolId}`
    const res = await fetch(uri);
    this.loading = false
    return res.json();
  }

  render() {
    return html `
    <paper-input
      label="${this.label}" value="${this.protocolId}"
    >
      <span slot="prefix">
        <iron-icon 
          class="mr-6"
          icon="info-outline"
        ></iron-icon>
      </span>
      <span slot="suffix">
        <paper-button
          id="show-protocol-button"
          @click="${this.displayDialog}"
        >
          ${this.loading ? 
            html `
              <paper-spinner
                active
              ></paper-spinner>
            ` : 'Show Protocol'} 
        </paper-button>
      </span>
    </paper-input>
    
    ${
      this.showDialog ? 
        html `
          <paper-dialog
            .opened="${this.showDialog}"
            modal
          >
            <app-toolbar
              class="ma-0"
            >
              <h2 main-title >GeneID: </h2>
              <paper-icon-button
                icon="close"
                @click="${this.hideDialog}"
              ></paper-icon-button>
            </app-toolbar>
            <paper-tabs 
              selected="${this.selectedTab}"
              class="ma-0"
            >
              ${this.tabs.map((tab, index) => {
                return html`
                  <paper-tab
                    @click="${() => {this.selectedTab = index}}"
                  >
                    <h3>${tab.title}</h3>
                  </paper-tab>
                `
              })}
            </paper-tabs>    
            <iron-pages 
              class="ma-0 pa-0"
              selected=${this.selectedTab} 
            >
              <protocol-overview
                .protocolDetails="${this.protocolDetails}"
                .isEditable="${this.isEditable}"
              ></protocol-overview>
              <protocol-steps
                .protocolDetails="${this.protocolDetails}"              
              ></protocol-steps>
              <protocol-data
                .protocolDetails="${this.protocolDetails}"
              ></protocol-data>
            </iron-pages>
          </paper-dialog>        
        `: null
      }
    `;
  }

  static get styles() {
    return css`
      paper-dialog {
        width: 50%;
      }
      paper-spinner {
        --paper-spinner-layer-1-color: #fff;
      }
      app-toolbar {
        background: #4285f4;
        color: white;
        --app-toolbar-font-size: 15px;
      }
      .ma-0 {
        margin: 0;
      }
      .pa-0 {
        padding: 0;
      }
      .mr-6 {
        margin-right: 6px;
      }
      #show-protocol-button {
        background: #4285f4;
        color: #fff;
      }
      paper-tabs {
        --paper-tab-ink: #4285f4;
        --paper-tabs-selection-bar-color: #4285f4;
      }
    `;
  }
}

window.customElements.define('protocol-base', ProtocolBase);
