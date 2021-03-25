import { Container } from 'next/app';
import axios from 'axios';
import React, { useEffect } from 'react';
import Layout from '../components/Layout';

import * as constants from '../components/constants';
import { initializeFirebase } from '../components/firebase';
function MyApp({ Component, pageProps }) {
  useEffect(async () => {
    try {
      const response = await axios.get(constants.ROUTE_SDK);
      const firebaseConfig = response.data;
      await initializeFirebase(firebaseConfig);
    } catch (err) {
      console.error('error:', err);
    }
  }, []);
  return (
    <Container>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Container>
  );
}

export default MyApp;
