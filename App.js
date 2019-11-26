import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from 'react-redux';
import Store from './src/store/index';
import ApiKeys from "./ApiKeys";
import firebase from "firebase";
import "@firebase/firestore";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import SignUpLogIn from "./src/screens/SignUpLogIn";
import TestPetScreen from './src/screens/TestPetScreen';
import NavWrapper from './src/components/NavWrapper';
import ignoreWarnings from 'react-native-ignore-warnings';
// import { createStackNavigator } from 'react-navigation-stack'

ignoreWarnings('Setting a timer');


const MainNavigator = createSwitchNavigator(
  {
  SignUpLogIn: { screen: SignUpLogIn },
  TestPetScreen: { screen:TestPetScreen },
  NavWrapper: { screen: NavWrapper }
  },
  {
    backBehavior: 'none',
  }
)

const AppLogin = createAppContainer(MainNavigator)

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
        <AppLogin />
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
