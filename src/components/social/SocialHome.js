import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PageWrapperView, HeaderText} from '../../styles';
import {
  StyleSheet,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  AsyncStorage
} from 'react-native';
import {Container, Form, Input, Item, Label, Button} from 'native-base';
import {getUserThunk} from '../../store/user';
import UserProfile from '../../screens/UserProfile';
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
      <PageWrapperView>
        <HeaderText>Social Page</HeaderText>
        {/* <UserProfile /> */}
        <Chat />
      </PageWrapperView>
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
