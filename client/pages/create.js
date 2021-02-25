import React, { useState, useEffect, useRef } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import { Button, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import Options from '../components/Options';

import * as constants from '../components/constants';

const Create = () => {
  const [options, setOptions] = useState(['First option']);
  const [pollId, setPollId] = useState('');
  const questionRef = useRef('');
  const newOption = useRef('');

  const handleAdd = () => {
    if (newOption.current.value) {
      setOptions([...options, newOption.current.value]);
      newOption.current.value = '';
    }
  };

  const handleSave = async () => {
    if (!questionRef.current.value) {
      alert('Enter the Question');
      return;
    }
    try {
      const response = await axios.post(constants.ROUTE_CREATE, {
        question: questionRef.current.value,
        options: options,
      });
      if (response.status == 200) {
        setPollId(response.data);
      }
    } catch (err) {
      console.error('error:', err);
    }
  };
  return (
    <center>
      <Formik
        initialValues={{
          question: questionRef.current,
          option: newOption.current,
        }}
        validationSchema={Yup.object().shape({
          question: Yup.string().required('Question cannot be empty'),
          option: Yup.string().required('Option cannot be empty'),
        })}
      >
        {({ values, touched, errors, handleChange, handleBlur }) => (
          <Form>
            <h2>Create a new poll</h2>
            <TextField
              name="question"
              label="Enter the question here"
              inputRef={questionRef}
              helperText={
                errors.question && touched.question ? errors.question : ''
              }
              error={errors.question && touched.question ? true : false}
              onChange={handleChange}
              onBlur={handleBlur}
              margin="normal"
              style={{ width: '45%' }}
            />
            <div>
              <TextField
                id="option"
                label="Enter the option"
                inputRef={newOption}
                helperText={
                  errors.option && touched.option ? errors.option : ''
                }
                error={errors.option && touched.option ? true : false}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                style={{ width: '45%' }}
              />
              <Fab color="primary" aria-label="add">
                <AddIcon onClick={handleAdd} />
              </Fab>
              <Options setOptions={setOptions} options={options} />
            </div>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Create
            </Button>
            <div>{pollId ? `Poll Id is "${pollId}".` : `Create new poll.`}</div>
          </Form>
        )}
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
