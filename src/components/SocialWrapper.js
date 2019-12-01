import React, {Component} from 'react';
import {createSwitchNavigator} from 'react-navigation';
import SocialHome from '../components/social/SocialHome';
import Chat from '../components/social/Chat';
import { createStackNavigator } from 'react-navigation-stack'

const SocialWrapper = createSwitchNavigator(
  {
    SocialHome: {
      screen: SocialHome
    },
    Chat: {
      screen: Chat
    }
  },
  {
    initialRouteName: 'SocialHome'
  }
);

export default SocialWrapper;
