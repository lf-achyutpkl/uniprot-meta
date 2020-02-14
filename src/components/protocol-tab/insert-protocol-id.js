import {LitElement, html,css} from 'lit-element';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-button/paper-button';

class InsertProtocolIdComponent extends LitElement{
    render(){
        return html `
            <paper-input label="Protocol Id"></paper-input>
            <paper-button>Submit</paper-button>
        `;
    }
}
window.customElements.define('insert-protocol-id',InsertProtocolIdComponent);