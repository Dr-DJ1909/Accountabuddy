import React, {Component} from 'react';
import {createSwitchNavigator} from 'react-navigation';
import SocialHome from '../components/social/SocialHome';
import UserProfile from '../screens/social/UserProfile';
import UserFriends from '../screens/social/UserFriends';
import SearchUsers from '../screens/social/SearchUsers';
import Chat from '../components/social/Chat';
import { createStackNavigator } from 'react-navigation-stack'

const SocialWrapper = createSwitchNavigator(
  {
    SocialHome: {
      screen: SocialHome
    },
    FriendList: {
      screen: UserFriends,
    },
    AddFriend: {
      screen: SearchUsers,
    },
    UserProfile: {
      screen: UserProfile,
    },
    Chat: {
      screen: Chat
    }
  },
  {
    initialRouteName: 'SocialHome',
    backBehavior: 'initialRoute'
  }
);

export default SocialWrapper;
