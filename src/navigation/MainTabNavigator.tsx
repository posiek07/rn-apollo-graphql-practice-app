import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {
  PlaceDetail,
  Places,
  AuthLoading,
  LoginScreen,
  ProfileScreen,
  PlaceForm
} from '../screens';
import { useTheme, Portal, FAB } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { Header } from './Header';

const Tab = createMaterialBottomTabNavigator();

const Stack = createStackNavigator();

export const PlaceStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Places"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        )
      }}
    >
      <Stack.Screen name="Places" component={Places} />
      <Stack.Screen name="Detail" component={PlaceDetail} />
      <Stack.Screen name="Form" component={PlaceForm} />
    </Stack.Navigator>
  );
};

export const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="AuthLoading"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        )
      }}
    >
      <Stack.Screen name="AuthLoading" component={AuthLoading} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Form" component={PlaceForm} />
    </Stack.Navigator>
  );
};

const MainTabNavigatior = ({ navigation }) => {
  const isFocused = useIsFocused();
  const theme = useTheme();
  if (isFocused && theme) {
    return (
      <React.Fragment>
        <Tab.Navigator
          initialRouteName="Places"
          shifting={true}
          sceneAnimationEnabled={true}
        >
          <Tab.Screen
            name="Places"
            component={PlaceStack}
            options={{
              tabBarIcon: 'home-account'
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileStack}
            options={{
              tabBarIcon: 'information'
            }}
          />
        </Tab.Navigator>
        <Portal>
          <FAB
            visible={isFocused}
            icon="feather"
            onPress={() => navigation.navigate('Form', { item: {} })}
            style={{
              backgroundColor: theme.colors.background,
              position: 'absolute',
              bottom: 100,
              right: 16
            }}
          />
        </Portal>
      </React.Fragment>
    );
  } else {
    <Text>Loading</Text>;
  }
};

export default MainTabNavigatior;
