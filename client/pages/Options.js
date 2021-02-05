import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import PropTypes from 'prop-types';

export const Options = (props) => {
  const { options, setOptions, handleOptionSelect } = props;

  return options.map((option) => (
    <div key={Math.random()}>
      <div>
        {option}
        <IconButton aria-label="delete">
          <DeleteIcon
            onClick={() => {
              setOptions(
                options.filter((element) => {
                  return element !== option;
                })
              );
            }}
          />
        </IconButton>
      </div>
    </div>
  ));
};
Options.propTypes = {
  options: PropTypes.array,
  handleOptionSelect: PropTypes.func,
};
