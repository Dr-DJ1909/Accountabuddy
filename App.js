import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider, connect } from "react-redux";
import Store from "./src/store/index";
import ApiKeys from "./ApiKeys";
import firebase from "firebase";
import "@firebase/firestore";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import SignUpLogIn from "./src/screens/SignUpLogIn";
import TestPetScreen from "./src/screens/Tutorials/TestPetScreen";
import UserNameScreen from "./src/screens/Tutorials/UserNameScreen";
import NavWrapper from "./src/components/NavWrapper";
import PersistedLogin from "./src/components/PersistedLogin";
import ignoreWarnings from "react-native-ignore-warnings";
import { getUser, finishedTutorial } from "./src/api/UserRoute";
import * as Font from "expo-font";
// import { createStackNavigator } from 'react-navigation-stack'

ignoreWarnings("Setting a timer");
ignoreWarnings("Require cycle");

const MainNavigator = createSwitchNavigator(
  {
    SignUpLogIn: { screen: SignUpLogIn },
    TestPetScreen: { screen: TestPetScreen },
    UserNameScreen: { screen: UserNameScreen },
    NavWrapper: { screen: NavWrapper }
  },
  {
    backBehavior: "none"
  }
);

const AppLogin = createAppContainer(MainNavigator);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentWillMount() {
    let config = ApiKeys.firebaseConfig;
    firebase.initializeApp(config);
  }

  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged(user => {
      this.setState({
        loading: false,
        user
      });
    });

    Font.loadAsync({
      "FredokaOne-Regular": require("./src/assets/fonts/FredokaOne-Regular.ttf"),
      'Aaargh': require("./src/assets/fonts/Aaargh.ttf"),
      'FallIsComing': require("./src/assets/fonts/FallIsComing.ttf"),
      "Florentia-Regular-trial": require("./src/assets/fonts/Florentia-Regular-trial.ttf"),
      'GoodUnicorn': require("./src/assets/fonts/GoodUnicorn.ttf"),
      'LosingGrip': require("./src/assets/fonts/LosingGrip.ttf"),
      'QuiteMagical': require("./src/assets/fonts/QuiteMagical.ttf"),
      "Roboto-Light": require("./src/assets/fonts/Roboto-Light.ttf"),
      "Roboto-Medium": require("./src/assets/fonts/Roboto-Medium.ttf"),
      "Roboto-Thin": require("./src/assets/fonts/Roboto-Thin.ttf"),
      "Sparkler-demo": require("./src/assets/fonts/Sparkler-demo.ttf"),
      'TepenoSansBoldItalic': require("./src/assets/fonts/TepenoSansBoldItalic.ttf"),
      'TepenoSansBold': require("./src/assets/fonts/TepenoSansBold.ttf"),
      'TepenoSansRegular': require("./src/assets/fonts/TepenoSansRegular.ttf"),
      'TepenoSansRegularItalic': require("./src/assets/fonts/TepenoSansRegularItalic.ttf"),
      'TepenoSansLight': require("./src/assets/fonts/TepenoSansLight.ttf"),
      'TepenoSansLightItalic': require("./src/assets/fonts/TepenoSansLightItalic.ttf")
    });
  }

  render() {
    if (this.state.loading) return null;
    if (this.state.user && !this.props.user.isDoingTutorial) {
      return <PersistedLogin userKey={this.state.user.uid} />;
    }
    return <AppLogin />;
  }
}

const mapStateToProps = function (state) {
  return {
    user: state.user.user
  };
};

const ConnectedApp = connect(mapStateToProps, null)(App);

export default function () {
  return (
    <Provider store={Store}>
      <ConnectedApp />
    </Provider>
  );
}
