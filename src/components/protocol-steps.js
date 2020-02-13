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
        border-bottom:1px solid b
      }
      .steps-title{
        color:black;
        font-size:18px;
        display:block;
        padding:10px;
      }
      .wrapper{
        height:400px;
        overflow:auto;
      }
      .steps-container{
        padding:10px;
      }
      .text-blocks{
        margin:10px;
        font-size:14px;
      }
      .text-blocks:hover{
        background-color:#f2f2f2;
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
              <li class="text-blocks">${step}</li>
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
