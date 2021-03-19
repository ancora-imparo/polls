import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Button, TextField } from '@material-ui/core';

import Results from '../components/Results';
import { initializeFirebase, readFromRef } from '../components/firebase';
import * as constants from '../components/constants';

export default function Result() {
  const [poll, setPoll] = useState();

  useEffect(async () => {
    try {
      const response = await axios.get(constants.ROUTE_SDK);
      const firebaseConfig = response.data;
      await initializeFirebase(firebaseConfig);
    } catch (err) {
      console.error('error:', err);
    }
  }, []);

  return (
    <>
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>
      <center>
        <h2 style={{ color: 'darkcyan' }}>Results</h2>
        <Formik
          initialValues={{
            uniqueId: '',
          }}
          validationSchema={Yup.object().shape({
            uniqueId: Yup.string().required('Code required'),
          })}
        >
          {({
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            dirty,
            isValid,
          }) => (
            <Form
              onSubmit={async (e) => {
                e.preventDefault();
                const data = await readFromRef(`/polls/${values.uniqueId}`);
                setPoll(data ? data : null);
              }}
            >
              <TextField
                name="uniqueId"
                label="Enter the code here"
                helperText={
                  errors.uniqueId && touched.uniqueId
                    ? errors.uniqueId
                    : 'Eg. 517d67df-5973-4323-bbf5-7969d9a488ea'
                }
                error={errors.uniqueId && touched.uniqueId ? true : false}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                style={{ width: '55%' }}
                variant="outlined"
              />
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!(dirty && isValid)}
                  type="submit"
                >
                  Submit
                </Button>
              </div>
              {poll ? (
                <Results poll={poll} />
              ) : (
                <h3 style={{ color: 'crimson' }}>Enter a valid pollID</h3>
              )}
            </Form>
          )}
        </Formik>
      </center>
    </>
  );
}
