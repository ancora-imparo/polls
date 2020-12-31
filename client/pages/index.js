import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form } from 'formik';
import TextField from '@material-ui/core/TextField';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import env from '../env';
import { Options } from './Options';

export default function Home() {
  const [options, setOptions] = useState(['jbjk']);
  const [newOption, setNewOption] = useState();
  const [optionSelected, setOptionSelected] = useState();

  const handleOptionSelect = (id) => {
    setOptionSelected(options.option.find((option) => option.optionId === id));
  };

  const handleNewOptionChange = (event) => {
    setNewOption(event.target.value);
  };
  const handleAddOption = () => {
    options.push(newOption);
    setOptions(options);
  };

  useEffect(async () => {
    // try {
    //   const response = await axios.get(
    //     `https://ancora-imparo-polls-api.herokuapp.com/polls`
    //   );
    //   const getData = response.data;
    // } catch (err) {
    //
    // }
  });

  return (
    <center>
      <Formik>
        <Form>
          <h2>Create a new poll</h2>
          <TextField
            id="standard-basic"
            margin="normal"
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
              onSubmit={handleAddOption}
            />
            <Fab color="primary" aria-label="add">
              <AddIcon onClick={handleAddOption} />
            </Fab>
            <Options
              options={options}
              handleOptionSelect={handleOptionSelect}
            />
          </div>
        </Form>
      </Formik>
    </center>
  );
}
