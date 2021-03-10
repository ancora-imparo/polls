import React, { useRef, useState } from 'react';
import Link from 'next/link';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Button, TextField } from '@material-ui/core';

import Results from '../components/Results';
import { readFromRef } from '../components/firebase';

export default function Result() {
  const uid = useRef();
  const [poll, setPoll] = useState();

  const handleClick = async () => {
    const data = await readFromRef(`/polls/${uid.current.value}`);
    if (!data) {
      alert('Invalid Poll ID');
    } else {
      setPoll(data);
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
        <h2 style={{ color: 'darkcyan' }}>Results</h2>
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
              {poll ? <Results poll={poll} /> : null}
            </Form>
          )}
        </Formik>
      </center>
    </>
  );
}
