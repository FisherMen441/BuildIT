import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import IntroScreen from '../screens/IntroScreen';

export default createAppContainer(createSwitchNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Home: HomeScreen,
    Search: SearchScreen,
    Intro: IntroScreen
  },
  {
    initialRouteName: 'Home',
    backBehavior: 'initialRoute'
  }
));