import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { initializeFirebase, readFromRef } from './firebase';
export default function Home() {
  const [polls, setPolls] = useState({});
  const apiBase =
    process.env.API_BASE || `https://ancora-imparo-polls-api.herokuapp.com`;
  useEffect(async () => {
    try {
      const response = await axios.get(`${apiBase}/sdk`);
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
