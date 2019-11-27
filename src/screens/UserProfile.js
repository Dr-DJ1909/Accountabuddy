import React, {Component} from 'react';
import {Image, Text, View, FlatList} from 'react-native';
import {
  PageWrapperView,
  AbsolutePositionPetView,
  HeaderText,
  PetView,
  BubbleText,
  AbsolutePositionBubbleView,
  AddTaskBtnView
} from '../styles';
import {newFriend} from '../api/FriendsRoute';
import {getUsers} from '../api/UserRoute';
import Icon from 'react-native-vector-icons/Feather';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }
  async componentDidMount() {
    let users = await getUsers();
    this.setState({users: users});
  }
  render() {
    user = this.state.users[0];
    if (this.state.users.length) {
      return (
        <PageWrapperView>
          <Text>{user.email}</Text>
        </PageWrapperView>
      );
    } else {
      return <View></View>;
    }
  }
}

export default Profile;
