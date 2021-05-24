import React, { useState } from 'react';
import axios from 'axios';
import { Button, ButtonGroup } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
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
          <h3 style={{ color: 'green' }}>
            Your vote was successfully recorded!
          </h3>
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
  const VoteButton = withStyles(() => ({
    root: {
      color: 'white',
      margin: '4px',
      minWidth: 'auto',
      minHeight: 'auto',
      fontSize: '100%',
      backgroundColor: '#177ecf ',
      '&:hover': {
        backgroundColor: '#ab00de',
      },
    },
  }))(Button);
  const keys = Object.keys(poll.options);
  const opt = keys.map((key) => (
    <VoteButton key={key} onClick={() => handleSubmit(key)}>
      {poll.options[key].value}
    </VoteButton>
  ));

  return (
    <div>
      <h2
        style={{
          color: 'orangered',
          fontSize: '44px',
          fontFamily: 'sans-serif',
        }}
      >
        {poll.question}
      </h2>
      <ButtonGroup
        orientation="vertical"
        variant="contained"
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
