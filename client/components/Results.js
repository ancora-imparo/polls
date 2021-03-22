import React from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

export default function Display(props) {
  const { poll } = props;

  const keys = Object.keys(poll.options);
  const ResultButton = withStyles(() => ({
    root: {
      color: '#ed143d',
      margin: '5px',
      fontSize: '110%',
      backgroundColor: '#B1E41B',
      '&:hover': {
        backgroundColor: '#B1E41B',
      },
    },
  }))(Button);
  const displayOptions = keys.map((key) => (
    <ResultButton key={key}>
      {poll.options[key].value} : {poll.options[key].count}
    </ResultButton>
  ));
  return (
    <div>
      <h2
        style={{
          color: '#0b698b',
          fontSize: '44px',
          fontFamily: 'sans-serif',
        }}
      >
        {poll.question}
      </h2>
      <ButtonGroup size="large">{displayOptions}</ButtonGroup>
    </div>
  );
}

Display.propTypes = {
  poll: PropTypes.array,
};
