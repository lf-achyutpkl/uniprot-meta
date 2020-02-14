import admin from 'firebase-admin';

import serviceAccount from './config';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

const db = admin.firestore();

export default db; 