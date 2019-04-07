import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import IntroScreen from '../screens/IntroScreen';
import QRScreen from '../screens/QRScreen';
import CommentScreen from '../screens/CommentScreen';
import StepScreen from '../screens/StepScreen';
import ToolScreen from '../screens/ToolScreen';
import CameraScreen from '../screens/CameraScreen';
import CameraToolScreen from '../screens/CameraToolScreen';

export default createAppContainer(createSwitchNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Home: HomeScreen,
    Search: SearchScreen,
    Intro: IntroScreen,
    QR: QRScreen,
    Comment: CommentScreen,
    Step: StepScreen,
    Tool: ToolScreen,
    Camera: CameraScreen,
    CameraTool: CameraToolScreen,
  },
  {
    initialRouteName: 'Home',
    backBehavior: 'initialRoute'
  }
));