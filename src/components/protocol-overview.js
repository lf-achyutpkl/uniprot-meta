import { LitElement, html,css } from 'lit-element';
import '@polymer/paper-button';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-input/paper-textarea';
import '@polymer/paper-input/paper-input-container';

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
      .green{
        background-color:#30B542;
        color:white;
      }
      .right{
        float:right;
      }
      .status{
        color:green;
        border:1px solid green;
        border-radius:10px;
        padding:2px;
      }
      .bolder{
        font-size:20px;
      }
      form{
  
        margin:0 auto;
      }
      .half{
        width:50%;
      }
    `;
  }

  constructor(){
    super();
    this.name = "Lorem ipsum";
    this.experimentId = "NAX63V9X";
    this.description = "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
    this.experimentNotes = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, consectetur adipiscing elit.";
  }

  render() {
    return html`
    <span class="status right">editable</span>
      <h1> Protocol Overview </h1>
      <form>
        <paper-input class="name-input" label="Name" value=${this.name}></paper-input>
        <paper-textarea label="Description" value=${this.description}></paper-textarea>
        <paper-input-container>
        <label slot="label">Your name</label>
     
         <input is="iron-input" slot="input">

        <!-- <paper-input class="name-input half" label="Experiment ID" value=${this.experimentId} ></paper-input> -->
        </paper-input-container>
        <paper-textarea label="Expertiment Notes" value=${this.experimentNotes}></paper-textarea>
        <paper-button raised class="green right">Save</paper-button>
      </form>
    `;
  }
}

window.customElements.define('protocol-overview', ProtocolOverview);
