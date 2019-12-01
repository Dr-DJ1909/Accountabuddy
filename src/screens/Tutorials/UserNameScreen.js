import React, { Component } from 'react';
import { PageWrapperView, HeaderText } from '../../styles';
import {
  StyleSheet,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native';
import { Container, Form, Input, Item, Label, Button } from 'native-base';
import {renameUserName} from '../../api/UserRoute'

export default class UserNameScreen extends Component{
  constructor(){
    super()
    this.state = {
      UserName:''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(newUserName){
    console.log('this is the userNAme', newUserName)
    let userKey = await AsyncStorage.getItem('userKey')
    await renameUserName(userKey, newUserName)
    const {navigate} = this.props.navigation
    navigate('NavWrapper')
  }

  render(){
    return(
    <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="height"
        keyboardVerticalOffset={60}
      >
        <Container style={{ ...styles.container, backgroundColor: '#EFE2E5' }}>
        <Form>
            <Item floatingLabel>
              <Label>What's your userName?</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText = {UserName =>{this.setState({UserName})}}
              />
            </Item>

            <Button
              style={{ marginTop: 10 }}
              full
              rounded
              primary
              onPress = {() =>{this.handleSubmit(this.state.UserName)}}
            >
              <Text style={{ color: 'white' }}>Meow</Text>
            </Button>
          </Form>
        </Container>
        </KeyboardAvoidingView>
    )
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
