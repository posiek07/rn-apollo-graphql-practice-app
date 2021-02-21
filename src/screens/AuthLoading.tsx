import React, { useEffect } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AuthLoading(props) {
  useEffect(() => {
    bootstrapAsync();
  });

  const bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('token');
    props.navigation.replace(userToken ? 'Profile' : 'Login');
  };

  return <ActivityIndicator style={{ ...StyleSheet.absoluteFillObject }} />;
}
