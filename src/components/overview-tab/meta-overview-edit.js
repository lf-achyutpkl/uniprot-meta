import '@polymer/paper-button';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-input/paper-textarea';
import { LitElement, html,css } from 'lit-element';

import MetaMixin from '../../mixins/metaMixin';

/**
 * `protocol-overview`
 * Display protocol overview for any process.
 *
 * @customElement
 * @polymer
 */
class MetaOverviewEdit extends MetaMixin(LitElement) {
  static get properties(){
    return{
      metaDetails: { type: Object },
      metaId: { type: String },
      onCloseForm: { type: Function }
    }
  }

  connectedCallback () {
    super.connectedCallback()
    this.initializeForm()
  }

  initializeForm () {
    if (!this.metaDetails) {
      this.isNewRecord = true
      this.metaDetails = {
        uuid: this.metaId,
        name: '',
        description: '',
        experimentId: '',
        experimentNotes: '',
        protocolId: null
      }
    }
  }

  async saveData () {
   await this.saveMetaData(this.metaDetails)
   this.onCloseForm()
  }
  
  render() {
    return html`
      <form>
        <paper-input 
          class="name-input" 
          label="Name"
          value="${this.metaDetails.name}"
          @input="${(e) => {this.metaDetails.name = e.target.value}}"
        ></paper-input>
        <paper-textarea 
          label="Description"
          value="${this.metaDetails.description}"
          @input="${(e) => {this.metaDetails.description = e.target.value}}"
        ></paper-textarea>
        <paper-input 
          class="name-input"
          label="Experiment ID"
          value="${this.metaDetails.experimentId}"
          @input="${(e) => {this.metaDetails.experimentId = e.target.value}}"
        ></paper-input>
        <paper-textarea
          label="Expertiment Notes"
          value="${this.metaDetails.experimentNotes}"
          @input="${(e) => {this.metaDetails.experimentNotes = e.target.value}}"
        ></paper-textarea>
        <paper-button
          raised
          class="green right btn"
          @click="${this.saveData}"
        >
          Save
        </paper-button>  
      </form>
    `;
  }

  static get styles(){
    return css `
      .green{
        background-color:#30B542;
        color:white;
      }
      .right{
        float:right;
      }
      .btn{
        margin:10px;
      }
    `;
  }
}

window.customElements.define('meta-overview-edit', MetaOverviewEdit);
