import { LitElement, html,css } from 'lit-element';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-button/paper-button';
import '@polymer/iron-pages/iron-pages';
import '@polymer/paper-tabs/paper-tab';
import '@polymer/paper-tabs/paper-tabs';
import './step-component';
import './protocol-inner-tab';
import './no-protocol-found';

class ProtocolSteps extends LitElement {

  static get properties(){
    return{
      protocolId:{type:String},
      protocolDetails: { type: Object },
      selectedTab:{type : Number},
      isDataLoaded: {type: Boolean},
    }
  }  

  constructor(){
    super();
    this.protocolId= null;
    // this.protocolId="single-molecule-fish-bb4qiqvw";
    this.isDataLoaded = false;
    this.protocolDetails ='';
  }


  connectedCallback () {
    super.connectedCallback()
    const uri = `https://www.protocols.io/api/v3/protocols/${this.protocolId}`
    fetch(uri)
    .then(response => response.json())
    .then(data => {
      this.protocolDetails = data;
      this.isDataLoaded = true;
    })
    
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
 
  render() {
    if(this.protocolId !== null){
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
      return html `
        <div class="wrapper">
          <no-protocol-found></no-protocol-found>
        </div>
      `;
    }
    
    
  }
}

window.customElements.define('protocol-steps', ProtocolSteps);
