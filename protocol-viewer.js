import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-dialog/paper-dialog.js';
import { LitElement, html, css } from 'lit-element';
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';


/**
 * `protocol-viewer`
 * Display protocol for any process.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class ProtocolViewer extends LitElement {

  constructor() {
    super();

    this.selectedPage = 0;
  }

  static get styles() {
    return css`
        .dialog-wrapper {
          padding: 16px;
        }
        .author-name {
          padding: 2px;
        }
        #protocol {
          width: 900px;
          height: 500px;
          overflow-y: scroll;
        }
    `;
  }

  renderAuthorNames(authors) {
    return authors && authors.map(author => 
      `<span class="author-name">${author.name}<span>`
    ).join(', ');
  }

  renderSteps(steps) {
    return steps && steps.map(step => 
      `<div>
        <h3>${step.components[0].source.title}</h3>
        <p>${step.components[1].source.description}</p>
        <hr/>
      </div>`
    )
  }

  renderMaterials(materials) {
    return materials && materials.map(material => 
      `<tr>
        <td>${material.name}</td>
        <td>${material.sku}</td>
        <td>${material.vendor.name}</td>
      </tr>`
    )
  }

  render() {
    return html`
    <paper-dialog id="protocol">
      <div class="dialog-wrapper">  
      <h1>Protocol</h1>  
      <h2>${this.protocol.title}</h2>
        
        <div>
          Authors: ${unsafeHTML(this.renderAuthorNames(this.protocol.authors))}
        </div>
      </div>
      
      <paper-tabs selected="${this.selectedPage}">
        <paper-tab @click=${() => this.selectedPage = 0}>Abstract</paper-tab>
        <paper-tab @click=${() => this.selectedPage = 1}>Steps</paper-tab>
        <paper-tab @click=${() => this.selectedPage = 2}>Material</paper-tab>
      </paper-tabs>
      <iron-pages selected="${this.selectedPage}">
        <div class="tab-page">
          ${unsafeHTML(this.protocol.description)}
        </div>
        <div  class="tab-page">
            ${unsafeHTML(this.renderSteps(this.protocol.steps))}
        </div>
        <div class="tab-page">
          <h3>Materials</h3>
          <table border=1>
            <thead>
              <tr>
                <th>Name</th>
                <th>Cataog</th>
                <th>Vendor</th>
              </tr>
            </thead>
            <tbody>
              ${unsafeHTML(this.renderMaterials(this.protocol.materials))}
            </tbody>
          </table>
        </div>
     </iron-pages>
     
    </paper-dialog>
    `;
  }

  open() {
    this.shadowRoot.querySelector('#protocol').open();
  }

  static get properties() {
      return { 
        protocol: { type: Object },
        selectedPage: { type: Number }
      };
    }
}

window.customElements.define('protocol-viewer', ProtocolViewer);
