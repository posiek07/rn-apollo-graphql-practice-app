import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { PlaceDetail, Places } from '../screens';
import { useTheme, Portal, FAB } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { Header } from './Header';

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
    </Stack.Navigator>
  );
};

const Tab = createMaterialBottomTabNavigator();

export const MainTabNavigatior = () => {
  const isFocused = useIsFocused();
  const theme = useTheme();
  return (
    <React.Fragment>
      <Tab.Navigator
        initialRouteName="Places"
        shifting={true}
        sceneAnimationEnabled={false}
      >
        <Tab.Screen
          name="Places"
          component={PlaceStack}
          options={{
            tabBarIcon: 'home-account'
          }}
        />
      </Tab.Navigator>
      <Portal>
        <FAB
          visible={isFocused}
          icon="feather"
          onPress={() => console.log('pressed FAB')}
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
};
