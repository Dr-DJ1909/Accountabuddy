import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { connect} from 'react-redux';
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
import {getUser} from './src/api/UserRoute';
// import { createStackNavigator } from 'react-navigation-stack'

const MainNavigator = createSwitchNavigator(
  {
    SignUpLogIn: {screen: SignUpLogIn},
    TestPetScreen: {screen: TestPetScreen},
    UserNameScreen:{screen:UserNameScreen},
    NavWrapper: {screen: NavWrapper},
  },
  {
    backBehavior: 'none',
    initialRouteName:'SignUpLogIn'
  }
);

const AppLogin = createAppContainer(MainNavigator);

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

    componentDidMount() {
      console.log('hello')
    this.authSubscription =  firebase.auth().onAuthStateChanged(async (user) => {
      try {
        const userLoggedIn = this.props.user.uid
        if(userLoggedIn){
          let loggedinUser = await getUser(user.uid)
          console.log('what are you?????',loggedinUser)
          this.setState({
            loading: false,
            user
          });
        }
        else{
          console.log('esle statement',this.props)
          this.setState({
            loading:false

          });
        }

      } catch (error) {
        console.error(error)
      }
    });

  }
    render() {
      const userCheck = this.props.user && this.props.user.uid
    if (this.state.loading) return null;
    console.log('im being hit', this.props.user)
    if (userCheck && !this.props.user.isDoingTutorial) {
      console.log('usercheck', this.props)
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

const mapDispatchToProps = function(dispatch) {
  return {
    getUserAction: user => dispatch(getUserThunk(user)),
    getUserKey: userKey => dispatch(getUserKeyThunk(userKey))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);


