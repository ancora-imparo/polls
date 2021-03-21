import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import { Button, TextField } from '@material-ui/core';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

import * as constants from '../components/constants';

const Create = () => {
  const [pollId, setPollId] = useState('');

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
            question: '',
            options: [''],
          }}
          validationSchema={Yup.object().shape({
            question: Yup.string().required('Question cannot be empty'),
            options: Yup.array().of(
              Yup.string().required('Option cannot be empty')
            ),
          })}
        >
          {({ values, errors, handleChange, handleBlur, dirty }) => (
            <Form
              onSubmit={async (e) => {
                e.preventDefault();
                values.options.pop();
                try {
                  const response = await axios.post(constants.ROUTE_CREATE, {
                    question: values.question,
                    options: values.options,
                  });
                  if (response.status == 200) {
                    setPollId(response.data);
                  }
                } catch (err) {
                  console.error('error:', err);
                }
              }}
            >
              <TextField
                id="question"
                name="question"
                label="Enter the question here"
                error={errors.question ? true : false}
                helperText={errors.question ? errors.question : ''}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                style={{ width: '45%' }}
              />
              <div>
                <FieldArray
                  name="options"
                  render={(arrayHelpers) => (
                    <div>
                      {values.options && values.options.length > 0 ? (
                        values.options.map((opt, index) => (
                          <div key={index}>
                            <TextField
                              id={`options.${index}`}
                              name={`options.${index}`}
                              placeholder={`option-${index + 1}`}
                              value={opt}
                              label={`Enter option-${index + 1}`}
                              variant="outlined"
                              error={
                                !dirty ||
                                (errors &&
                                  errors.options &&
                                  errors.options[index])
                                  ? true
                                  : false
                              }
                              onChange={handleChange}
                              margin="normal"
                              style={{ width: '45%' }}
                              onFocus={() => {
                                if (index + 1 == values.options.length) {
                                  arrayHelpers.insert(index + 1, '');
                                }
                              }}
                              onBlur={() => {
                                if (!values.options[index]) {
                                  arrayHelpers.remove(index);
                                }
                              }}
                            />
                          </div>
                        ))
                      ) : (
                        <Button
                          variant="outlined"
                          color="primary"
                          type="button"
                          onClick={() => arrayHelpers.push('')}
                        >
                          Add a option
                        </Button>
                      )}
                    </div>
                  )}
                />
              </div>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!dirty || errors.question ? true : false}
              >
                Create
              </Button>

              <div>
                {pollId ? (
                  <div>
                    <p style={{ fontSize: 20, color: 'orangered' }}>
                      Poll Id is <b>{pollId}</b>.
                      <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        onClick={() => navigator.clipboard.writeText(pollId)}
                        startIcon={<FileCopyOutlinedIcon />}
                      >
                        Copy to clipboard
                      </Button>
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
      </center>
    </>
  );
};

export default Create;
