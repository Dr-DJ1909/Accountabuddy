import React, {Component} from 'react';
import {Image} from 'react-native';
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
import Icon from 'react-native-vector-icons/Feather';

class Profile extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <PageWrapperView>
        <Text>User Profile Page</Text>
        <FlatList data={} renderItem={}></FlatList>
      </PageWrapperView>
    );
  }
}

export default Profile;
