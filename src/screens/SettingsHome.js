import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AsyncStorage} from 'react-native';
import {PageWrapperAlignTopView, HeaderText, BlueButtonWidth, BlueButtonWidthTwo, ButtonText, TopHeader, TopHeaderText} from '../styles';
import {getUserThunk, getUserKeyThunk} from '../store/user';
import firebase from 'firebase';


logOutUser = async () => {
  try {
    console.log('are you being hit?', this.props)
      await firebase.auth().signOut();
      console.log('')
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
        <TopHeader>
          <TopHeaderText>Settings</TopHeaderText>
        </TopHeader>
        <BlueButtonWidthTwo
          onPress={() => navigate('ChangeInfo')}>
          <ButtonText>Change your username or your pet's name</ButtonText>
        </BlueButtonWidthTwo>
        <BlueButtonWidth
          onPress={() => {

            logOutUser()
            this.props.deleteUser()
            this.props.deleteUserKey()
            }}>
          <ButtonText>Log out</ButtonText>
        </BlueButtonWidth>
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
    deleteUser: () => dispatch(getUserThunk({})),
    deleteUserKey: () =>dispatch(getUserKeyThunk(''))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsWrapper);
