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
                box-shadow:0 5px 10px #e8e8e8;
                width:100%;
                display:block;
            }
            .item{
                padding:10px;
                cursor:pointer;
            }
            .item:hover{
                background-color:#f5f5f5
            }
        `;
    }
    constructor(){
        super();
        this.element = '';
        
    }
    render(){
        this.element = this.shadowRoot.getElementById("floating-wrapper"); 
        return html`
        <div class="wrapper"> 
        <paper-input label="search by name" name="searchName" @input = ${(e) => {
            this.handleChange(e)}
        }>
             <paper-icon-button icon="search" slot="suffix" @click=${() => this.fetchName(this.searchName)} ></paper-icon-button>
        </paper-input>
            <div id="floating-wrapper">
                ${this.data.map(item => {
                    this.element.style.display = `block`
                return html  `
                    
                    <div class="item" @click=${()=>{   

                        this.element.style.display = "none";
                        this.searchItemClicked(item)}}>${item.name}</div>
                    ` 
                })}
            </div>
        </div>
        
          `;
    }
}
window.customElements.define('search-component',SearchComponent);