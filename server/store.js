const admin = require('firebase-admin');

exports.readFromRef = async (refrencePath = '/') => {
  const db = admin.database();
  const ref = db.ref(refrencePath);
  ref.on(
    'value',
    (snapshot) => {
      return snapshot.val();
    },
    (errorObject) => {
      console.error('The read failed', errorObject.code);
    }
  );
};

exports.writeToRef = async (object, refrencePath = '/') => {
  const db = admin.database();
  const ref = db.ref(refrencePath);
  return ref.set(object);
};
