import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  AsyncStorage,
  Button
} from 'react-native';
import {
  PageWrapperView,
  AbsolutePositionPetView,
  HeaderText,
  ProfileView
} from '../../styles';
import {ListItem} from 'react-native-elements';
import {newFriend, getFriendList} from '../../api/FriendsRoute';
import {getUsers, updateBio} from '../../api/UserRoute';
import Icon from 'react-native-vector-icons/Feather';
import TasksHeader from '../../components/tasks/TasksHeader';
import EditProfileInput from '../social/EditProfileInput';

export default function Profile(props) {
  console.log('profile props', props);
  return (
    <ProfileView>
      <Text>About Me: {props.bio}</Text>
    </ProfileView>
  );
}
