import {LitElement,html} from 'lit-element';

class StepList extends LitElement{
    static get properties(){
        return {
            step:{type:String}
        }
    }
    render(){
        return html`
         <li>${this.step}</li>
        `;
    }
}
window.customElements.define('steps-tag', StepList);