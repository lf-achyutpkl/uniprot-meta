import admin from 'firebase-admin';

import './../env';
import serviceAccount from '../config';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

const db = admin.firestore();
let metaCollection =  db.collection('meta-project');

export default metaCollection; 