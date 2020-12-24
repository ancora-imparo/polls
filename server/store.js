const admin = require('firebase-admin');

exports.readFromRef = async (refrencePath = '/') => {
  const db = admin.database();
  const ref = db.ref(refrencePath);
  const snapshot = await ref.once('value');
  return snapshot.val();
};

exports.writeToRef = async (object, refrencePath = '/') => {
  const db = admin.database();
  const ref = db.ref(refrencePath);
  return ref.set(object);
};
