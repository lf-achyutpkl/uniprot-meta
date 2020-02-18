import {LitElement,html,css} from 'lit-element';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-icon-button/paper-icon-button';
class SearchComponent extends LitElement{
    static get properties(){
        return {
            fetchName :{type:Function},
            handleChange: {type:Function},
            data : {type :Array},
            searchName :{type:String},
            searchItemClicked : {type:Function}
        }
    }
    static get styles(){
        return css `
            .wrapper{
                width:100%;
                position:relative;
            }
            #floating-wrapper{
                position:absolute;
                background-color:white;
                z-index:2;
                box-shadow:0 5px 10px grey;
                width:100%;
            }
            .item{
            
                width:100%;
                padding:10px;
                cursor:pointer;
            }
            .hide{
                display:none;
            }
            
        `;
    }
    constructor(){
        super();
        
    }
    render(){
        return html`
        <div class="wrapper"> 
        <paper-input label="search" name="searchName" @input = ${this.handleChange}>
             <!-- <paper-icon-button icon="search" slot="suffix" @click=${() => this.fetchName(this.searchName)} ></paper-icon-button> -->
        </paper-input>
            <div id="floating-wrapper">
                ${this.data.map(item => {
                return html  `
                    <div class="item" @click=${()=>{
                        this.searchItemClicked(item)}}>${item.name}</div>
                    ` 
                })}
            </div>
        </div>
        
          `;
    }
}
window.customElements.define('search-component',SearchComponent);