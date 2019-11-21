import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import ApiKeys from "./ApiKeys";
import firebase from "firebase";
import "@firebase/firestore";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import SignUpLogIn from "./src/screens/SignUpLogIn";
import HomeWrapper from "./src/components/HomeWrapper";
import TasksWrapper from "./src/components/TasksWrapper";
import SettingsWrapper from "./src/components/SettingsWrapper";
import PageWrapperView from "./src/styles";

const bottomTabNavigator = createBottomTabNavigator(
  {
    Home: HomeWrapper,
    Tasks: TasksWrapper,
    Settings: SettingsWrapper
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(bottomTabNavigator);

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <SignUpLogIn />
      // <AppContainer />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
