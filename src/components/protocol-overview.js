import { LitElement, html,css } from 'lit-element';
import '@polymer/paper-button';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-input/paper-textarea';

/**
 * `protocol-overview`
 * Display protocol overview for any process.
 *
 * @customElement
 * @polymer
 */
class ProtocolOverview extends LitElement {
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
        width:calc(80% - 10px);
        margin:0 auto;
      }
    `;
  }
  render() {
    return html`
    <span class="status right">editable</span>
      <h1> Protocol Overview </h1>
      <form>
        <paper-input class="name-input" label="Name" value="Lorem ipsum"></paper-input>
        <paper-textarea label="Description" value="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."></paper-textarea>
        <paper-input class="name-input" label="Experiment ID"></paper-input>
        <paper-textarea label="Expertiment Notes"></paper-textarea>
        <paper-button raised class="green right">Save</paper-button>
      </form>
    `;
  }
}

window.customElements.define('protocol-overview', ProtocolOverview);
