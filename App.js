import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Provider,connect} from 'react-redux';
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
import {getUser, finishedTutorial} from './src/api/UserRoute';
// import { createStackNavigator } from 'react-navigation-stack'

ignoreWarnings('Setting a timer');
ignoreWarnings('Require cycle');

const MainNavigator = createSwitchNavigator(
  {
    SignUpLogIn: {screen: SignUpLogIn},
    TestPetScreen: {screen: TestPetScreen},
    UserNameScreen: {screen:UserNameScreen},
    NavWrapper: {screen: NavWrapper}
  },
  {
    backBehavior: 'none'
  }
);

const AppLogin = createAppContainer(MainNavigator);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentWillMount() {
    let config = ApiKeys.firebaseConfig;
    firebase.initializeApp(config);
  }

  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        loading: false,
        user,
      });
    });
  }

  render() {
    if (this.state.loading) return null;
    if (this.state.user && !this.props.user.isDoingTutorial) {

      return (
          <PersistedLogin userKey={this.state.user.uid}/>
      )
    }
    return (
        <AppLogin />
    );
  }
}

const mapStateToProps = function(state) {

  return {
    user: state.user.user
  };
};

const ConnectedApp = connect (mapStateToProps, null)(App)

export default function(){
  return(
    <Provider store={Store}>
      <ConnectedApp/>
    </Provider>
  )
}
