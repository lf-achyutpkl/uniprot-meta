import '@polymer/paper-button';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-input/paper-textarea';
import { LitElement, html,css } from 'lit-element';

import MyMixin from '../../mixins/metaMixin';

/**
 * `protocol-overview`
 * Display protocol overview for any process.
 *
 * @customElement
 * @polymer
 */
class MetaOverviewEdit extends MyMixin(LitElement) {
  static get properties(){
    return{
      overviewDetails: { type: Object },
    }
  }

  render() {
    return html`
      <form>
        <paper-input 
          class="name-input" 
          label="Name"
          value="${this.overviewDetails.name}"
        ></paper-input>
        <paper-textarea 
          label="Description"
          value="${this.overviewDetails.description}"
        ></paper-textarea>
        <paper-input 
          class="name-input"
          label="Experiment ID"
          value="${this.overviewDetails.experimentId}"
        >
        </paper-input>
        <paper-textarea
          label="Expertiment Notes"
          value="${this.overviewDetails.experimentNotes}"
        ></paper-textarea>
        <paper-button 
          raised
          class="green right btn"
          @click="${this.saveMetaData}"
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
