import { LitElement, html,css } from 'lit-element';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-button/paper-button';
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
      protocolSteps: { type: Object }
    }
  }  

  constructor(){
    super();
    this.protocolSteps = {}
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
    `;
  }
 
  render() {
    return html `
    <div class="wrapper">
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
          </div>`
          })}
      </div>
    `;
  }
}

window.customElements.define('protocol-steps', ProtocolSteps);
