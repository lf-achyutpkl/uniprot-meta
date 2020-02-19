import "@polymer/paper-button";
import "@polymer/paper-input/paper-input";
import "@polymer/paper-input/paper-textarea";
import "./search-component";
import { LitElement, html, css } from "lit-element";

import MetaMixin from "../../mixins/metaMixin";

/**
 * `protocol-overview`
 * Display protocol overview for any process.
 *
 * @customElement
 * @polymer
 */
class MetaOverviewEdit extends MetaMixin(LitElement) {
  static get properties() {
    return {
      metaDetails: { type: Object },
      metaId: { type: String },
      onCloseForm: { type: Function },
      searchArray: { type: Array },
      dataLoaded: { type: Boolean },
      searchName: { type: String },
      showSearchBar: { type: Boolean },
      editable: { type: Boolean },
      toggleEditable: { type: Function }
    };
  }
  constructor() {
    super();
    this.searchArray = [];
    this.dataLoaded = false;
    this.searchName = "";
    this.handleChange = this.handleChange.bind(this);
    this.getOverviewName = this.getOverviewName.bind(this);
    this.searchItemClicked = this.searchItemClicked.bind(this);
    this.saveData = this.saveData.bind(this);
    this.showSearchBar = false;
  }

  firstUpdated() {
    this.initializeForm();
    this.element = this.shadowRoot.querySelector("search-component");
  }

  handleChange(e) {
    this[e.target.name] = e.target.value;
    if (!this.searchName) {
      return (this.searchArray = []);
    }
    this.getOverviewName(this.searchName);
  }

  initializeForm() {
    // @todo this method requires refactor
    if (this.metaDetails && this.metaDetails.name) {
      return;
    }
    if (!this.metaDetails) {
      this.isNewRecord = true;
    }
    this.metaDetails = {
      uuid: this.metaId,
      name: "",
      description: "",
      experimentId: "",
      experimentNotes: ""
    };
  }

  async saveData() {
    await this.saveMetaData(this.metaDetails);
    this.onCloseForm();
  }

  async getOverviewName(name) {
    return this.getMetaName(name)
      .then(response => {
        this.data = response;
        this.searchArray = [];
        this.data.docs.map(item => {
          this.searchArray.push(item.data());
          this.dataLoaded = true;
        });
      })
      .catch(error => console.log(error));
  }
  searchItemClicked(data) {
    this.metaDetails = {
      uuid: this.metaId,
      name: data.name,
      description: data.description,
      experimentId: data.experimentId,
      experimentNotes: data.experimentNotes
    };
  }

  render() {
    return html`
      <div class="header-wrapper">
        <paper-icon-button
          class="toggle-edit"
          class="toggle-edit"
          icon="${this.editable ? "visibility" : "create"}"
          @click="${() => {
            this.toggleEditable();
          }}"
        ></paper-icon-button>
        <div class="search-container">
          <search-component
            .data=${this.searchArray}
            .handleChange=${this.handleChange}
            .fetchName=${this.getOverviewName}
            .searchName=${this.searchName}
            .searchItemClicked=${this.searchItemClicked}
          >
          </search-component>
        </div>
        
      </div>
      
      <form>
        <div class="wrapper">
          <h3>Edit Overview Detail</h3>
          <paper-input
            class="name-input"
            label="Name"
            value="${this.metaDetails.name}"
            @input="${e => {
              this.metaDetails.name = e.target.value;
            }}"
          ></paper-input>
          <paper-textarea
            label="Description"
            value="${this.metaDetails.description}"
            @input="${e => {
              this.metaDetails.description = e.target.value;
            }}"
          ></paper-textarea>
          <paper-input
            class="name-input"
            label="Experiment ID"
            value="${this.metaDetails.experimentId}"
            @input="${e => {
              this.metaDetails.experimentId = e.target.value;
            }}"
          ></paper-input>
          <paper-textarea
            label="Expertiment Notes"
            value="${this.metaDetails.experimentNotes}"
            @input="${e => {
              this.metaDetails.experimentNotes = e.target.value;
            }}"
          ></paper-textarea>
        </div>

        <paper-button class="right btn" @click="${this.saveData}">
          Save
        </paper-button>
      </form>
    `;
  }

  static get styles() {
    return css`
      .right {
        float: right;
      }
      .btn {
        margin: 10px;
        background-color: #4285f4;
        color: white;
      }
      .wrapper {
        margin-top: 10px;
        height: 350px;
        overflow: auto;
      }

      .toggle-edit {
        float: right;
      }
      .header-wrapper {
        position: relative;
        height:50px;
      }
      .search-container{
        width:70%;
        position:relative;
      }
    `;
  }
}

window.customElements.define("meta-overview-edit", MetaOverviewEdit);
