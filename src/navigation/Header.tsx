import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, TouchableOpacity } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const Header = ({ scene, previous, navigation }) => {
  const theme = useTheme();
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  return (
    <Appbar.Header theme={{ colors: { primary: theme.colors.surface } }}>
      {previous ? (
        <Appbar.BackAction
          onPress={navigation.goBack}
          color={theme.colors.text}
        />
      ) : (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MaterialCommunityIcons
            color={theme.colors.text}
            name="menu"
            size={30}
          />
        </TouchableOpacity>
      )}
      <Appbar.Content
        title={
          previous ? (
            title
          ) : (
            <MaterialCommunityIcons
              name="home-outline"
              size={40}
              color={theme.colors.text}
              style={{ alignSelf: 'flex-end' }}
            />
          )
        }
      />
      {title == 'Profile' && (
        <Appbar.Action
          icon="logout"
          onPress={async () => {
            await AsyncStorage.removeItem('token');
            navigation.replace('Login');
          }}
        />
      )}
    </Appbar.Header>
  );
};
