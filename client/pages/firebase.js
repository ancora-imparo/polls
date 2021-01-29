import * as admin from 'firebase-admin';
import axios from 'axios';

const initializeFirebase = async (endpoints) => {
  const serviceAccount = JSON.parse(
    endpoints.GOOGLE_APPLICATION_CREDENTIALS_CLIENT
  );
  console.log(serviceAccount);
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: endpoints.DATABASE_URL,
      databaseAuthVariableOverride: {
        uid: endpoints.DATABASE_AUTH_VARIABLE_UID_CLIENT,
      },
    });
  }

  const db = admin.database();
  const ref = db.ref('/');
  ref.on(
    'value',
    (snapshot) => {
      console.log(snapshot.val());
    },
    (errorObject) => {
      console.log('The read failed: ' + errorObject.code);
    }
  );
};
export default initializeFirebase;
