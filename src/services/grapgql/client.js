import ApolloClient from "apollo-boost";
import { GRAPHQL_URL } from '../../config/index'

const client = new ApolloClient({
  uri: GRAPHQL_URL
});

export default client;