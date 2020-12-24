const admin = require('firebase-admin');

const env = require('./env');
const store = require('./store');

const serviceAccount = JSON.parse(env.GOOGLE_APPLICATION_CREDENTIALS);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: env.DATABASE_URL,
  databaseAuthVariableOverride: {
    uid: env.DATABASE_AUTH_VARIABLE_UID,
  },
});

const polls = [
  {
    pollId: '1',
    question: 'Sun rises from East?',
    option1: { id: 'xfch', text: 'true' },
    option2: { id: 'cscf', text: 'false' },
  },
];

(async () => {
  await store.writeToRef(polls);
  const data = await store.readFromRef();
  console.log(data);
})();
