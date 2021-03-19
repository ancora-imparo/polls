import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
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
            options: ['', ''],
          }}
          validationSchema={Yup.object().shape({
            question: Yup.string().required('Question cannot be empty'),
            options: Yup.array().of(
              Yup.string().required('Option cannot be empty')
            ),
          })}
        >
          {({ values, touched, errors, handleChange, handleBlur, dirty }) => (
            <Form
              onSubmit={async (e) => {
                e.preventDefault();
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
                              label="Enter the option"
                              variant="outlined"
                              error={
                                !dirty ||
                                (errors &&
                                  errors.options &&
                                  errors.options[index])
                                  ? true
                                  : false
                              }
                              helperText={
                                errors &&
                                errors.options &&
                                errors.options[index] &&
                                touched.options &&
                                touched.options[index]
                                  ? errors.options[index]
                                  : ''
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                              margin="normal"
                              style={{ width: '45%' }}
                            />
                            <IconButton
                              aria-label="delete"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              <DeleteIcon type="button" />
                            </IconButton>

                            <Fab
                              color="primary"
                              aria-label="add"
                              onClick={() => arrayHelpers.insert(index + 1, '')}
                            >
                              <AddIcon type="button" />
                            </Fab>
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
                disabled={
                  !dirty || errors.question || errors.options ? true : false
                }
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
