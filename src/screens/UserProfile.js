import React, {Component} from 'react';
import {Image, Text} from 'react-native';
import {
  PageWrapperView,
  AbsolutePositionPetView,
  HeaderText,
  PetView,
  BubbleText,
  AbsolutePositionBubbleView,
  AddTaskBtnView,
  FlatList
} from '../styles';
import {newFriend} from '../api/FriendsRoute';
import {getUsers} from '../api/UserRoute';
import Icon from 'react-native-vector-icons/Feather';

class Profile extends React.Component {
  constructor() {
    super();
  }
  render() {
    async function allUsers() {
      return await getUsers();
    }
    console.log('check', allUsers());
    // const mappedUsers = allUsers.map(user => {
    //   return <Text>Hello</Text>;
    // });
    return (
      <PageWrapperView>
        <Text>Hi</Text>
      </PageWrapperView>
    );
  }
}

export default Profile;
