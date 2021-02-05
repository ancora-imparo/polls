import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form } from 'formik';
import TextField from '@material-ui/core/TextField';
import { Button, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { Options } from './Options';

import { initializeFirebase, readFromRef } from '../components/firebase';
import * as constants from '../components/constants';

export default function Home() {
  const [polls, setPolls] = useState({});
  const [question, setQuestion] = useState();
  const [options, setOptions] = useState(['First option']);
  const [newOption, setNewOption] = useState('');
  const [optionSelected, setOptionSelected] = useState();

  useEffect(async () => {
    try {
      const response = await axios.get(constants.ROUTE_SDK);
      const firebaseConfig = response.data;
      await initializeFirebase(firebaseConfig);
      const data = await readFromRef();
      setPolls(data);
    } catch (err) {
      console.error('error:', err);
    }
  }, []);

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

  const handleSave = async (e) => {
    e.preventDefault();
    if (!question) {
      console.log('Enter Question');
      return;
    }
    try {
      await axios.post(constants.ROUTE_CREATE, {
        question: question,
        options: options,
      });
      window.location.reload();
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
            Save
          </Button>
        </Form>
      </Formik>
    </center>
  );
}
