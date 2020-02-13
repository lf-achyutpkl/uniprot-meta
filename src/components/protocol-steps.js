import { LitElement, html,css } from 'lit-element';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-button/paper-button';
import data from './data';


/**
 * `protocol-steps`
 * Display protocol steps for any process.
 *
 * @customElement
 * @polymer
 */
class ProtocolSteps extends LitElement {
  
  constructor(){
    super();
     this.data = data;

  }
  static get styles(){
    return css `

      .protocol-container{
        padding:10px;
      }
      .steps-title{
        color:black;
        font-size:20px;
        display:block;
      }
      .wrapper{
        height:400px;
        overflow:auto;
      }
    `;
  }
 
  
  render() {
    return html `
    <div class="wrapper">
    ${this.data.map(proto =>{
       return html `
        <div class="protocol-container">
        <span class="steps-title">${proto.title}</span>
        <ol class="steps-container">
          ${proto.steps.map(step => {
            return html`
              <li >${step}</li>
            `;
          })} 
        </ol>
      </div>
      `
    })}
    </div>
    
      
    `;
    
  }
}

window.customElements.define('protocol-steps', ProtocolSteps);
