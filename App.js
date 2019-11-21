import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ApiKeys from './ApiKeys.js'
import * as firebase from 'firebase'

import SignUpLogIn from './src/screens/SignUpLogIn'

export default class App extends Component {
  constructor(props) {
    super(props);

    if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.firebaseConfig) }
  }


  render() {
    return (
      <SignUpLogIn />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
