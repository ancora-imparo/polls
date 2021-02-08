import React from 'react';
import { Button, ButtonGroup } from '@material-ui/core';

export default function Display(props) {
  const { poll } = props;
  const keys = Object.keys(poll.options);
  const opt = keys.map((key) => (
    <Button key={key}>{poll.options[key].value}</Button>
  ));
  return (
    <>
      <h2 style={{ color: 'blue' }}>{poll.question}</h2>
      <ButtonGroup
        variant="contained"
        color="primary"
        aria-label="contained primary button group"
      >
        {opt}
      </ButtonGroup>
    </>
  );
}
