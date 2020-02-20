import { LitElement, html, css } from "lit-element";
import "@polymer/paper-input/paper-input";
import "@polymer/paper-button/paper-button";
import "@polymer/iron-pages/iron-pages";
import "@polymer/paper-tabs/paper-tab";
import "@polymer/iron-icons/iron-icons";
import "@polymer/paper-tabs/paper-tabs";
import "./step-component";
import "./protocol-inner-tab";
import "./insert-protocol-id";

class ProtocolSteps extends LitElement {
  static get properties() {
    return {
      protocolId: { type: String },
      metaId: { type: String },
      metaDetails: { type: Object },
      allowEdit: { type: Boolean },
      protocolDetails: { type: Object },
      selectedTab: { type: Number },
      isDataLoaded: { type: Boolean },
      isEditable: { type: Boolean },
      onRefreshData: { type: Function }
    };
  }

  constructor() {
    super();
    this.protocolId = null;
    this.isDataLoaded = false;
    this.protocolDetails = "";
    this.fetchProtocol = this.fetchProtocol.bind(this);
    this.handleFindId = this.handleFindId.bind(this);
    this.checkEditable = this.checkEditable.bind(this);
  }

  firstUpdated() {
    if (this.metaDetails) {
      this.protocolId = this.metaDetails.protocolId;
    }
    this.fetchProtocol(this.protocolId);
    this.checkEditable();
  }
  closeForm() {
    this.isEditable = false;
    this.onRefreshData();
  }

  checkEditable() {
    if (!this.protocolId) {
      this.isEditable = true;
    } else {
      this.isEditable = false;
    }
  }

  static get styles() {
    return css`
      .protocol-container {
        border-bottom: 1px solid black;
        margin-top: 10px;
      }

      .wrapper {
        height: 350px;
        padding: 5px 30px 30px;
      }

      paper-tabs {
        --paper-tab-ink: #4285f4;
        --paper-tabs-selection-bar-color: #4285f4;
      }
      paper-tab {
        background-color: red;
      }
      iron-pages {
        padding: 10px;
      }
      .cancel-button {
        float: right;
        background-color: #4285f4;
        padding: 5px;
        color: white;
      }
      .edit-button {
        float: right;
        background-color: #4285f4;
        padding: 5px;
        color: white;
      }
      .no-protocol-mesg {
        text-align: center;
      }
      iron-icon {
        --iron-icon-height: 15px;
        --iron-icon-width: 15px;
      }
    `;
  }

  fetchProtocol(id) {
    const uri = `https://www.protocols.io/api/v3/protocols/${id}`;
    fetch(uri)
      .then(response => {
        if (!response.ok) throw response;
        return response.json();
      })
      .then(data => {
        this.prevData = data;
        this.protocolDetails = data;
        this.isDataLoaded = true;
      })
      .catch(error => {
        console.error(error);
        this.protocolDetails = null;
        this.isDataLoaded = false;
      });
  }

  handleFindId(id) {
    id ? this.fetchProtocol(id) : console.log("please fill the input id", id);
  }

  handleEdit() {
    this.protocolId = null;
    this.protocolDetails = null;
    this.isEditable = true;
  }

  handleView() {
    if (this.metaDetails) {
      this.protocolId = this.metaDetails.protocolId;
    }
    this.protocolDetails = this.prevData;
    this.isEditable = false;
  }
  renderNoProtocolFound() {
    return html`
      <h3 class="no-protocol-mesg">No protocol Found</h3>
    `;
  }
  renderProtocolInnerTab() {
    return html`
      <div class="wrapper">
        <protocol-inner-tab
          .protocolDetails=${this.protocolDetails}
        ></protocol-inner-tab>
      </div>
    `;
  }

  renderProtocolData() {
    return html`
      ${!this.isDataLoaded
        ? html`
            <span>Loading</span>
          `
        : this.renderProtocolInnerTab()}
    `;
  }

  renderReadOnlyMode() {
    return html`
      ${!this.protocolId
        ? this.renderNoProtocolFound()
        : this.renderProtocolData()}
    `;
  }
  renderInsertProtocolId() {
    return html`
      <div class="wrapper">
        <paper-button class="cancel-button" @click=${this.handleView}>
          cancel
          <iron-icon icon="cancel"></iron-icon>
        </paper-button>
        <insert-protocol-id
          .handleSubmit=${this.handleFindId}
          .data=${this.protocolDetails}
          .metaId=${this.metaId}
          .metaDetails=${this.metaDetails}
          .onCloseForm=${this.closeForm.bind(this)}
          .dataLoaded=${this.isDataLoaded}
        ></insert-protocol-id>
      </div>
    `;
  }
  renderViewProtocolAdmin() {
    this.handleView();
    return html`
      ${!this.protocolId
        ? html`
            <paper-button class="edit-button" @click=${this.handleEdit}>
              Edit
              <iron-icon icon="create"></iron-icon>
            </paper-button>
            ${this.renderNoProtocolFound()}
          `
        : this.renderProtocolData()}
    `;
  }

  renderReadAndWriteMode() {
    return html`
      ${this.isEditable
        ? this.renderInsertProtocolId()
        : this.renderViewProtocolAdmin()}
    `;
  }

  render() {
    //change
    return html`
      ${!this.allowEdit
        ? this.renderReadOnlyMode()
        : this.renderReadAndWriteMode()}
    `;

    //user view
    // if (!this.allowEdit) {
    //   if (!this.protocolId) {
    //     this.renderNoProtocolFound();
    //   } else {

    //   }
    // } else {
    //   // admin view
    //   if (this.isEditable) {
    //    
    //   } else {
    //     //admin press view button
    //     this.handleView();
    //     if (!this.protocolId) {
    //       return html`
    //         <div class="wrapper">
    //           <paper-button class="edit-button" @click=${this.handleEdit}>
    //             Edit
    //             <iron-icon icon="create"></iron-icon>
    //           </paper-button>
    //           <h3 class="no-protocol-mesg">No protocol Found</h3>
    //         </div>
    //       `;
    //     } else {
    //       if (!this.isDataLoaded) {
    //         return html`
    //           <span>Loading</span>
    //         `;
    //       } else {
    //         return html`
    //           <div class="wrapper">
    //             <paper-button class="edit-button" @click=${this.handleEdit}>
    //               Edit
    //               <iron-icon icon="create"></iron-icon>
    //             </paper-button>
    //             <protocol-inner-tab
    //               .protocolDetails=${this.protocolDetails}
    //             ></protocol-inner-tab>
    //           </div>
    //         `;
    //       }
    //     }
    //   }
    // }
  }
}

window.customElements.define("protocol-steps", ProtocolSteps);
