import {LitElement,html} from 'lit-element';
import '../components/protocol-list';

class ListWrapper extends LitElement{
    static get properties(){
        return {
            title:{type:String}
        }
    }
    constructor(){
        super();
        this.title = "Coverslip Prepration";
    }
    render(){
        return html`
         <h3>${this.title}</h3>
         <ol>
            <steps-tag step="step one is to make this work"></steps-tag>
            <steps-tag step="step two is to make this work"></steps-tag>
            <steps-tag step="step three is to make this work"></steps-tag>
            <steps-tag step="step four is to make this work"></steps-tag>
         </ol>
         
        `;
    }
}
window.customElements.define('list-wrapper-tag', ListWrapper);