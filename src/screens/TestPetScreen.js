import React, { Component } from 'react';
import { PageWrapperView, HeaderText } from '../styles';
import {
  StyleSheet,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native';
import { Container, Form, Input, Item, Label, Button } from 'native-base';
import {newPet} from '../api/PetRoute'

export default class TestPetScreen extends Component{
  constructor(){
    super()
    this.state = {
      petName:''
    }
    // this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  // handleChange(event){
  //   event.preventDefault()
  //   this.setState({
  //     petName:event.target.value
  //   })
  // }

  async handleSubmit(){
    let userKey = await AsyncStorage.getItem('loggedinUser')
    newPet(userKey, this.state.petName)
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
