import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'firebase/database';
import firebase from 'firebase/app';

export default function Home() {
  const [polls, setPolls] = useState([]);

  useEffect(async () => {
    try {
      const response = await axios.get(
        `https://ancora-imparo-polls-api.herokuapp.com/polls`
      );
      const firebaseConfig = response.data;

      await firebase.initializeApp(firebaseConfig);
      readFromRef();
    } catch (err) {
      console.error('error:', err);
    }
  }, []);

  const readFromRef = async (refrencePath = '/') => {
    const db = firebase.database();
    const ref = db.ref(refrencePath);
    const snapshot = await ref.once('value');
    setPolls(snapshot.val());
  };
  return (
    <div>
      <h2>Polls</h2>
      <pre>{JSON.stringify(polls, null, 2)}</pre>
    </div>
  );
}
