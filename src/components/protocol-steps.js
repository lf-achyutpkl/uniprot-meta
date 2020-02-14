import { LitElement, html,css } from 'lit-element';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-button/paper-button';
import '@polymer/iron-pages/iron-pages';
import '@polymer/paper-tabs/paper-tab';
import '@polymer/paper-tabs/paper-tabs';
import './step-component';

/**
 * `protocol-steps`
 * Display protocol steps for any process.
 *
 * @customElement
 * @polymer
 */
class ProtocolSteps extends LitElement {

  static get properties(){
    return{
      protocolDetails: { type: Object },
      protocolSteps: { type: Object },
      selectedTab:{type : Number}
    }
  }  

  constructor(){
    super();
    this.protocolSteps = {};
    this.tabs = [
      { title: 'Abstract'},
      { title: 'Steps'},
      { title: 'Material'}
    ];
    this.selectedTab = 0;
  }

  connectedCallback () {
    super.connectedCallback()
    this.parseProtocolSteps()
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
    }
      .steps-title{
        color:black;
        font-size:13px;
      }
      .wrapper{
        height:400px;
        overflow:auto;
        padding:30px;
      }
      .steps-container{
        padding:10px;
        font-size: 17px;
      }
      paper-tabs {
        border:1px solid black;
        --paper-tab-ink: #4285f4;
        --paper-tabs-selection-bar-color: #4285f4;
      }
    `;
  }
 
  render() {
    return html `
      <div class="wrapper">
        <paper-tabs>
          ${this.tabs.map((tab,index) =>{
            return html`
              <paper-tab @click="${()=>{this.selectedTab = index}}">${tab.title}</paper-tab>
            `;
          })}      
        </paper-tabs>
        <iron-pages selected=${this.selectedTab}>
          <div >test 1</div>
          <div >test 2</div>
          <div >test 3</div>
        </iron-pages>
      </div>
    `;
  }
}

window.customElements.define('protocol-steps', ProtocolSteps);
// <!-- ${Object.entries(this.protocolSteps).map(([title, details]) => {
//   return html `
//     <div class="protocol-container">
      
//       <span class="steps-title">${title}</span>
//       <div class="steps-container">
//         ${details.map(step => {
//           return html`
//             <steps-component stepIndex="${step.stepNumber}" description="${step.description}"></steps-component>
//             `
//         })} 
//       </div>
//     </div>
//     `
//     })} -->