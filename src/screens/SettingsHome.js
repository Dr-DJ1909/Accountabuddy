import React, { Component } from "react";
import { connect } from "react-redux";
import { AsyncStorage, View } from "react-native";
import {
  PageWrapperAlignTopView,
  HeaderText,
  BlueButtonWidth,
  BlueButtonWidthTwo,
  ButtonText,
  TopHeader,
  TopHeaderText
} from "../styles";
import { getUserThunk } from "../store/user";
import firebase from "firebase";

logOutUser = async () => {
  try {
    await firebase.auth().signOut();
    AsyncStorage.clear();
  } catch (error) {
    console.error(error);
  }
};

class SettingsWrapper extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <PageWrapperAlignTopView>
        <TopHeader>
          <TopHeaderText>Settings</TopHeaderText>
        </TopHeader>
        <View style={{ marginVertical: 50 }}>
          <BlueButtonWidthTwo onPress={() => navigate("ChangeInfo")}>
            <ButtonText>Change your username or your pet's name</ButtonText>
          </BlueButtonWidthTwo>
          <BlueButtonWidth onPress={() => logOutUser()}>
            <ButtonText>Log out</ButtonText>
          </BlueButtonWidth>
        </View>
      </PageWrapperAlignTopView>
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
    getUserAction: () => dispatch(getUserThunk())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsWrapper);
