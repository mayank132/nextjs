import { ApolloProvider } from "@apollo/client";
import client from "../helpers/apolloclient";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;