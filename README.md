# Uniprot Meta

## Developer Setup

Make sure you have `node`, `npm`, `yarn` and `polymer-cli` installed. Install
`node` and `npm` using your favorite tool. After that,

```bash
$ npm install -g polymer-cli
```

Install dependencies:

```bash
$ yarn
```

__Copy Firebase config to firebase.config file.__


Running the app:

```bash
$ yarn start
```


## Usage
This guide contains information on available components and their props.

### 1) MetaBase ```<meta-base>```
 #### Props
 1)  **label**: ``` STRING``` A label fot the component.
 2) **metaId**: ``` STRING``` ID of the metadata to be displayed.
 3) **allowEdit**: ``` BOOLEAN```  To control visibility of edit button.
 4) **showProtocol**: ``` BOOLEAN```  To control visibility of Protocol tab.
 5) **showData**: ``` BOOLEAN```  To control visibility of Data tab.
 
**Note:** All props are ``` undefined ``` by default

#### Example

```
  <meta-base
    allowEdit
    showProtocol
    label="GeneID"
    metaId="068aae74-b733-487a-8b8b-48cc6d86113j"
  >
    <img src="../area_graph.png"/>
  </meta-base>
```

### 2) UniprotMeta ```<uniprot-meta>```
 #### Props
 1)  **metaUrl**: ``` STRING``` URL to fetch meta data.
 2) **fieldPath**: ``` STRING``` Path of the field present in the response of metaUrl. The value obtained from the path is used to display extra information when hovered on info icon.
 3) **detailUrl**: ``` STRING```  The URL to redirect to when clicked on the info icon.
 4) **validate**: ``` BOOLEAN```  To specify if any validation is required.
 
**Note:** All props are ``` undefined ``` by default

#### Example

```
<uniprot-meta
  validate
  metaUrl="https://www.ebi.ac.uk/proteins/api/proteins/P04629" 
  fieldPath="protein.recommendedName.fullName.value" 
  detailUrl="http://www.ncbi.nlm.nih.gov/pubmed/1281417"
 >
  <input name="geneID" type="text" />
</uniprot-meta>
```


EDAM Oncology: https://bioportal.bioontology.org/ontologies/EDAM?p=classes&conceptid=topic_2640
