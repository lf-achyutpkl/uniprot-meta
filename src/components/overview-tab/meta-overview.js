import "@polymer/iron-icons";
import { LitElement, html, css } from "lit-element";
import "@polymer/paper-icon-button/paper-icon-button";
import "@polymer/iron-icon/iron-icon";

import "./meta-overview-edit";
import MetaMixin from "../../mixins/metaMixin";

/**
 * `protocol-overview`
 * Display protocol overview for any process.
 *
 * @customElement
 * @polymer
 */
class MetaOverview extends LitElement {
  static get properties() {
    return {
      // TODO: @ishan prefix editable with is. eg: isEditable
      editable: { type: Boolean },
      allowEdit: { type: Boolean },
      metaDetails: { type: Object },
      metaId: { type: String },
      onRefreshData: { type: Function }
    };
  }

  closeForm() {
    this.editable = false;
    this.onRefreshData();
  }

  render() {
    let isDataAvailable = this.metaDetails && this.metaDetails.name;
    return html`
      <div class="wrapper">
        ${this.editable
          ? this.renderOverviewForm()
          : isDataAvailable
          ? this.renderOverviewDetails()
          : this.renderNoDataAvailable()}
      </div>
    `;
  }

  renderNoDataAvailable() {
    return html`
      <div class="text-center">
        <h3>No Data Available</h3>
        ${this.allowEdit
          ? html`
              <paper-button
                class="green"
                @click="${() => (this.editable = true)}"
              >
                Create New
              </paper-button>
            `
          : ""}
      </div>
    `;
  }
  toggleEditable() {
    // TODO: @roshan let's remove all console.logs
    console.log(this.editable);

    this.editable = !this.editable;
  }

  renderOverviewForm() {
    return html`
      <meta-overview-edit
        .metaDetails=${this.metaDetails}
        .metaId=${this.metaId}
        .onCloseForm="${this.closeForm.bind(this)}"
        .editable=${this.editable}
        .toggleEditable=${this.toggleEditable.bind(this)}
      ></meta-overview-edit>
    `;
  }

  renderOverviewDetails() {
    return html`
      ${this.allowEdit
        ? html`
            <paper-button
              class="toggle-edit"
              @click="${() => {
                this.editable = !this.editable;
              }}"
            >
              Edit
              <iron-icon icon="create" class="edit-icon"></iron-icon>
            </paper-button>
          `
        : ""}

      <div>
        <div class="item-body">
          <span class="label">Name</span>
          <span class="value">${this.metaDetails["name"]}</span>
        </div>

        <div class="item-body">
          <span class="label">Description</span>
          <span class="value">${this.metaDetails["description"]}</span>
        </div>

        <div class="item-body">
          <span class="label">Experiment Id</span>
          <span class="value">
            <a target="_blank" href="${this.metaDetails["experimentId"]}"
              >${this.metaDetails["experimentId"]}</a
            >
          </span>
        </div>

        <div class="item-body">
          <span class="label">Experiment Note</span>
          <span class="value">${this.metaDetails["experimentNotes"]}</span>
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      .text-center {
        text-align: center;
      }
      .green {
        background-color: #30b542;
        color: white;
      }
      .right {
        float: right;
      }
      .bolder {
        font-size: 20px;
      }
      .wrapper {
        padding: 5px 30px 30px;
      }
      .btn {
        margin: 10px;
      }
      iron-icon {
        cursor: pointer;
      }
      .label {
        font-size: 0.9em;
        display: block;
        color: #737373;
      }
      .value {
        font-size: 1em;
        display: block;
      }
      .item-body {
        padding: 10px;
      }
      .edit-icon-wrp {
        display: flex;
        justify-content: flex-end;
      }
      .toggle-edit {
        float: right;
        background-color: #4285f4;
        padding: 5px;
        color: white;
      }
      .edit-icon {
        --iron-icon-height: 15px;
        --iron-icon-width: 15px;
      }
    `;
  }
}

window.customElements.define("meta-overview", MetaOverview);
