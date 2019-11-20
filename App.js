import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ApiKeys from './ApiKeys.js'
import * as firebase from 'firebase'

export default class App extends Component {
  constructor(props){
    super(props);

    if(!firebase.apps.length){firebase.initializeApp(ApiKeys.firebaseConfig)}
  }


  render(){
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
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
