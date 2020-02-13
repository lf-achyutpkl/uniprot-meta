import { LitElement, html,css } from 'lit-element';
import '@polymer/paper-button';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-input/paper-textarea';
import '@polymer/paper-input/paper-input-container';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/iron-icons/iron-icons';

/**
 * `protocol-overview`
 * Display protocol overview for any process.
 *
 * @customElement
 * @polymer
 */
class ProtocolOverview extends LitElement {
  static get properties(){
    return{
      protocolDetails: { type: Object }
    }
  }

  static get styles(){
    return css `
      form{
        padding:10px;
      }
      .green{
        background-color:#30B542;
        color:white;
      }
      .right{
        float:right;
      }

     
      .bolder{
        font-size:20px;
      }
     
      .wrapper{
        height:400px;
        overflow:auto;
        padding:30px;
      }
      .btn{
        margin:10px;
      }
      iron-icon{
        cursor:pointer;
      }
    `;
  }

  constructor(){
    super();
    this.name = "Lorem ipsum";
    this.experimentId = "NAX63V9X";
    this.description = "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
    this.experimentNotes = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, consectetur adipiscing elit";
  }

  render() {
    return html`
      <form>
        <div class="wrapper">
          <paper-input class="name-input" label="Name" value=${this.name}> </paper-input>
          <paper-textarea label="Description" value=${this.description}> </paper-textarea>
          <paper-input class="name-input" label="Experiment ID" value=${this.experimentId} >
            <iron-icon icon="open-in-new" slot="suffix"></iron-icon>
          </paper-input>            
          <paper-textarea label="Expertiment Notes" value=${this.experimentNotes}></paper-textarea>
        </div>
        <paper-button raised class="green right btn">Save</paper-button>  
      </form>
    `;
  }
}

window.customElements.define('protocol-overview', ProtocolOverview);
