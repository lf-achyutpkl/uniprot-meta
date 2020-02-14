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

  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(){
    const URL = 'https://my-awesome-project-a149c.firebaseio.com/overview.json';
    fetch(URL,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(this.data)
    })
    .then(response => {
      if(!response.ok) throw response;
      return response.json();
    })
  }

  render() {
    return html`
      <form>
        <div class="wrapper">
          <paper-input class="name-input" label="Name"> </paper-input>
          <paper-textarea label="Description"> </paper-textarea>
          <paper-input class="name-input" label="Experiment ID" >
            <iron-icon icon="open-in-new" slot="suffix"></iron-icon>
          </paper-input>            
          <paper-textarea label="Expertiment Notes"></paper-textarea>
        </div>
        <paper-button raised class="green right btn">Save</paper-button>  
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
      .bolder{
        font-size:20px;
      }
      .wrapper{
        overflow:auto;
        padding:30px 100px ;
      }
      .btn{
        margin:10px;
      }
      iron-icon{
        cursor:pointer;
      }
    `;
  }

}

window.customElements.define('protocol-overview', ProtocolOverview);
