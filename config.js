// const serviceAccount = {
//     "type": process.env.SERVICE_ACCOUNT_TYPE,
//     "project_id": process.env.SERVICE_ACCOUNT_PROJECT_ID,
//     "private_key_id": process.env.SERVICE_ACCOUNT_PRIVATE_KEY_ID,
//     "private_key": process.env.SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
//     "client_email": process.env.SERVICE_ACCOUNT_CLIENT_EMAIL,
//     "client_id": process.env.SERVICE_ACCOUNT_CLIENT_ID,
//     "auth_uri": process.env.SERVICE_ACCOUNT_AUTH_URI,
//     "token_uri": process.env.SERVICE_ACCOUNT_TOKEN_URI,
//     "auth_provider_x509_cert_url": process.env.SERVICE_ACCOUNT_AUTH_PROVIDER_URL,
//     "client_x509_cert_url": process.env.SERVICE_ACCOUNT_CLIENT_URL    
//   };

const firebaseConfig = {
  apiKey: "AIzaSyD7I3e4jcCWCkpTjDDARhjEOzbV8xpgXpY",
  authDomain: "my-awesome-project-a149c.firebaseapp.com",
  databaseURL: "https://my-awesome-project-a149c.firebaseio.com",
  projectId: "my-awesome-project-a149c",
  storageBucket: "my-awesome-project-a149c.appspot.com",
  messagingSenderId: "1048085640248",
  appId: "1:1048085640248:web:db33ab206c1e0ca4ade2cd",
  measurementId: "G-S2ZL5Q6XMT"
};

export default firebaseConfig;