import { Container } from 'next/app';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <Container>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Container>
  );
}

export default MyApp;
