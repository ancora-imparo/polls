import React, { useState } from 'react';
import Link from 'next/link';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextField, Button } from '@material-ui/core';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

import { readFromRef } from '../components/firebase';
import Vote from '../components/Vote';
import { SubmitButton } from '../components/Layout';

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
        <h2
          style={{
            color: 'darkcyan',
            fontSize: '40px',
            fontFamily: 'sans-serif',
          }}
        >
          Home page
        </h2>

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
                InputLabelProps={{ style: { fontSize: 28, margin: '10px' } }}
                inputProps={{ style: { fontSize: 30, margin: '10px' } }}
                FormHelperTextProps={{
                  style: { fontSize: 20, margin: '10px' },
                }}
                label="Enter the code here"
                helperText={
                  errors.uniqueId && touched.uniqueId ? (
                    errors.uniqueId
                  ) : (
                    <Button
                      size="small"
                      variant="outlined"
                      color="primary"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          '517d67df-5973-4323-bbf5-7969d9a488ea'
                        )
                      }
                      startIcon={<FileCopyOutlinedIcon />}
                    >
                      Demo: 517d67df-5973-4323-bbf5-7969d9a488ea
                    </Button>
                  )
                }
                error={errors.uniqueId && touched.uniqueId ? true : false}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                style={{ width: '55%' }}
                variant="outlined"
              />
              <div>
                <SubmitButton
                  variant="contained"
                  color="primary"
                  disabled={!(dirty && isValid)}
                  type="submit"
                >
                  Submit
                </SubmitButton>
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
