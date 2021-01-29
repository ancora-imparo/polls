import React, { useState, useEffect } from 'react';
import axios from 'axios';

import initializeFirebase from './firebase';

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
    try {
      const response = await axios.get('http://localhost:4000/sdk');
      const endpoints = response.data;
      initializeFirebase(endpoints);
    } catch (err) {
      console.error('error:', err);
    }
  }, []);

  return (
    <center>
      <h2>Polls</h2>
      <pre>{JSON.stringify(polls, null, 2)}</pre>
    </center>
  );
}
