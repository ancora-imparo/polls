import React, { useState } from 'react';
import Link from 'next/link';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, TextField } from '@material-ui/core';

import { readFromRef } from '../components/firebase';
import Vote from '../components/Vote';

export default function Home() {
  const [poll, setPoll] = useState();

  return (
    <>
      <div>
        <Link href="/create">
          <a style={{ margin: '5px' }}>Create new Poll </a>
        </Link>

        <Link href="/result">
          <a style={{ float: 'right', margin: '5px' }}>
            View results of a Poll
          </a>
        </Link>
      </div>
      <center>
        <h2 style={{ color: 'darkcyan' }}>Home page</h2>

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
                <Vote poll={poll} uid={values.uniqueId} />
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
