import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Formik, Form } from 'formik';
import Link from 'next/link';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

import { initializeFirebase, readFromRef } from '../components/firebase';
import * as constants from '../components/constants';
import Display from '../components/Display';

export default function Home() {
  const [poll, setPoll] = useState();
  const uid = useRef();

  useEffect(async () => {
    try {
      const response = await axios.get(constants.ROUTE_SDK);
      const firebaseConfig = response.data;
      await initializeFirebase(firebaseConfig);
    } catch (err) {
      console.error('error:', err);
    }
  }, []);

  const handleSubmit = async () => {
    if (uid.current.value) {
      const data = await readFromRef(`/polls/${uid.current.value}`);
      if (!data) {
        alert('Invalid Poll ID');
      } else {
        setPoll(data);
      }
    }
  };
  console.log(poll);
  if (poll) {
    console.log('poll exists');
  }
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
        <Formik>
          <Form>
            <TextField
              id="uid"
              label="Enter the code here"
              inputRef={uid}
              margin="normal"
              style={{ width: '55%' }}
              helperText="Eg. 517d67df-5973-4323-bbf5-7969d9a488ea"
              variant="outlined"
            />
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
            {poll ? <Display poll={poll} uid={uid.current.value} /> : null}
          </Form>
        </Formik>
      </center>
    </>
  );
}
