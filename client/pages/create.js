import React, { useState, useEffect, useRef } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { Formik, Form } from 'formik';
import TextField from '@material-ui/core/TextField';
import { Button, colors, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import Options from '../components/Options';

import * as constants from '../components/constants';

const Create = () => {
  const [options, setOptions] = useState(['First option']);
  const [pollId, setPollId] = useState('');
  const question = useRef('');
  const newOption = useRef('');

  const handleSubmit = () => {
    if (newOption.current.value) {
      setOptions([...options, newOption.current.value]);
    }
  };

  const handleSave = async () => {
    if (!question.current.value) {
      alert('Enter the Question');
      return;
    }
    try {
      const response = await axios.post(constants.ROUTE_CREATE, {
        question: question.current.value,
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
        <form>
          <h2>Create a new poll</h2>
          <TextField
            id="question"
            margin="normal"
            inputRef={question}
            style={{ width: '45%' }}
            label="Enter the question here"
          />
          <div>
            <TextField
              id="option"
              margin="normal"
              style={{ width: '45%' }}
              label="Enter the option"
              inputRef={newOption}
            />
            <Fab color="primary" aria-label="add">
              <AddIcon onClick={handleSubmit} />
            </Fab>
            <Options setOptions={setOptions} options={options} />
          </div>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Create
          </Button>
          <div>{pollId ? `Poll Id is "${pollId}".` : `Create new poll.`}</div>
        </form>
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
