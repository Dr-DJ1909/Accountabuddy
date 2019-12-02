import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PageWrapperAlignTopView, HeaderText} from '../../styles';
import {
  StyleSheet,
  Button,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  AsyncStorage
} from 'react-native';
import { BlueButton, ButtonText } from '../../styles';
import {getUserThunk} from '../../store/user';
import UserProfile from '../../screens/social/UserProfile';
import {newFriend} from '../../api/FriendsRoute';
import Chat from './Chat';

class SocialHome extends Component {
  constructor() {
    super();
  }

  async componentDidMount() {
  }

  handleSubmit() {}

  render() {
    return (
      <PageWrapperAlignTopView>
        <HeaderText>Social Page</HeaderText>
        {/* <UserProfile /> */}
        <BlueButton
          onPress = {()=>this.props.navigation.navigate('UserProfile')}
        >
          <ButtonText>My Profile</ButtonText>
        </BlueButton>
        <BlueButton
          onPress = {()=>this.props.navigation.navigate('FriendList')}
        >
          <ButtonText>Friends List</ButtonText>
        </BlueButton>
        <BlueButton
          onPress = {()=>this.props.navigation.navigate('AddFriend')}
        >
          <ButtonText>Add friend</ButtonText>
        </BlueButton>
        <BlueButton
          onPress = {()=>this.props.navigation.navigate('Chat')}
        >
          <ButtonText>Navigate to Chat</ButtonText>
        </BlueButton>
      </PageWrapperAlignTopView>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    user: state.user
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    getUserAction: () => dispatch(getUserThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialHome);
