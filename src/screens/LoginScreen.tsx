import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLoginMutation, useRegisterMutation } from '../../graphql';
import { Button, TextInput, useTheme } from 'react-native-paper';

const { width } = Dimensions.get('window');

const LoginScreen = props => {
  const theme = useTheme();
  const { navigation } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState(false);

  //Sign up
  const [signUpMutation] = useRegisterMutation({
    async onCompleted({ register }) {
      const { token } = register;
      if (token) {
        try {
          await AsyncStorage.setItem('token', token);
          navigation.replace('Profile');
        } catch (error) {
          console.log(error.message);
        }
      }
    }
  });
  //Sign in
  const [signInMutation] = useLoginMutation({
    async onCompleted({ login }) {
      const { token } = login;
      if (token) {
        try {
          await AsyncStorage.setItem('token', token);
          navigation.replace('Profile');
        } catch (error) {
          console.log(error.message);
        }
      }
    }
  });

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.colors.background }
      ]}
    >
      {login ? null : (
        <TextInput
          onChangeText={text => setUsername(text)}
          value={username}
          placeholder="Username"
          label="Username"
          mode="outlined"
          autoCorrect={false}
          autoCapitalize="none"
          style={styles.input}
        />
      )}
      <TextInput
        onChangeText={text => setEmail(text)}
        value={email}
        placeholder={login ? 'Email or Username' : 'Email'}
        label={login ? 'Email or Username' : 'Email'}
        mode="outlined"
        autoCorrect={false}
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        onChangeText={text => setPassword(text)}
        value={password}
        placeholder="Password"
        label="Password"
        mode="outlined"
        autoCorrect={false}
        autoCapitalize="none"
        style={styles.input}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button
          labelStyle={{ color: theme.colors.text }}
          style={{ backgroundColor: theme.colors.accent, marginTop: 20 }}
          onPress={() => {
            if (login) {
              // email validaiton
              const isEmail = email.includes('@');
              isEmail
                ? signInMutation({
                    variables: { email, password }
                  })
                : signInMutation({
                    variables: { username: email, password }
                  });
            } else {
              signUpMutation({ variables: { username, email, password } });
            }
          }}
        >
          {login ? 'Login' : 'Sign Up'}
        </Button>
        <Button
          style={{ marginTop: 20 }}
          icon="information"
          onPress={() => setLogin(!login)}
        >
          {login ? 'Need an account? Sign Up' : 'Have an account? Log in!'}
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  input: {
    width: width - 40,
    height: 60,
    marginTop: 5
  },
  buttonContainer: {
    width: '100%'
  }
});

export default LoginScreen;
