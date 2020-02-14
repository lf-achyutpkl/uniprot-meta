import {LitElement, html,css} from 'lit-element';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-button/paper-button';

class NoProtocolFound extends LitElement{
    static get styles(){
        return css `
            paper-button {
                background-color:green;
                color:white;
            }
        `;
    }
    render(){
        return html `
            <p>No Protocol found, press edit button to add new Protocol.</p>
            <paper-button>Add new Protocol</paper-button>
        `;
    }
}
window.customElements.define('no-protocol-found',NoProtocolFound);