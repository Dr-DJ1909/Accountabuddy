import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PageWrapperAlignTopView, HeaderText, OrangeButton, ButtonText} from '../styles';
import {
  StyleSheet,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  AsyncStorage,
  TextInput
} from 'react-native';
import {Container, Form, Input, Item, Label, Button} from 'native-base';
import {getUserThunk} from '../store/user';
import SettingsInfo from '../components/SettingsInfo';

class SettingsWrapper extends Component {

  render() {
    const {navigate} = this.props.navigation;
    return (
      <PageWrapperAlignTopView>
        <HeaderText>Settings</HeaderText>
        <OrangeButton
          onPress={() => navigate('ChangeInfo')}>
          <ButtonText>Change your username or your pet's name</ButtonText>
        </OrangeButton>
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingsWrapper);
