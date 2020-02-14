import { LitElement, html,css } from 'lit-element';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-button/paper-button';
import '@polymer/iron-pages/iron-pages';
import '@polymer/paper-tabs/paper-tab';
import '@polymer/paper-tabs/paper-tabs';
import './step-component';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

class ProtocolSteps extends LitElement {

  static get properties(){
    return{
      protocolDetails: { type: Object },
      protocolSteps: { type: Object },
      selectedTab:{type : Number},
      isDataLoaded: {type: Boolean},
    }
  }  

  constructor(){
    super();
    this.protocolId="single-molecule-fish-bb4qiqvw";
    this.protocolSteps = {};
    this.protocolAbstract = '';
    this.tabs = [
      { title: 'Abstract'},
      { title: 'Steps'},
      { title: 'Material'}
    ];
    this.selectedTab = 0;
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

  parseProtocolAbstract(){
    this.protocolAbstract = this.protocolDetails.protocol.description;
  }

  parseProtocolSteps() {
    this.protocolDetails.protocol.steps.forEach((step, index) => {
      let title = step.components[0].source.title
      if (!this.protocolSteps[title]) {
        this.protocolSteps[title] = []
      }
      this.protocolSteps[title].push({
        stepNumber: index + 1,
        description: step.components[1].source.description
      })
    });
  }

  static get styles(){
    return css `
    .protocol-container{
      border-bottom:1px solid black;
      margin-top:10px;
    }
      .steps-title{
        color:white;
        font-size:18px;
        background-color:grey;
        padding:10px;
        
        
      }
      .wrapper{
        height:400px;
        overflow:auto;
        padding:30px;
      }
      .steps-container{
        padding:10px;
        font-size: 14px;
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
    if(!this.isDataLoaded){
      return html `<span>Loading</span>`
    }else{
      this.parseProtocolAbstract()
      this.parseProtocolSteps()
      return html `
      <div class="wrapper">
        <paper-tabs selected = ${this.selectedTab} scrollable>
          ${this.tabs.map((tab,index) =>{
            return html`
              <paper-tab @click="${()=>{this.selectedTab = index}}">${tab.title}</paper-tab>
            `;
          })}      
        </paper-tabs>
        <iron-pages selected=${this.selectedTab}>
        <!-- page Abstract -->
        <div>
          <span>Abstract</span>
          <div >${unsafeHTML(this.protocolAbstract)}</div>
        </div>
          

          <!-- page steps -->
          <div >
            ${Object.entries(this.protocolSteps).map(([title, details]) => {
              return html `
                <div class="protocol-container">
                  <span class="steps-title">${title}</span>
                  <div class="steps-container">
                    ${details.map(step => {
                      return html`
                        <steps-component stepIndex="${step.stepNumber}" description="${step.description}"></steps-component>
                        `
                      })} 
                  </div>
                </div>
                `
              })}
          </div>
          <!-- page 3 -->
          <div>
            <table>
              <tr>
                <th>Name</th> <th>Catalog#</th> <th>Vendor</th>
              </tr>
              ${this.protocolDetails.protocol.materials.map(material => {
                return html `
                  <tr>
                    <td>${material.name}</td>
                    <td>${material.sku}</td>
                    <td>${material.vendor.name}</td>
                  </tr>
                `;
                
              })}
              
            </table>
          </div>
        </iron-pages>
      </div>
    `;
    }
    
  }
}

window.customElements.define('protocol-steps', ProtocolSteps);
