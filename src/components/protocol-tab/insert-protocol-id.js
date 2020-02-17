import {LitElement, html,css} from 'lit-element';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-button/paper-button';
import '../protocol-tab/protocol-inner-tab';
import MyMixin from '../../mixins/metaMixin';

class InsertProtocolIdComponent extends MyMixin(LitElement){
    static get properties(){
        return {
            data : {type: Object}
        }
    }
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
            .wrapper{

            }
            .overflow-wrapper{
                overflow:auto;
            }
        `;
    }
    render(){
        return html `
            <span>No protocol linked!, Enter new protocol Id below</span>
            <div class="wrapper">
                <paper-input label="Protocol Id" name=id @change=${this.handleChange}></paper-input>
                <paper-button @click = ${()=>{this.handleSubmit(this.id)}}>Find</paper-button>
                ${this.data ? 
                html `<protocol-inner-tab .protocolDetails = ${this.data} class="overflow-wrapper"></protocol-inner-tab>
                    <paper-button>Save</paper-button>
                `    
                : html `<h1>No protocol found</h1>`}
            </div>
        `;
    }
}
window.customElements.define('insert-protocol-id',InsertProtocolIdComponent);