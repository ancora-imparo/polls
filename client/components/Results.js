import React from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import PropTypes from 'prop-types';

export default function Display(props) {
  const { poll } = props;

  const keys = Object.keys(poll.options);
  const displayOptions = keys.map((key) => (
    <Button key={key}>
      {poll.options[key].value} : {poll.options[key].count}
    </Button>
  ));
  return (
    <div>
      <h2 style={{ color: 'blue' }}>{poll.question}</h2>
      <ButtonGroup color="secondary" size="large">
        {displayOptions}
      </ButtonGroup>
    </div>
  );
}

Display.propTypes = {
  poll: PropTypes.array,
};
