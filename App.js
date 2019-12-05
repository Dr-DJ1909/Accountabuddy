import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import Store from './src/store/index';
import ApiKeys from './ApiKeys';
import firebase from 'firebase';
import '@firebase/firestore';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import SignUpLogIn from './src/screens/SignUpLogIn';
import TestPetScreen from './src/screens/Tutorials/TestPetScreen';
import UserNameScreen from './src/screens/Tutorials/UserNameScreen';
import NavWrapper from './src/components/NavWrapper';
import PersistedLogin from './src/components/PersistedLogin';
import ignoreWarnings from 'react-native-ignore-warnings';
import {getUser} from './src/api/UserRoute';
import Auth from './Auth'
// import { createStackNavigator } from 'react-navigation-stack'

ignoreWarnings('Setting a timer');
ignoreWarnings('Require cycle');

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let config = ApiKeys.firebaseConfig;
    firebase.initializeApp(config);
  }

    render() {
      return (
        <Provider store={Store}>

          <Auth />
        </Provider>
      )
    }
}
