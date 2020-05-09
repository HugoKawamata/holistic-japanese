/* @flow */
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri:
    "http://ec2-52-63-127-15.ap-southeast-2.compute.amazonaws.com:4000/graphql",
});

export default client;
