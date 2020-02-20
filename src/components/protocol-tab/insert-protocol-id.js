import { LitElement, html, css } from "lit-element";
import "@polymer/paper-input/paper-input";
import "@polymer/paper-button/paper-button";
import "@polymer/paper-spinner/paper-spinner";

import "../protocol-tab/protocol-inner-tab";

import MetaMixin from "../../mixins/metaMixin";

class InsertProtocolIdComponent extends MetaMixin(LitElement) {
  static get properties() {
    return {
      data: { type: Object },
      metaDetails: { type: Object },
      metaId: { type: String },
      onCloseForm: { type: Function },
      dataLoaded: { type: Boolean },
      id: { type: String },
      isLoading: { type: Boolean },
      isSavingProtocol : {type:Boolean}
    };
  }

  constructor() {
    super();
    this.id = "";
    this.handleChange = this.handleChange.bind(this);
    this.isSavingProtocol = false;
  }
  connectedCallback() {
    super.connectedCallback();
    if (this.metaDetails.protocolId) {
      return (this.id = this.metaDetails.protocolId);
    }
  }

  handleChange(e) {
    this[e.target.name] = e.target.value;
  }
  static get styles() {
    return css`
      paper-input {
        box-shadow: 0 5px 10px #f0f0f0;
        padding: 0 10px;
        width: 80%;
      }
      paper-button {
        float: right;
        background-color: #4285f4;
        color: white;
        padding: 10px;
        margin: 10px;
      }
      .loader{
        width:100%;
        display:flex;
        justify-content:center;
      }
    `;
  }
  async saveData() {
    if (!this.metaDetails) {
      this.isNewRecord = true;
    }
    let payload = {
      uuid: this.metaId,
      protocolId: this.id
    };
    this.isSavingProtocol = true;
    await this.saveMetaData(payload);
    this.isSavingProtocol = false;
    this.onCloseForm();
  }

  renderSearchBar() {
    return html`
      <paper-input
        placeholder="Search for Protocol"
        name="id"
        no-label-float
        @change=${this.handleChange}
        value=${this.id}
      >
        <paper-icon-button
          @click=${() => {
            this.handleSubmit(this.id);
          }}
          icon="search"
          slot="suffix"
        >
        </paper-icon-button>
      </paper-input>
    `;
  }

  renderInnerProtocolTab() {
    return html`
      <protocol-inner-tab .protocolDetails=${this.data}></protocol-inner-tab>
      <paper-button @click=${this.saveData} class="save-button"
        >
        ${this.isSavingProtocol ? html `<paper-spinner active></paper-spinner>`: 'SAVE'}
        </paper-button
      >
    `;
  }
  checkStatusAndRender() {
    if (!this.isLoading) {
      return html`
        ${this.data ? this.renderInnerProtocolTab() : ""}
      `;
    } else {
      return html`
      <div class="loader">
        <paper-spinner active></paper-spinner>
      </div>
      `;
    }
  }
  render() {
    return html`
      <div class="wrapper">
        ${this.renderSearchBar()} 
        ${this.checkStatusAndRender()}
      </div>
    `;
  }
}
window.customElements.define("insert-protocol-id", InsertProtocolIdComponent);
