const admin = require('firebase-admin');

exports.readPoll = async (fbRef = '/') => {
  try {
    const db = admin.database();
    const ref = db.ref(fbRef);
    ref.on(
      'value',
      (snapshot) => {
        console.log(snapshot.val());
        return snapshot.val();
      },
      (errorObject) => {
        console.log('The read failed: ' + errorObject.code);
      }
    );
  } catch (error) {
    return error;
  }
};

exports.createPoll = async (pollObj, fbRef = '/') => {
  const db = admin.database();
  const ref = db.ref(fbRef);
  const pollsRef = ref.child('Polls');
  await pollsRef.set(pollObj);
};
