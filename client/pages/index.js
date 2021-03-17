import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, TextField } from '@material-ui/core';

import { initializeFirebase, readFromRef } from '../components/firebase';
import * as constants from '../components/constants';
import Display from '../components/Display';

export default function Home() {
  const [poll, setPoll] = useState();
  const uid = useRef();
  const [errorMessage, setError] = useState(null);

  useEffect(async () => {
    try {
      const response = await axios.get(constants.ROUTE_SDK);
      const firebaseConfig = response.data;
      await initializeFirebase(firebaseConfig);
    } catch (err) {
      console.error('error:', err);
    }
  }, []);

  const handleClick = async () => {
    const data = await readFromRef(`/polls/${uid.current.value}`);
    if (!data) {
      setPoll(null);
      setError(<h3 style={{ color: 'crimson' }}>Enter a valid pollID</h3>);
    } else {
      setPoll(data);
    }
  };
  return (
    <>
      <div>
        {poll ? null : (
          <Link href="/create">
            <a>Create new Poll </a>
          </Link>
        )}
      </div>
      <center>
        <h2 style={{ color: 'darkcyan' }}>Home page</h2>

        <Formik
          initialValues={{
            uniqueId: uid.current,
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
            handleSubmit,
            dirty,
            isValid,
          }) => (
            <Form onSubmit={handleSubmit}>
              <TextField
                name="uniqueId"
                label="Enter the code here"
                inputRef={uid}
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
                  onClick={handleClick}
                >
                  Submit
                </Button>
              </div>
              {poll ? (
                <Display poll={poll} uid={uid.current.value} />
              ) : (
                errorMessage
              )}
            </Form>
          )}
        </Formik>
      </center>
    </>
  );
}
