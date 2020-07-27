import { LitElement, html } from "lit-element";
import "../../../uniprot-meta";

class UniprotMeta extends LitElement {
  render() {
    return html`
      <form>
        Input One
        <uniprot-meta
          id="inputOne"
          requiresValidation
          metaUrl="https://www.ebi.ac.uk/proteins/api/proteins/P04629"
          fieldPath="protein.recommendedName.fullName.value"
          detailUrl="http://www.ncbi.nlm.nih.gov/pubmed/1281417"
        >
          <input name="geneID" type="text" />
        </uniprot-meta>
        <br />
        Input Two
        <uniprot-meta
          id="inputTwo"
          requiresValidation
          metaUrl="https://www.ebi.ac.uk/proteins/api/proteins/P04629"
          fieldPath="protein.recommendedName.fullName.value"
          detailUrl="http://www.ncbi.nlm.nih.gov/pubmed/1281417"
        >
          <input name="geneID" type="text" />
        </uniprot-meta>
        <br />
        <button type="button" @click="${this.submitForm}">
          Submit
        </button>
      </form>
    `;
  }

  submitForm() {
    const isInputOneValid = this.shadowRoot
      .querySelector("#inputOne")
      .validate();
    const isInputTwoValid = this.shadowRoot
      .querySelector("#inputTwo")
      .validate();
    const isFormValid = isInputOneValid && isInputTwoValid;
    console.log(`The form is ${isFormValid ? " Valid" : "Invalid"}`);
    alert(`The form is ${isFormValid ? "valid" : "invalid"}`);
  }
}

window.customElements.define("uniprot-meta-form", UniprotMeta);
