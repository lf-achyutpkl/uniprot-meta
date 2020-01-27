import { LitElement, html, css } from 'lit-element';


/**
 * `uniprot-meta`
 * Convert any component metadata aware.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class UniprotMeta extends LitElement {
  constructor() {
    super();
    this.metaData = 'Loading...'
  }

  static get styles() {
    return css`
        :host {
          display: block;
        }
        .meta-wrp {
          display: flex;
          align-items: center 
        }
        .icon {
          padding-left: 0.2em;
          width: var(--icon-width, 16px);
          height: var(--icon-height, 16px);
        }
    `;
  }

  firstUpdated() {
    this.fetchAndSetMetaData();
  }

  /**
   * Fetch meta data from any api provided by user.
   */
  async fetchAndSetMetaData() {
    const response = await this.apiCall(this.metaUrl);
    this.metaData = await this.readValue(response, this.fieldPath);
    
  }

  /**
   * Actual api call.
   * @param { String } uri 
   */
  async apiCall(uri) {
    const res = await fetch(uri);

    return await res.json();
  }

  /**
   * Read data from object, sometime we need to read from nested object too.
   * 
   * @param { Object } response 
   * @param { String } path Path to value in object. 
   */
  readValue(response, path) {
    const properties = path.split('.');
    return properties.reduce((prev, curr) => prev && prev[curr], response);
  }

  /**
   * Open new tab with detail url.
   */
  handleIconClick() {
   this.detailUrl &&
      window.open(this.detailUrl);
  }

  render() {
    return html`
        <span class="meta-wrp">
          <slot></slot>
          <img 
          class='icon' 
          src='../assets/images/info-icon.png' 
          @click=${this.handleIconClick} 
          title=${this.metaData} />
        </span>`
    ;

  }

  static get properties() {
    return { 
      metaUrl: { type: String },
      fieldPath: { type: String },
      metaData: { type: String },
      detailUrl: { type: String }
    };
  }
}

window.customElements.define('uniprot-meta', UniprotMeta);
