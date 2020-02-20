import { LitElement, html, css } from "lit-element";
import "@polymer/paper-input/paper-input";
import "@polymer/paper-button/paper-button";
import "@polymer/paper-icon-button/paper-icon-button";
class SearchComponent extends LitElement {
  static get properties() {
    return {
      // TODO: @roshan I think fetchName is not being used.
      // Also remove it from from attribute where this component is used
      fetchName: { type: Function },
      handleChange: { type: Function },
      overviewDetails: { type: Array },
      searchName: { type: String },
      searchItemClicked: { type: Function },
      activeSearch: { type: Boolean },
      showSearchBar: { type: Boolean }
    };
  }

  static get styles() {
    return css`
      #wrapper {
        position: absolute;
        background-color: white;
        z-index: 2;
        box-shadow: 0 5px 10px #e8e8e8;
        width: 100%;
        animation-name: popup;
        animation-duration: 0.2s;
      }

      #floating-wrapper {
        display: block;
      }
      .item {
        padding: 10px;
        cursor: pointer;
      }
      .item:hover {
        background-color: #f5f5f5;
      }
      .search-bar {
        padding: 0 10px;
      }

      @keyframes popup {
        from {
          width: 0%;
        }
        to {
          width: 100%;
        }
      }
    `;
  }

  constructor() {
    super();
    this.showSearchBar = false;
  }

  render() {
    return html`
      ${this.showSearchBar
        ? html`
            <div id="wrapper">
              <paper-input
                class="search-bar"
                placeholder="Search"
                no-label-float
                name="searchName"
                type="search"
                @input=${e => {
                  this.shadowRoot.getElementById(
                    "floating-wrapper"
                  ).style.display = "block";
                  this.handleChange(e);
                }}
              >
                <paper-icon-button
                  slot="prefix"
                  icon="arrow-back"
                  @click=${() => {
                    this.showSearchBar = false;
                  }}
                ></paper-icon-button>
              </paper-input>
              <div id="floating-wrapper">
                ${this.overviewDetails.map(overviewName => {
                  return html`
                    <div
                      class="item"
                      @click=${() => {
                        this.shadowRoot.getElementById(
                          "floating-wrapper"
                        ).style.display = "none";
                        this.searchItemClicked(overviewName);
                      }}
                    >
                      ${overviewName.name}
                    </div>
                  `;
                })}
              </div>
            </div>
          `
        : html`
            <paper-icon-button
              id="search-wrapper"
              icon="search"
              @click=${() => {
                this.data = [];
                this.showSearchBar = true;
              }}
            ></paper-icon-button>
          `}
    `;
  }
}
window.customElements.define("search-component", SearchComponent);
