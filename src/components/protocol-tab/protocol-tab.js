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
      metaId:{type:String},
      metaDetails:{type:Object},
      allowEdit:{type:Boolean},
      protocolDetails:{type:Object},
      selectedTab:{type : Number},
      isDataLoaded: {type: Boolean},
      isEditable: {type:Boolean},
      onRefreshData : {type: Function}
    }
  }  

  constructor(){
    super();
    this.protocolId = null;
    this.isDataLoaded = false;
    this.protocolDetails ='';
    this.fetchProtocol = this.fetchProtocol.bind(this);
    this.handleFindId = this.handleFindId.bind(this);
    this.checkEditable = this.checkEditable.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.displayNoProtocolFound = this.displayNoProtocolFound.bind(this);
  }

  firstUpdated(){
    console.log(this.metaDetails);
    if(this.metaDetails){
      this.protocolId = this.metaDetails.protocolId;
    }
    // this.protocolId= null;
    // this.allowEdit = false;
    // this.protocolId="single-molecule-fish-bb4qiqvw";
    this.fetchProtocol(this.protocolId); //if no id
    this.checkEditable();

  }
  closeForm(){
    alert("form closing...");
    this.isEditable = false;
    this.onRefreshData();
  }

  checkEditable(){
    if(!this.protocolId){
      this.isEditable = true;
    }else{
      this.isEditable = false;
    }
  }

  static get styles(){
    return css `
    .protocol-container{
      border-bottom:1px solid black;
      margin-top:10px;
    }
      
      .wrapper{
        height:300px;
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
      paper-icon-button{
        float:right;
      }
    `;
  }
  
  fetchProtocol(id){
    const uri = `https://www.protocols.io/api/v3/protocols/${id}`
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
      console.error(error);
      this.protocolDetails = null;
    })
  }

 

  handleFindId(id){
    id ? this.fetchProtocol(id) : console.log("please fill the input id", id); 
  }
  handlePost(){
    console.log("save button clicked"); 
  }
  handleEdit(){
    this.protocolId = null;
    this.protocolDetails = null;
    this.isEditable = true;
  }
  displayNoProtocolFound(){
    
  }
 
  render() {
    if(!this.allowEdit){
      if(!this.protocolId){
        return html `
          <div class="wrapper">
            <h1> No protocol Found</h1>
          </div>
        `
      }else{
        if(!this.isDataLoaded){
          return html `<span>Loading</span>`
        }else{
          return html `
          <div class="wrapper">
            <protocol-inner-tab .protocolDetails = ${this.protocolDetails}></protocol-inner-tab>
          </div>
        `;
        }
      }
      
    }else{
      // admin view
      console.log("admin view");
      if(this.isEditable){
        //admin pressed edit button
        return html `
        <div class="wrapper">
          <insert-protocol-id 
            .handleSubmit=${this.handleFindId} 
            .data=${this.protocolDetails} 
            .handlePost = ${this.handlePost} 
            .metaId = ${this.metaId}
            .metaDetails = ${this.metaDetails} 
            .onCloseForm = ${this.closeForm.bind(this)}
          ></insert-protocol-id>
        </div>
      `;
      }else{
        //admin doesnt press edit button
        if(!this.isDataLoaded){
          return html `<span>Loading</span>`
        }else{
          return html `
          <div class="wrapper">
          <paper-icon-button @click = ${this.handleEdit} icon="create">Edit</paper-icon-button>
            <protocol-inner-tab .protocolDetails = ${this.protocolDetails}></protocol-inner-tab>
          </div>
        `;
        }
      }
     
    }
    
    
  }
}

window.customElements.define('protocol-steps', ProtocolSteps);
