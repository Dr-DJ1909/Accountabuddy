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
      <PageWrapperAlignTopView>
        <HeaderText>Social Page</HeaderText>
        <UserProfile />
        <Button title="Navigate to Chat"
          onPress = {()=>this.props.navigation.navigate('Chat')}
        />
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
