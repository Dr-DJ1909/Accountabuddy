import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from 'react-redux';
import Store from './src/store/index';
import ApiKeys from "./ApiKeys";
import firebase from "firebase";
import "@firebase/firestore";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import SignUpLogIn from "./src/screens/SignUpLogIn";
import TestPetScreen from './src/screens/TestPetScreen';
import HomeWrapper from "./src/components/HomeWrapper";
import TasksWrapper from "./src/components/TasksWrapper";
import SettingsWrapper from "./src/components/SettingsWrapper";
import { PageWrapperView } from "./src/styles";
import NavWrapper from './src/components/NavWrapper'

// import { StackActions } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
const MainNavigator = createStackNavigator({
  SignUpLogIn: { screen: SignUpLogIn },
  TestPetScreen: { screen:TestPetScreen },
  NavWrapper: { screen: NavWrapper }
})

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

const TestingApp = createAppContainer(MainNavigator)

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let config = ApiKeys.firebaseConfig
    firebase.initializeApp(config)
  }

  render() {
    return (

      <Provider store={Store}>
        <TestingApp />
        {/* <SignUpLogIn /> */}
        {/* <AppContainer /> */}
      </Provider>
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
