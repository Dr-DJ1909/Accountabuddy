import React, {Component} from 'react';
import {createSwitchNavigator} from 'react-navigation';
import SocialHome from '../components/social/SocialHome';
import UserProfile from '../screens/social/UserProfile';
import UserFriends from '../screens/social/UserFriends';
import SearchUsers from '../screens/social/SearchUsers';
import FriendRequests from '../screens/social/FriendRequests';
import {newFriend} from '../api/FriendsRoute';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Chat from '../components/social/Chat';
import {createStackNavigator} from 'react-navigation-stack';

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
      screen: UserProfile,
      navigationOptions: {
        drawerLabel: 'About Me'
      }
    },
    FriendRequests: {
      screen: FriendRequests,
      navigationOptions: {
        drawerLabel: 'Pending friend requests'
      }
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
