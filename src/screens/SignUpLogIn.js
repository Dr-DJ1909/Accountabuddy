import React from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView } from 'react-native';
import { Container, Form, Input, Item, Label, Button, } from 'native-base'

import * as firebase from 'firebase'

export default class SignUpLogIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      email: '',
      password: '',
      imageURI: ''
    })
  }

  signUpUser = (email, password) => {
    try {
      if (this.state.password.length < 6) {
        alert("Please enter at least 6 characters")
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password)
    }
    catch (err) {
      console.log(err.toString())
    }
  }

  loginUser = (email, password) => {
    const { navigate } = this.props.navigation
    try {
      firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
        console.log(user)
        navigate("UserProfile", {
          user,
          updateCurrUser: this.updateCurrUser
        })
      })
    }
    catch (err) {
      console.log(err.toString())
    }
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="height"
        keyboardVerticalOffset={60}
      >
        <Container style={{ ...styles.container, backgroundColor: '#EFE2E5' }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', margin: 'auto', padding: 0 }}>
            <Image source={require('../assets/catIcon.png')} style={{ borderRadius: 75, borderWidth: 1, borderColor: 'grey', margin: 20, width: 150, height: 150 }} />
          </View>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(email) => this.setState({ email })}
              />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(password) => this.setState({ password })}
              />
            </Item>


            <Button style={{ marginTop: 10 }} full rounded success onPress={() => this.loginUser(this.state.email, this.state.password)}>
              <Text style={{ color: 'white' }}>Login</Text>
            </Button>
            <Button style={{ marginTop: 10 }} full rounded primary onPress={() => this.signUpUser(this.state.email, this.state.password)}>
              <Text style={{ color: 'white' }}>Sign Up</Text>
            </Button>
          </Form>
        </Container >
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
  },

})

