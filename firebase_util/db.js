import firebase from 'firebase';

// import './../env';
import firebaseConfig from '../config';

admin.initializeApp(firebaseConfig);

const db = firebase.firestore();
let metaCollection =  db.collection('meta-project');

export default metaCollection; 