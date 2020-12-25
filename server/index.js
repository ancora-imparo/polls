const admin = require('firebase-admin');
const express = require('express');
const app = express();
app.use(express.json());
const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');
const _ = require('lodash');

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
const validatPoll = (polls) => {
  const schema = Joi.object({
    question: Joi.string().required(),
    option1: Joi.string().required(),
    option2: Joi.string().required(),
    pollId: Joi.string(),
  });
  return schema.validate(polls);
};
app.post('/polls', async (req, res) => {
  const { error } = validatPoll(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const polls = {
    pollId: req.body.pollId || uuidv4(),
    question: req.body.question,
    option1: { id: uuidv4(), text: req.body.option1 },
    option2: { id: uuidv4(), text: req.body.option2 },
  };

  await store.writeToRef(polls, `/${polls.pollId}`);
  res.status(200).send(polls.pollId);
});

const port = env.SERVER_PORT;
app.listen(port, () => console.log(`Listening at port ${port} ...`));
