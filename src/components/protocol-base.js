import { LitElement, html } from 'lit-element';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/iron-pages/iron-pages.js';

/**
 * `protocol-base`
 * Display protocol for any process.
 *
 * @customElement
 * @polymer
 */
class ProtocolBase extends LitElement {

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
    <h1 class="center">Experiment only</h1>
    <div class="wrapper">
        <button>Edit</button>
        <paper-tabs selected={{selected}} noink>
            <paper-tab>Overview</paper-tab>
            <paper-tab>Protocal</paper-tab>
            <paper-tab>Data</paper-tab>
        </paper-tabs>

        <iron-pages selected={{selected}} >
     
            <div>
                 <input type="test"  value="Amet aliquam id diam maecenas ultricies mi eget mauris pharetra."/><br>
            </div>
            <div>Ipsum faucibus vitae aliquet nec. Amet aliquam id diam maecenas ultricies mi eget mauris pharetra. Tincidunt augue interdum velit euismod in. In pellentesque massa placerat duis ultricies lacus sed turpis tincidunt.</div>
            <div>sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam nulla facilisi cras fermentum odio. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet. Ipsum faucibus vitae aliquet nec. Amet aliquam id diam maecenas ultricies mi eget mauris pharetra. Tincidunt augue interdum velit euismod in. In pellentesque massa placerat duis ultricies lacus sed turpis tincidunt. Lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit. Sollicitudin tempor id eu nisl nunc mi ipsum.</div>
        </iron-pages>
    </div>
        
    `;
  }
}

window.customElements.define('protocol-base', ProtocolBase);
