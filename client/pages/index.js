import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form } from 'formik';
import Link from 'next/link';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

import { initializeFirebase, readFromRef } from '../components/firebase';
import * as constants from '../components/constants';
import Display from '../components/Display';

export default function Home() {
  const [options, setOptions] = useState({});
  const [poll, setPoll] = useState({});
  const [uid, setUid] = useState('');
  const [pollValid, setPollValid] = useState(false);
  useEffect(async () => {
    try {
      const response = await axios.get(constants.ROUTE_SDK);
      const firebaseConfig = response.data;
      await initializeFirebase(firebaseConfig);
    } catch (err) {
      console.error('error:', err);
    }
  }, []);

  const handleUidChange = (event) => {
    setUid(event.target.value);
  };
  const handleSubmit = async () => {
    if (uid) {
      const data = await readFromRef(`/polls/${uid}`);
      if (!data) {
        alert('Invalid Poll ID');
      } else {
        setPoll(data);
        setPollValid(true);
      }
    }
  };

  return (
    <>
      <div>
        {pollValid ? null : (
          <Link href="/create">
            <a>Create new Poll </a>
          </Link>
        )}
      </div>
      <center>
        <Formik>
          <Form>
            <TextField
              id="input"
              label="Enter the code here"
              value={uid}
              margin="normal"
              style={{ width: '55%' }}
              helperText="517d67df-5973-4323-bbf5-7969d9a488ea"
              variant="outlined"
              onChange={handleUidChange}
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

            {pollValid ? <Display poll={poll} /> : null}
          </Form>
        </Formik>
      </center>
    </>
  );
}
