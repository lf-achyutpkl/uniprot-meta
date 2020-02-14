import { LitElement, html,css } from 'lit-element';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-button/paper-button';
import '@polymer/iron-pages/iron-pages';
import '@polymer/paper-tabs/paper-tab';
import '@polymer/paper-tabs/paper-tabs';
import './step-component';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

class ProtocolInnerTab extends LitElement{
    static get properties(){
        return{
          protocolDetails: { type: Object },
          selectedTab:{type : Number}
        }
    }
    
    static get styles(){
        return css `
            table{
                border:1px solid black;
                width:100%;
            }
            td{
                border: 1px solid black;
                padding:10px;
            }
            th{
                font-size:16px;
            }
            .steps-title{
                color:white;
                font-size:18px;
                background-color:grey;
                padding:10px;
                
                
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
    
    constructor(){
        super();
        this.protocolSteps = {};
        this.protocolAbstract = '';
        this.tabs = [
            { title: 'Abstract'},
            { title: 'Steps'},
            { title: 'Material'}
        ];
        this.selectedTab = 0;
    }

    connectedCallback(){
        super.connectedCallback();
        this.parseProtocolAbstract();
        this.parseProtocolSteps();
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
    render(){
        return html `
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
        `;
    }

}
window.customElements.define('protocol-inner-tab', ProtocolInnerTab);
