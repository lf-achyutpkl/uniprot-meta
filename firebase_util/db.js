import firebase from "firebase";

// import './../env';
import firebaseConfig from "../config";

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
let metaCollection = db.collection("meta-project");

export default metaCollection;
