import { LitElement, html, css } from "lit-element";
import "@polymer/paper-input/paper-input";
import "@polymer/paper-button/paper-button";
import "@polymer/iron-pages/iron-pages";
import "@polymer/paper-tabs/paper-tab";
import "@polymer/paper-tabs/paper-tabs";
import "./step-component";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

class ProtocolInnerTab extends LitElement {
  static get properties() {
    return {
      protocolDetails: { type: Object },
      selectedTab: { type: Number }
    };
  }

  static get styles() {
    return css`
      table {
        width: 100%;
        border: 1px solid black;
      }

      td {
        padding: 10px;
      }
      th {
        font-size: 16px;
      }
      .steps-title {
        color: black;
        font-size: 18px;

        padding: 5px;
        box-shadow: 0 5px 10px #f0f0f0;
      }
      .steps-container {
        padding: 10px;
        font-size: 14px;
      }
      paper-tabs {
        --paper-tab-ink: #4285f4;
        --paper-tabs-selection-bar-color: #4285f4;
        position:absolute;
        bottom:0;
        left:0;
        width:100%;
        background-color:white;
      }
      iron-pages {
        height: 350px;
        overflow: auto;
      }
      .protocol-container {
        border-bottom: 1px solid grey;
      }
    `;
  }

  constructor() {
    super();
    this.protocolSteps = {};
    this.protocolAbstract = "";
    this.tabs = [
      { title: "Abstract" },
      { title: "Steps" },
      { title: "Material" }
    ];
    this.selectedTab = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    this.parseProtocolAbstract();
    this.parseProtocolSteps();
  }

  parseProtocolAbstract() {
    this.protocolAbstract = this.protocolDetails.protocol.description;
  }

  parseProtocolSteps() {
    this.protocolDetails.protocol.steps.forEach((step, index) => {
      let title = step.components[0].source.title;
      if (!this.protocolSteps[title]) {
        this.protocolSteps[title] = [];
      }
      this.protocolSteps[title].push({
        stepNumber: index + 1,
        description: step.components[1].source.description
      });
    });
  }
  renderAbstractTab() {
    return html`
      <div>
        <span>Abstract</span>
        <div>${unsafeHTML(this.protocolAbstract)}</div>
      </div>
    `;
  }

  renderStepsTab() {
    return html`<div>
    ${Object.entries(this.protocolSteps).map(([title, details]) => {
      return html`
        <div class="protocol-container">
          <span class="steps-title">${title}</span>
          <div class="steps-container">
            ${details.map(step => {
              return html`
                <steps-component
                  stepIndex="${step.stepNumber}"
                  description="${step.description}"
                ></steps-component>
              `;
            })}
          </div>
        </div>
      `;
    })}
  </div>`;
    
  }
  
  renderMaterialTab(){
    return html `<div>
    <table>
      <tr>
        <th>Name</th>
        <th>Catalog#</th>
        <th>Vendor</th>
      </tr>
      ${this.protocolDetails.protocol.materials.map(material => {
        return html`
          <tr class="material">
            <td>${material.name}</td>
            <td>${material.sku}</td>
            <td>${material.vendor.name}</td>
          </tr>
        `;
      })}
    </table>
  </div>`

  }
  render() {
    return html`
      
      <iron-pages selected=${this.selectedTab}>
        ${this.renderAbstractTab()}
        ${this.renderStepsTab()}
        ${this.renderMaterialTab()}
      </iron-pages>
    
      <paper-tabs selected=${this.selectedTab}>
        ${this.tabs.map((tab, index) => {
          return html`
            <paper-tab
              @click="${() => {
                this.selectedTab = index;
              }}"
              >${tab.title}</paper-tab
            >
          `;
        })}
      </paper-tabs>
    `;
  }
}
window.customElements.define("protocol-inner-tab", ProtocolInnerTab);
