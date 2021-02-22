import React from 'react';
import Router from 'next/router';
import { Formik, Form } from 'formik';
import axios from 'axios';
import { Button, ButtonGroup } from '@material-ui/core';

import * as constants from '../components/constants';

export default function Display(props) {
  const { poll, uid } = props;

  const handleSubmit = async (key) => {
    try {
      const response = await axios.post(constants.ROUTE_COUNT, {
        pollId: uid,
        optionId: key,
      });
      if (response.status == 200) {
        alert('Successfully Submitted');
        Router.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const keys = Object.keys(poll.options);
  const opt = keys.map((key) => (
    <Button key={key} onClick={() => handleSubmit(key)}>
      {poll.options[key].value}
    </Button>
  ));

  return (
    <Formik>
      <Form>
        <h2 style={{ color: 'blue' }}>{poll.question}</h2>
        <ButtonGroup
          variant="contained"
          color="secondary"
          aria-label="contained primary button group"
        >
          {opt}
        </ButtonGroup>
      </Form>
    </Formik>
  );
}
