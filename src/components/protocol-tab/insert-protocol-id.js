import { LitElement, html, css } from "lit-element";
import "@polymer/paper-input/paper-input";
import "@polymer/paper-button/paper-button";
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
      id: { type: String }
    };
  }

  constructor() {
    super();
    this.id = "";

    this.handleChange = this.handleChange.bind(this);
  }
  firstUpdated() {
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
        width:80%;
      }
      paper-button {
        float: right;
        background-color: #4285f4;
        color: white;
        padding: 10px;
        margin:10px;
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

    await this.saveMetaData(payload);
    this.onCloseForm();
  }

  render() {
    return html`
      <div class="wrapper">
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
       

        ${this.data
          ? html`
          
          <protocol-inner-tab
                .protocolDetails=${this.data}
                
              ></protocol-inner-tab>
         
              
              <paper-button @click=${this.saveData} class="save-button">Save</paper-button>
            `
          : ""}
      </div>
    `;
  }
}
window.customElements.define("insert-protocol-id", InsertProtocolIdComponent);
