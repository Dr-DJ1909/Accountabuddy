import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AsyncStorage} from 'react-native';
import {PageWrapperAlignTopView, HeaderText, BlueButton, ButtonText} from '../styles';
import {getUserThunk} from '../store/user';
import firebase from 'firebase';

logOutUser = async () => {
  try {
      await firebase.auth().signOut();
      AsyncStorage.clear();
  } catch (error) {
      console.error(error);
  }
}

class SettingsWrapper extends Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <PageWrapperAlignTopView>
        <HeaderText>Settings</HeaderText>
        <BlueButton
          onPress={() => navigate('ChangeInfo')}>
          <ButtonText>Change your username or your pet's name</ButtonText>
        </BlueButton>
        <BlueButton
          onPress={() => logOutUser()}>
          <ButtonText>Log out</ButtonText>
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingsWrapper);
