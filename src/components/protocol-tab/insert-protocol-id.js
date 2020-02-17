import {LitElement, html,css} from 'lit-element';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-button/paper-button';

class InsertProtocolIdComponent extends LitElement{
    constructor(){
        super();
        this.id = '';
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this[e.target.name] = e.target.value; 
    }
    static get styles(){
        return css `
            paper-button{
                float:right;
                background-color:green;
                color:white;
            }
        `;
    }
    render(){
        return html `
            <span>No protocol linked!, Enter new protocol Id below</span>
            <div class="wrapper">
                <paper-input label="Protocol Id" name=id @change=${this.handleChange}></paper-input>
                <paper-button @click = ${()=>{this.handleSubmit(this.id)}}>Find</paper-button>
            </div>
        `;
    }
}
window.customElements.define('insert-protocol-id',InsertProtocolIdComponent);