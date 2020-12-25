import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [polls, setPolls] = useState([]);
  (async () => {
    try {
      const response = await axios.get(`http://localhost:4000/polls`);
      const get_data = response.data;
      setPolls(get_data);
    } catch (err) {
      console.log(err);
    }
  })();

  return (
    <center>
      <h2>Polls</h2>
      <pre>{JSON.stringify(polls, null, 2)}</pre>
    </center>
  );
}
