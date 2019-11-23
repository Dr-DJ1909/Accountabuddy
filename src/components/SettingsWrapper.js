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

class SettingsWrapper extends Component {
  constructor(){
    super()
    this.state = {
      userName:'',
      profileImg:'',
      email:'',
      location:'',
    }
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount(){
    let userKey = await AsyncStorage.getItem('loggedinUser')
    console.log(userKey)
  }

  handleChange(event){
    event.preventDefault()
    this.setState({
      [event.target.name]:event.target.value
    })
  }

  handleSubmit(){

  }


  render() {
    return (
      <PageWrapperView>
        <HeaderText>This is the Settings Page:</HeaderText>

        <Form>


        </Form>
      </PageWrapperView>
    )
  }
}

export default SettingsWrapper;
