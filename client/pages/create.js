import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { Formik, Form } from 'formik';
import TextField from '@material-ui/core/TextField';
import { Button, colors, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import Options from '../components/Options';

import { initializeFirebase, readFromRef } from '../components/firebase';
import * as constants from '../components/constants';

const Create = () => {
  const [polls, setPolls] = useState({});
  const [pollId, setPollId] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['First option']);
  const [newOption, setNewOption] = useState('');
  const [optionSelected, setOptionSelected] = useState();

  const handleOptionSelect = (id) => {
    setOptionSelected(options.option.find((option) => option.optionId === id));
  };

  const handleNewOptionChange = (event) => {
    setNewOption(event.target.value);
  };

  const handleSubmit = () => {
    if (newOption) {
      setOptions([...options, newOption]);
    }
  };

  const handleSave = async () => {
    if (!question) {
      console.log('Enter Question');
      return;
    }
    try {
      const response = await axios.post(constants.ROUTE_CREATE, {
        question: question,
        options: options,
      });
      if (response.status == 200) {
        setPollId(response.data);
      }
    } catch (err) {
      console.log(err.response);
    }
  };
  return (
    <center>
      <Formik>
        <Form>
          <h2>Create a new poll</h2>
          <TextField
            id="standard-basic"
            margin="normal"
            value={question}
            onChange={() => {
              setQuestion(event.target.value);
            }}
            style={{ width: '45%' }}
            label="Enter the question here"
          />
          <div>
            <TextField
              id="standard-basic"
              margin="normal"
              value={newOption}
              style={{ width: '45%' }}
              label="Enter the option"
              onChange={handleNewOptionChange}
            />
            <Fab color="primary" aria-label="add">
              <AddIcon onClick={handleSubmit} />
            </Fab>
            <Options
              setOptions={setOptions}
              options={options}
              handleOptionSelect={handleOptionSelect}
            />
          </div>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Create
          </Button>
          <div>{pollId ? `Poll id is "${pollId}".` : `Create new poll.`}</div>
        </Form>
      </Formik>
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>
    </center>
  );
};

export default Create;
