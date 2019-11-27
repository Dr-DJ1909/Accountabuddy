import React, {Component} from 'react';
import {Image} from 'react-native';
import {
  PageWrapperView,
  AbsolutePositionPetView,
  HeaderText,
  PetView,
  BubbleText,
  AbsolutePositionBubbleView,
  AddTaskBtnView
} from '../styles';
import Profile from '../screens/UserProfile';
import HomePet from './HomePet';
import Icon from 'react-native-vector-icons/Feather';

class Home extends Component {
  constructor() {
    super();
  }

  render() {
    let petName = this.props ? this.props.petName : <Text />;
    return (
      <PageWrapperView>
        <HeaderText>{petName}</HeaderText>
        <Profile />
      </PageWrapperView>
    );
  }
}

export default Home;
