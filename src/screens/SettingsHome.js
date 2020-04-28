import React, { Component } from "react";
import { connect } from "react-redux";
import { AsyncStorage, View } from "react-native";
import {
  HeaderText,
  BlueButtonWidth,
  BlueButtonWidthTwo,
  ButtonText,
  TopHeader,
  TopHeaderText,
  PageWrapperAlignTopViewLight
} from "../styles";
import { logOutUserThunk } from "../store/user";
import firebase from "firebase";


class SettingsWrapper extends Component {
  logOutUser = async () => {
    try {
      await firebase.auth().signOut();
      this.props.logOutUserAction();
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <PageWrapperAlignTopViewLight>
        <TopHeader>
          <TopHeaderText>Settings</TopHeaderText>
        </TopHeader>
        <View style={{ marginVertical: 50 }}>
          <BlueButtonWidthTwo onPress={() => navigate("ChangeInfo")}>
            <ButtonText>Change your username or your pet's name</ButtonText>
          </BlueButtonWidthTwo>
          <BlueButtonWidth onPress={() => this.logOutUser()}>
            <ButtonText>Log out</ButtonText>
          </BlueButtonWidth>
        </View>
      </PageWrapperAlignTopViewLight>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    user: state.user
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    logOutUserAction: () => dispatch(logOutUserThunk())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsWrapper);
