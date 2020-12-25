import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      <h2>Polls</h2>
      <pre>{JSON.stringify(polls, null, 2)}</pre>
    </center>
  );
}
