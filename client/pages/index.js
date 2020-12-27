import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

export default function Home() {
  const [polls, setPolls] = useState([]);
  useEffect(async () => {
    try {
      const response = await axios.get(
        `https://ancora-imparo-polls-api.herokuapp.com/polls`
      );
      const getData = response.data;
      setPolls(getData);
    } catch (err) {
      console.error('error:', err);
    }
  });

  return (
    <center>
      <h2>Create a new poll</h2>
      <TextField
        id="standard-basic"
        margin="normal"
        style={{ width: '45%' }}
        label="Enter the question here"
      />
      <div>
        <TextField
          id="standard-basic"
          margin="normal"
          style={{ width: '45%' }}
          label="Enter the option"
        />
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>
    </center>
  );
}
