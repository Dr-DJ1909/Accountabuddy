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
import {newPetName} from '../../api/PetRoute'

export default class TestPetScreen extends Component{
  constructor(){
    super()
    this.state = {
      petName:''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(newName){

    let userKey = await AsyncStorage.getItem('userKey')

    await newPetName(userKey, newName)

    const {navigate} = this.props.navigation
    navigate('UserNameScreen')
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
              <Label>What's your Pet's Name?</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText = {petName =>{this.setState({petName})}}
              />
            </Item>

            <Button
              style={{ marginTop: 10 }}
              full
              rounded
              primary
              onPress = {() =>{this.handleSubmit(this.state.petName)}}
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
