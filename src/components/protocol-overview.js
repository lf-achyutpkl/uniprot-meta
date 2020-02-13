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
        padding:0 30px ;
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
    this.name = '';
    this.experimentId = '';
    this.description = '';
    this.experimentNotes = '';
    this.data = {
      "description":"some-description","experiment-id":9,"experiment-notes":"some-notes","name":"xyz"
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

   firstUpdated(){
      
   }
   fetchDataOverview(){
    //  const ID = '';
    //  const URL = `https://my-awesome-project-a149c.firebaseio.com/overview/${ID}.json`;
    //  fetch(URL,{
    //    method:'GET',
    //    headers:{'Content-Type':'application/json'}
    //  })
    //  .then(response => {
    //    if(!response.ok) throw response;
    //    return response.json();
    //  })
    //  .then(data => )

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
    .then(data => console.log(data))
    .catch(error => console.error(error))
    
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
        <paper-button raised class="green right btn" @click=${this.handleSubmit}>Save</paper-button>  
      </form>
    `;
  }
}

window.customElements.define('protocol-overview', ProtocolOverview);
