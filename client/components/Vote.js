import React, { useState } from 'react';
import axios from 'axios';
import { Button, ButtonGroup } from '@material-ui/core';
import PropTypes from 'prop-types';

import * as constants from './constants';

export default function Display(props) {
  const { poll, uid } = props;
  const [status, setStatus] = useState();
  if (!poll) {
    return null;
  }

  const handleSubmit = async (key) => {
    try {
      const response = await axios.post(constants.ROUTE_COUNT, {
        pollId: uid,
        optionId: key,
      });
      if (response.status == 200) {
        setStatus(
          <h3 style={{ color: 'green' }}>Your vote was succefully recorded!</h3>
        );
      }
    } catch (err) {
      console.error('error:', err);
      setStatus(
        <h3 style={{ color: 'red' }}>
          Your vote was not recorded due to some problem
        </h3>
      );
    }
  };

  const keys = Object.keys(poll.options);
  const opt = keys.map((key) => (
    <Button key={key} onClick={() => handleSubmit(key)}>
      {poll.options[key].value}
    </Button>
  ));

  return (
    <div>
      <h2 style={{ color: 'blue' }}>{poll.question}</h2>
      <ButtonGroup
        variant="contained"
        color="secondary"
        aria-label="contained primary button group"
      >
        {opt}
      </ButtonGroup>
      {status}
    </div>
  );
}

Display.propTypes = {
  options: PropTypes.array,
  poll: PropTypes.object,
  uid: PropTypes.string,
};
