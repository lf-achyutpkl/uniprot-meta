import { LitElement, html,css } from 'lit-element';
import '@polymer/paper-button';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-input/paper-textarea';
import '@polymer/paper-input/paper-input-container';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-item'
import '@polymer/iron-icons'

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
      protocolDetails: { type: Object },
      overviewDetails: { type: Object },
      editable: { type: Boolean }
    }
  }

  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.overviewDetails = {
      name: 'Random Name',
      description: 'Loren Ipsum dilor sir amet Loren Ipsum dilor sir amet Loren Ipsum dilor sir amet Loren Ipsum dilor sir amet Loren Ipsum dilor sir amet',
      experimentId: '12',
      experimentNotes: 'This is a note'
    }
    this.editable = !this.overviewDetails
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
      <div class="wrapper">
        <paper-icon-button
          class="right"
          icon="${this.editable ? 'visibility' : 'create'}"
          @click="${() => {this.editable = !this.editable}}"
        ></paper-icon-button>
        ${
          !this.editable ? 
          html `
          <div>
            ${
              Object.entries(this.overviewDetails).map(([key, value]) => {
                return html `
                <paper-item>
                  <paper-item-body two-line>
                    <div secondary>${fieldNameMapper[key]}</div>
                    <div>${value}</div>
                  </paper-item-body>
                </paper-item>                
                `
              })
            }
          </div>
          `: 
          html `
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
              <iron-icon icon="open-in-new" slot="suffix"></iron-icon>
            </paper-input>
            <paper-textarea
              label="Expertiment Notes"
              value="${this.overviewDetails.experimentNotes}"
            ></paper-textarea>
            <paper-button raised class="green right btn">Save</paper-button>  
          </form>`
        }
      </div>
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
        padding:30px ;
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

const fieldNameMapper = {
  name: 'Name',
  description: 'Description',
  experimentId: 'Experiment Id',
  experimentNotes: 'Experiment Notes'
}

window.customElements.define('protocol-overview', ProtocolOverview);
