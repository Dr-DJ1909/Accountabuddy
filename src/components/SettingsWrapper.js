import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import {getUserThunk} from '../store/user';

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
    this.props.getUser();
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

const mapStateToProps = function(state) {
  return {
    user: state.user
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    getUser: () => dispatch(getUserThunk())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (SettingsWrapper);
