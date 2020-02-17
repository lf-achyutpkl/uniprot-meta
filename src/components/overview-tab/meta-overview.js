import '@polymer/iron-icons';
import { LitElement, html,css } from 'lit-element';
import '@polymer/paper-icon-button/paper-icon-button';

import './meta-overview-edit';

/**
 * `protocol-overview`
 * Display protocol overview for any process.
 *
 * @customElement
 * @polymer
 */
class MetaOverview extends LitElement {
  static get properties(){
    return{
      editable: { type: Boolean },
      allowEdit: { type: Boolean },
      overviewDetails: { type: Object },
    }
  }

  render() {
    return html`
      <div class="wrapper">
        ${this.allowEdit ? html`
          <div class="edit-icon-wrp"> 
            <paper-icon-button
              icon="${this.editable ? 'visibility' : 'create'}"
              @click="${() => {this.editable = !this.editable}}"
            ></paper-icon-button>
          </div>` : ''
        }

        ${
          !this.overviewDetails ? 
          'No Data Available':
          null
        }

        ${
          !this.editable && this.overviewDetails? 
          html `
            <div>
              <div class="item-body">
                <span class="label">Name</span>
                <span class="value">${this.overviewDetails['name']}</span>
              </div>

              <div class="item-body">
                <span class="label">Description</span>
                <span class="value">${this.overviewDetails['description']}</span>
              </div>

              <div class="item-body">
                <span class="label">Experiment Id</span>
                <span class="value">
                  <a href="${this.overviewDetails['experimentId']}">${this.overviewDetails['experimentId']}</a>
                </span>
              </div>

              <div class="item-body">
                <span class="label">Experiment Note</span>
                <span class="value">${this.overviewDetails['experimentNotes']}</span>
              </div>
            </div>
          </div>
          `: 
          html `
          <meta-overview-edit .overviewDetails=${this.overviewDetails}></meta-overview-edit>`
        }
      </div>
    `;
  }

  static get styles(){
    return css `
      .green{
        background-color:#30B542;
        color:white;
      }
      .right{
        float:right;
      }
      .bolder{
        font-size:20px;
      }
      .wrapper{
        overflow:auto;
        padding:5px 30px 30px;
      }
      .btn{
        margin:10px;
      }
      iron-icon{
        cursor:pointer;
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
    `;
  }
}

window.customElements.define('meta-overview', MetaOverview);
