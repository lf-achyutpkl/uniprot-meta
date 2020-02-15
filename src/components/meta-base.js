import '@polymer/iron-icons';
import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-dialog/paper-dialog';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-spinner/paper-spinner';
import { LitElement, html, css } from 'lit-element';
import '@polymer/app-layout/app-toolbar/app-toolbar';

import './overview-tab/meta-overview';
import './protocol-data';
import './protocol-tab/protocol-tab';

/**
 * `protocol-base`
 * Display protocol for any process.
 *
 * @customElement
 * @polymer
 */
class MetaBase extends LitElement {

  static get properties () {
    return {
      label: { type: String },
      metaId: { type: String },
      isLoading: { type: Boolean },
      allowEdit: { type: Boolean },
      selectedTab: { type: Number },
      showDialog: { type: Boolean },
      protocolDetails: {type: Object }
    }
  }

  constructor () {
    super();

    this.tabs = [
      { title: 'Overview'},
      { title: 'Protocol'},
      { title: 'Data'}
    ]

    this.selectedTab = 0;
    this.showDialog = false;
  }

  async displayDialog () {
    this.isLoading = true;
    this.protocolDetails = await this.fetchMetaData(this.metaId);
    this.showDialog = true;
    this.isLoading = false;

    // TODO remove this after integrating with firebase.
    this.overviewDetails = {
      name: 'Random Name',
      description: 'Loren Ipsum dilor sir amet Loren Ipsum dilor sir amet Loren Ipsum dilor sir amet Loren Ipsum dilor sir amet Loren Ipsum dilor sir amet',
      experimentId: '12',
      experimentNotes: 'This is a note'
    }
  }

  hideDialog () {
    this.showDialog = false
    this.selectedTab = 0
  }

  async fetchMetaData(metaId) {
    // call firebase app to fetch meta id for id = this.metaId and get overview, protocolId, and data.
    // const { overview, protocolId, data } = firebase.getMetaData(metaId);
    const protocolId = 'single-molecule-fish-bb4qiqvw'; // TODO replace this id with protocolId from firebase
    const uri = `https://www.protocols.io/api/v3/protocols/${protocolId}`; 
    const res = await fetch(uri);
    return res.json();
  }

  render() {
    return html `
      <slot></slot>
      <span slot="suffix">
        <paper-button
          id="show-meta-information-button"
          @click="${this.displayDialog}"
        >
          ${this.isLoading ? 
            html `
              <paper-spinner
                active
              ></paper-spinner>
            ` : 'Show Meta Information'} 
        </paper-button>
      </span>

    ${
      this.showDialog ? 
        html `
          <paper-dialog
            .opened="${this.showDialog}"
            modal
          >
            <app-toolbar class="ma-0">
              <h2 main-title> ${this.label} </h2>
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
              <meta-overview
                .overviewDetails="${this.overviewDetails}"
                .allowEdit="${this.allowEdit}"
              ></meta-overview>
              <protocol-steps
                .allowEdit="${this.allowEdit}"
                .protocolDetails="${this.protocolDetails}"
              ></protocol-steps>
              <protocol-data
                .allowEdit="${this.allowEdit}"
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
      #show-meta-information-button {
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

window.customElements.define('meta-base', MetaBase);
