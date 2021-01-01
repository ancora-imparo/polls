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
const validatePoll = (polls) => {
  const schema = Joi.object({
    question: Joi.string().required(),
    option1: Joi.string().required(),
    option2: Joi.string().required(),
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
  if (error) return res.status(400).send(error.details[0].message);
  const polls = {
    [uuidv4()]: {
      question: req.body.question,
      option: {
        [uuidv4()]: { value: req.body.option1, count: 0 },
        [uuidv4()]: { value: req.body.option2, count: 0 },
      },
    },
  };
  pollId = Object.keys(polls)[0];
  await store.writeToRef(polls, `/polls/`);
  res.status(200).send(pollId);
});

app.post('/polls/count', async (req, res) => {
  const { error } = validatePollCount(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { polls } = await store.readFromRef();
  polls[req.body.pollId].option[req.body.optionId].count++;
  await store.writeToRef(polls, `/polls/`);
  res.status(200).send(polls.pollId);
});

const port = env.SERVER_PORT;
app.listen(port, () => console.log(`Listening at port ${port} ...`));
