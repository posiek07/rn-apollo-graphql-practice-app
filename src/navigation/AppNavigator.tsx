import React, { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { DrawerContent } from './DrawerContent';
import { Places } from '../screens';
import MainTabNavigatior from './MainTabNavigator';

const AppNavigator = navProps => {
  const Drawer = createDrawerNavigator();

  const theme = useTheme();
  const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;
  return (
    <NavigationContainer theme={navigationTheme}>
      <Drawer.Navigator
        drawerContent={props => (
          <DrawerContent {...props} toggleTheme={navProps.toggleTheme} />
        )}
      >
        <Drawer.Screen name="Home" component={MainTabNavigatior} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
