import React, { useState } from 'react';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Colors,
  Provider as PaperProvider
} from 'react-native-paper';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme
} from '@react-navigation/native';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { apolloClient } from './graphql';
import { AppNavigator } from './src/navigation';


const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  Colors
};

const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors
    // ...NavigationDarkTheme.colors
  }
};

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = () => {
    setIsDarkTheme(isDark => !isDark);
  };

  return (
    <PaperProvider theme={theme as any}>
      <ApolloProvider client={apolloClient as ApolloClient<any>}>
        <AppNavigator toggleTheme={toggleTheme} />
      </ApolloProvider>
    </PaperProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff'
//   },
//   contentContainer: {
//     paddingVertical: 40
//   }
// });
