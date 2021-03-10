import React, { useState, useRef } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, TextField } from '@material-ui/core';

import Options from '../components/Options';
import * as constants from '../components/constants';

const Create = () => {
  const [options, setOptions] = useState(['First option', 'Second option']);
  const [pollId, setPollId] = useState('');
  const questionRef = useRef('');

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
    <>
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>
      <center>
        <h2 style={{ color: 'darkcyan' }}>Create a new poll</h2>
        <Formik
          initialValues={{
            question: questionRef.current,
          }}
          validationSchema={Yup.object().shape({
            question: Yup.string().required('Question cannot be empty'),
          })}
        >
          {({
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
            dirty,
          }) => (
            <Form onSubmit={handleSubmit}>
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
                <Options setOptions={setOptions} options={options} />
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                disabled={errors.question && touched.question}
              >
                Create
              </Button>
              <div>
                {pollId ? (
                  <div>
                    <p>
                      Poll Id is <b>{pollId}</b>.
                    </p>
                    <Link href="/">
                      <a>View Results</a>
                    </Link>
                  </div>
                ) : (
                  ` `
                )}
              </div>
            </Form>
          )}
        </Formik>
        <div>
          <Link href="/result">
            <a>View results of a Poll</a>
          </Link>
        </div>
      </center>
    </>
  );
};

export default Create;
