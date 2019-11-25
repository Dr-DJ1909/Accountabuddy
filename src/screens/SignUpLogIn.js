import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  AsyncStorage
} from 'react-native';
import { Container, Form, Input, Item, Label, Button } from 'native-base';
import { newUser, googleUser, signUpUser, signInWithGoogleAsync, loginUser, getUser } from '../api/UserRoute';

import * as firebase from 'firebase';

export default class SignUpLogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      imageURI: '',
    };
    this.signUp = this.signUp.bind(this.signUp)
  }
    GoogleSignIn(){
      signInWithGoogleAsync()
    }

  signUp =  async (email, password) =>{
    try {
      let newUser = await signUpUser(email, password)
      console.log('newUserId in signUp' , newUser)
    } catch (error) {
      console.log(error)
    }
  }

  loginUser = async (email, password) => {
    const { navigate } = this.props.navigation
    try {
        let userKey = await loginUser(email,password)
        // console.log ('userKey in screen', userKey)
        console.log('getuser', await getUser(userKey))
        await AsyncStorage.setItem('loggedinUser', userKey)
        navigate("TestPetScreen")
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
              onPress={()=>
              this.signUp(this.state.email, this.state.password)}
            >
              <Text style={{ color: 'white' }}>Sign Up</Text>
            </Button>

            <Button style={{ marginTop: 10 }} title="Sign in with Google" onPress={() => this.GoogleSignIn()}><Text>Log in with Google</Text></Button>
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
