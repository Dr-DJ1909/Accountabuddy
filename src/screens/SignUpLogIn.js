import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import { Container, Form, Input, Item, Label, Button } from 'native-base';
import { newUser } from '../api/UserRoute';
import * as Google from 'expo-google-app-auth';

import * as firebase from 'firebase';

export default class SignUpLogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      imageURI: '',
    };
  }

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        behavior: 'web',
        // androidClientId: YOUR_CLIENT_ID_HERE,
        iosClientId: '666961844500-4hs4fj4f89m4talt3djo1echq9da2u2m.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  signUpUser = (email, password) => {
    try {
      if (this.state.password.length < 6) {
        alert('Please enter at least 6 characters');
        return;
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(console.log('okay'));
      let user = firebase.auth().currentUser;
      newUser(user);
      console.log('USERRR', user);
    } catch (err) {
      console.log(err.toString());
    }
  };

  loginUser = (email, password) => {
    // const { navigate } = this.props.navigation
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(function (user) {
          console.log('USER', user.user.uid);
          // navigate("UserProfile", {
          //   user,
          //   updateCurrUser: this.updateCurrUser
          // })
        });
    } catch (err) {
      console.log(err.toString());
    }
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="height"
        keyboardVerticalOffset={60}
      >
        <Container style={{ ...styles.container, backgroundColor: '#EFE2E5' }}>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={email => this.setState({ email })}
              />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={password => this.setState({ password })}
              />
            </Item>

            <Button
              style={{ marginTop: 10 }}
              full
              rounded
              success
              onPress={() =>
                this.loginUser(this.state.email, this.state.password)
              }
            >
              <Text style={{ color: 'white' }}>Login</Text>
            </Button>
            <Button
              style={{ marginTop: 10 }}
              full
              rounded
              primary
              onPress={() =>
                this.signUpUser(this.state.email, this.state.password)
              }
            >
              <Text style={{ color: 'white' }}>Sign Up</Text>
            </Button>

            <Button style={{ marginTop: 10 }} title="Sign in with Google" onPress={() => this.signInWithGoogleAsync()}><Text>Log in with Google</Text></Button>
          </Form>
        </Container>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10,
  },
});
