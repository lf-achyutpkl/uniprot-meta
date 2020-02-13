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
      
    }
  }

  static get styles(){
    return css `
      form{
        padding:20px;
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
    this.name = "";
    this.experimentId = "";
    this.description = "";
    this.experimentNotes = "";
  }
  handleSubmit(){
    console.log("submit button clicked");
    
  }

  render() {
    return html`
      <form > 
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
