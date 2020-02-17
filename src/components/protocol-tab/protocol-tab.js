import { LitElement, html,css } from 'lit-element';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-button/paper-button';
import '@polymer/iron-pages/iron-pages';
import '@polymer/paper-tabs/paper-tab';
import '@polymer/paper-tabs/paper-tabs';
import './step-component';
import './protocol-inner-tab';
import './no-protocol-found';
import './insert-protocol-id';

class ProtocolSteps extends LitElement {

  static get properties(){
    return{
      protocolId:{type:String},
      protocolDetails: { type: Object },
      selectedTab:{type : Number},
      isDataLoaded: {type: Boolean},
      isEditable: {type:Boolean}
    }
  }  

  constructor(){
    super();
    // this.protocolId= '';
    this.protocolId="single-molecule-fish-bb4qiqvw";
    this.isDataLoaded = false;
    this.protocolDetails ='';
    this.fetchProtocol = this.fetchProtocol.bind(this);
    this.handleFindId = this.handleFindId.bind(this);
    this.checkEditable = this.checkEditable.bind(this);
  }

  firstUpdated(){
    this.checkEditable();
  }

  checkEditable(){
    if(this.protocolId == ''){
      this.isEditable = true;
    }else{
      this.isEditable = false;
    }
  }

  connectedCallback () {
    super.connectedCallback()
    this.fetchProtocol(this.protocolId); 
  }

  static get styles(){
    return css `
    .protocol-container{
      border-bottom:1px solid black;
      margin-top:10px;
    }
      
      .wrapper{
        height:400px;
        overflow:auto;
        padding:30px;
      }
      
      paper-tabs {
        --paper-tab-ink: #4285f4;
        --paper-tabs-selection-bar-color: #4285f4;
      }
      iron-pages{
        padding:10px;
      }
    `;
  }
  
  fetchProtocol(id){
    this.protocolId = id;
    console.log("id",this.protocolId);
    const uri = `https://www.protocols.io/api/v3/protocols/${this.protocolId}`
    fetch(uri)
    .then(response => {
      if(!response.ok) throw response;
      return response.json();
    })
    .then(data => {
      this.protocolDetails = data;
      this.isDataLoaded = true;
    })
    .catch(error => {
      
    })
  }

  handleFindId(id){
    this.fetchProtocol(id);
  }
 
  render() {
    if(!this.isEditable){
      if(!this.isDataLoaded){
        return html `<span>Loading</span>`
      }else{
        return html `
        <div class="wrapper">
          <protocol-inner-tab .protocolDetails = ${this.protocolDetails}></protocol-inner-tab>
        </div>
      `;
      }
    }else{
      // you can edit here
      return html `
        <div class="wrapper">
          <insert-protocol-id .handleSubmit=${this.handleFindId}></insert-protocol-id>
        </div>
      `;
    }
    
    
  }
}

window.customElements.define('protocol-steps', ProtocolSteps);
