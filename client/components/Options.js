import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import PropTypes from 'prop-types';

const Options = (props) => {
  const { options, setOptions } = props;

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
};
export default Options;
