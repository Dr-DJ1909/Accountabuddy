import React, {Component} from 'react';
import {createSwitchNavigator} from 'react-navigation';
import SocialHome from '../components/social/SocialHome';
import UserProfile from '../screens/social/UserProfile';
import UserFriends from '../screens/social/UserFriends';
import SearchUsers from '../screens/social/SearchUsers';
import FriendRequests from '../screens/social/FriendRequests';
import Chat from '../components/social/Chat';

const SocialWrapper = createSwitchNavigator(
  {
    SocialHome: {
      screen: SocialHome
    },
    FriendList: {
      screen: UserFriends
    },
    AddFriend: {
      screen: SearchUsers
    },
    UserProfile: {
      screen: UserProfile
    },
    FriendRequests: {
      screen: FriendRequests
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
