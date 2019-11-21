import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ApiKeys from './ApiKeys.js'
import firebase from 'firebase'
import '@firebase/firestore';

export default class App extends Component {
  constructor(props){
    super(props);

  }

  componentWillMount(){
    let config = ApiKeys.firebaseConfig
    firebase.initializeApp(config)

    firebase.firestore()
    .collection("Users")
    .doc("mario")
    .set({
      employment: "plumber",
      outfitColor: "red",
      specialAttack: "fireball"
    })
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
