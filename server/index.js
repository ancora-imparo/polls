const admin = require('firebase-admin');
const express = require('express');
const app = express();

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
app.get('/', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*').status(200).send();
});
app.get('/polls', async (req, res) => {
  const polls = await store.readFromRef();
  res.set('Access-Control-Allow-Origin', '*').status(200).send(polls);
});
const polls = [
  {
    pollId: '1',
    question: 'Sun rises from East?',
    option1: { id: 'xfch', text: 'true' },
    option2: { id: 'cscf', text: 'false' },
  },
];
app.post('/polls', async (req, res) => {
  await store.writeToRef(polls);
  res.status(200).send();
});

const port = env.SERVER_PORT;
app.listen(port, () => console.log(`Listening at port ${port} ...`));
