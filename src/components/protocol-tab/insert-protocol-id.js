import {LitElement, html,css} from 'lit-element';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-button/paper-button';
import '../protocol-tab/protocol-inner-tab';
import MetaMixin from '../../mixins/metaMixin';

class InsertProtocolIdComponent extends MetaMixin(LitElement){
    static get properties(){
        return {
            data : {type: Object},
            metaDetails : {type: Object},
            metaId: {type:String},
            onCloseForm: {type:Function}
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
    async saveData(){
        if(!this.metaDetails){
            this.isNewRecord = true;
        }
        let payload = {
            uuid:this.metaId,
            protocolId: this.id 
        }

        await this.saveMetaData(payload);
        this.onCloseForm();

        
    }
    render(){
        return html `
            <span>Insert New Protocol ID</span>
            <div class="wrapper">
                <paper-input label="Protocol Id" name=id @change=${this.handleChange}></paper-input>
                <paper-button @click = ${()=>{this.handleSubmit(this.id)}}>Find</paper-button>
                ${this.data ? 
                html `<protocol-inner-tab .protocolDetails = ${this.data} class="overflow-wrapper"></protocol-inner-tab>
                    <paper-button @click=${this.saveData}>Save</paper-button>
                `    
                : html `<h1>No protocol found</h1>`}
            </div>
        `;
    }
}
window.customElements.define('insert-protocol-id',InsertProtocolIdComponent);