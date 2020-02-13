import {LitElement,html,css} from 'lit-element';

class StepList extends LitElement{
    static get properties(){
        return {
            step:{type:String}
        }
    }
    static get styles(){
        return css `
            li{
               
            }
        `;
    }
    render(){
        return html`
         <li>${this.step}</li>
        `;
    }
}
window.customElements.define('steps-tag', StepList);