import { LitElement, html, css } from 'lit-element';
import '@polymer/iron-icons';
import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-dialog/paper-dialog';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-spinner/paper-spinner';
import '@polymer/app-layout/app-toolbar/app-toolbar';

import './overview-tab/meta-overview';
import './protocol-data';
import './protocol-tab/protocol-tab';

import { getMeta } from '../../firebase_util/firebaseGet'

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
      metaDetails: {type: Object },
      showProtocol: {type: Boolean},
      showData : {type : Boolean},
      tabs:{type:Array}
    }
  }

  constructor () {
    super();
    this.tabs = [
      { title: 'Overview'}
    ];
    this.selectedTab = 0;
    this.showDialog = false;
    
  }
  firstUpdated(){
    this.initTabButton();

  }
  initTabButton(){
    if(this.showProtocol){
      this.tabs.push({title:'Protocol'});
    }
    if(this.showData){
      this.tabs.push({title:'Data'});
    }
  }
  

  async displayDialog () {
    this.isLoading = true;
    await this.fetchMetaData(this.metaId);
    this.isLoading = false;
    this.showDialog = true;
  }

  hideDialog () {
    this.showDialog = false
    this.selectedTab = 0
  }

  refreshData () {
    this.fetchMetaData(this.metaId)
  }

  async fetchMetaData(metaId) {
    return getMeta(metaId)
      .then(response => {
        this.metaDetails = response.data()
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return html `
      ${this.renderSlot()}
      ${
        this.showDialog ? 
          html `
            <paper-dialog
              .opened="${this.showDialog}"
              modal
            >
              <app-toolbar class="ma-0">
                <h3 main-title> ${this.label} : ${this.metaId} </h3>
                <paper-icon-button
                  icon="close"
                  @click="${this.hideDialog}"
                ></paper-icon-button>
              </app-toolbar>
              ${this.renderTabButtons()}
              <iron-pages 
                class="ma-0 pa-0"
                selected=${this.selectedTab} 
              >
                ${this.renderTabComponents()}
              </iron-pages>
            </paper-dialog>        
          `: null
      }`;
  }

  renderSlot () {
    return html `
      <slot></slot>
      <span slot="suffix">


      ${this.isLoading ? 
            html `
            <paper-spinner
              active
            ></paper-spinner>`
            : html `
      <paper-icon-button
                  @click="${this.displayDialog}"
                  icon="info-outline"
                ></paper-icon-button>   
            `
          } 

  

        <!-- <paper-button
          id="show-meta-information-button"
          @click="${this.displayDialog}"
        >
          ${this.isLoading ? 
            html `
            <paper-spinner
              active
            ></paper-spinner>`
            : 'Show Meta Information'
          } 
        </paper-button> -->
      </span>`
  }

  renderTabComponents () {
    return html `
      <meta-overview
        .metaDetails="${this.metaDetails}"
        .allowEdit="${this.allowEdit}"
        .metaId=${this.metaId}
        .onRefreshData="${this.refreshData.bind(this)}"
      ></meta-overview>
      ${this.showProtocol ? html`
        <protocol-steps
          .allowEdit="${this.allowEdit}"
          .metaId=${this.metaId}
          .metaDetails="${this.metaDetails}"
          .onRefreshData="${this.refreshData.bind(this)}"
        ></protocol-steps>
      ` : ''}
      ${this.showData ? html `
        <protocol-data
          .allowEdit="${this.allowEdit}"
        ></protocol-data>
      ` : ''}
      
    `
  }

  renderTabButtons () {
    return html`
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
            </paper-tab>`
        })}
      </paper-tabs>
    `
  }

  static get styles() {
    return css`
      paper-dialog {
        width: 50%;
      }
      paper-spinner {
        --paper-spinner-layer-1-color: #4285f4;
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
        box-shadow: 0 1px 5px #e3e3e3;

      }
      paper-tab{
        

      }
    `;
  }
}

window.customElements.define('meta-base', MetaBase);
