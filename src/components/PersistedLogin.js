import React from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  AsyncStorage
} from 'react-native';
import {Container, Form, Input, Item, Label, Button} from 'native-base';
import {withNavigation} from 'react-navigation';
import {
  newUser,
  googleUser,
  signUpUser,
  signInWithGoogleAsync,
  loginUser,
  getUser
} from '../api/UserRoute';
import * as firebase from 'firebase';
import {getUserThunk, getUserKeyThunk} from '../store/user';
import NavWrapper from './NavWrapper';

class PersistedLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      imageURI: ''
    };
  }

  persistedUser = async (userKey) => {
    try {
      const currentUser = await getUser(userKey);
      // console.log('currentUser >>>>' , currentUser)
      this.props.getUserAction(currentUser);
      this.props.getUserKey(userKey);
    } catch (err) {
      console.log(err.toString());
    }
  }

  render() {
    this.persistedUser(this.props.userKey)
    return (
      <NavWrapper />
    );
  }
}

const mapStateToProps = function(state) {
  console.log('state >>>>>>>>>', this.state)
  return {
    user: state.user.user
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    getUserAction: user => dispatch(getUserThunk(user)),
    getUserKey: userKey => dispatch(getUserKeyThunk(userKey))
  };
};

export default connect(null, mapDispatchToProps)(PersistedLogin);
