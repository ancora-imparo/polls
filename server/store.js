const admin = require('firebase-admin');

exports.readFromRef = async (refrencePath = '/') => {
  const db = admin.database();
  const ref = db.ref(refrencePath);
  ref.on(
    'value',
    (snapshot) => {
      console.log(snapshot.val());
      return snapshot.val();
    },
    (errorObject) => {
      console.error('The read failed', errorObject.code);
    }
  );
};

exports.createPoll = async (
  pollObj,
  refrencePath = '/',
  childPath = 'Polls'
) => {
  const db = admin.database();
  const ref = db.ref(refrencePath);
  const pollsRef = ref.child(childPath);
  await pollsRef.set(pollObj);
};
