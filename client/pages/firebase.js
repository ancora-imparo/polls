import 'firebase/database';
import firebase from 'firebase/app';

export const initializeFirebase = async (firebaseConfig) => {
  await firebase.initializeApp(firebaseConfig);
};
export const readFromRef = async (refrencePath = '/') => {
  const db = firebase.database();
  const ref = db.ref(refrencePath);
  const snapshot = await ref.once('value');
  return snapshot.val();
};
