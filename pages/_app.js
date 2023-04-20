import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { ApolloProvider } from "@apollo/client";
import client from "../helpers/apolloclient";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;