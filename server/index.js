const admin = require('firebase-admin');
const express = require('express');
const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');
const _ = require('lodash');

const env = require('./env');
const store = require('./store');

const app = express();
app.use(express.json());

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
const validatePoll = (polls) => {
  const schema = Joi.object({
    question: Joi.string().required(),
    options: Joi.array().required(),
    pollId: Joi.string(),
  });
  return schema.validate(polls);
};

const validatePollCount = (polls) => {
  const schema = Joi.object({
    pollId: Joi.string().required(),
    optionId: Joi.string().required(),
  });
  return schema.validate(polls);
};

app.post('/polls/create', async (req, res) => {
  const { error } = validatePoll(req.body);
  const errorMessage = _.get(
    error,
    'detais.[0].message',
    'Error in validation'
  );
  if (error) return res.status(400).send(errorMessage);
  optionObject = {};
  req.body.options.forEach((opt) => {
    optionObject[uuidv4()] = { value: opt, count: 0 };
  });
  const pollId = uuidv4();
  const poll = {
    question: req.body.question,
    options: optionObject,
  };
  await store.writeToRef(poll, `polls/${pollId}`);
  res.status(200).send(pollId);
});

app.post('/polls/count', async (req, res) => {
  const { error } = validatePollCount(req.body);
  const errorMessage = _.get(
    error,
    'detais.[0].message',
    'Error in validation'
  );
  if (error) return res.status(400).send(errorMessage);
  const poll = await store.readFromRef(`/polls/${req.body.pollId}`);
  poll.options[req.body.optionId].count++;
  await store.writeToRef(poll, `/polls/${req.body.pollId}`);
  res.status(200).send(req.body.pollId);
});

const port = env.SERVER_PORT;
app.listen(port, () => console.log(`Listening at port ${port} ...`));
