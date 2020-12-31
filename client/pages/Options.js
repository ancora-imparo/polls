import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';

export const Options = (props) => {
  const { options, handleOptionSelect } = props;
  function stringCheck(str) {
    if (str.length > 10) str = str.substring(0, 10);
    return str;
  }

  const List = options.map((option) => (
    <ListItem key={Math.random()} button>
      <ListItemText primary={<div>{stringCheck(option)}</div>}></ListItemText>
    </ListItem>
  ));

  return <div>{List}</div>;
};
Options.propTypes = {
  options: PropTypes.array,
  handleOptionSelect: PropTypes.func,
};
