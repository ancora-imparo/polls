import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { initializeFirebase, readFromRef } from './firebase';
export default function Home() {
  const [polls, setPolls] = useState({});
  useEffect(async () => {
    try {
      const response = await axios.get(
        `https://ancora-imparo-polls-api.herokuapp.com/polls`
      );
      const firebaseConfig = response.data;
      await initializeFirebase(firebaseConfig);
      const data = await readFromRef();
      setPolls(data);
    } catch (err) {
      console.error('error:', err);
    }
  }, []);
  return (
    <div>
      <h2>Polls</h2>
      <pre>{JSON.stringify(polls, null, 2)}</pre>
    </div>
  );
}
