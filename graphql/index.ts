import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const link = createHttpLink({
  uri: 'http://192.168.1.136:4000/graphql'
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
});

export * from './graphql-hooks';
