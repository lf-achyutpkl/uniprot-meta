import { LitElement, html } from 'lit-element';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/iron-pages/iron-pages.js';

import '../components/protocol-overview'
import '../components/protocol-steps'
import '../components/protocol-data'

/**
 * `protocol-base`
 * Display protocol for any process.
 *
 * @customElement
 * @polymer
 */
class ProtocolBase extends LitElement {

  static get properties () {
    return {
      selected: { type: Number }
    }
  }

  constructor () {
    super()
    this.tabs = [
      { title: 'Overview'},
      { title: 'Protocol'},
      { title: 'Data'}
    ]
    this.selected = 0
  }

  render() {
    return html `
    <style>
        paper-tabs{
            --paper-tabs-selection-bar-color: black;
            width:100%;
        }
        paper-tab-ink{
            color:red;
        }
        .wrapper{

            width:100%;
            margin:0 auto;
            box-shadow:0 10px 50px #e8e8e8;
            font-family: Arial, Helvetica, sans-serif;
        }
        iron-pages{
            
            height:300px;
            overflow:auto;
            padding:20px;
        }
        button{
            float:right;
            cursor:pointer;
            background-color:#04d643;
            border:1px solid white;
            color:white;
        }
        input{
            border:none;
            font-family: Arial, Helvetica, sans-serif;
            font-size:16px;
            color:black;
            width:100%;
        }
        .center{
            text-align:center;
        }

    </style>
    <div class="wrapper">
      <button>Edit</button>
      <paper-tabs selected="${this.selected}" noink>
          ${this.tabs.map((tab, index) => {
            return html`
              <paper-tab
                @click="${() => {this.selected = index}}"
              >
                ${tab.title}
              </paper-tab>
            `
          })}
      </paper-tabs>

      <iron-pages selected=${this.selected} >
        <protocol-overview></protocol-overview>
        <protocol-steps></protocol-steps>    
        <protocol-data></protocol-data>
      </iron-pages>
    </div>
        
    `;
  }
}

window.customElements.define('protocol-base', ProtocolBase);
