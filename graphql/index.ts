import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  Observable
} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const link = new HttpLink({
  uri: 'http://192.168.1.136:4000/graphql',
  credentials: 'include'
});

const request = async operation => {
  const token = await AsyncStorage.getItem('token');
  operation.setContext({
    headers: {
      authorization: token
    }
  });
};

// Notify Appollo Client upon request completion, error
const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle;
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          });
        })
        .catch(observer.error.bind(observer));
      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([requestLink, link])
});

export * from './graphql-hooks';
