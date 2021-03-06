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
import {renameUserName,getUser, finishedTutorial} from '../../api/UserRoute'
import {getUserThunk} from '../../store/user';
import { connect } from 'react-redux';



class UserNameScreen extends Component{
  constructor(){
    super()
    this.state = {
      UserName:''
    }

    this.handleSubmit.bind(this)
  }



  async handleSubmit(newUserName){
    let userKey = await AsyncStorage.getItem('userKey')
    await renameUserName(userKey, newUserName)
    let freshUser= await getUser(userKey)
    await finishedTutorial(userKey)
    freshUser.isDoingTutorial = false
    this.props.getUserAction(freshUser)
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
        <View
          style = {{
            display:'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
        <Image
       source = {require('../../assets/AccountaBuddy.png')}
       style = {{height:300, width: 300, resizeMode :'contain',}}
        />

          </View>
        <Form>
            <Item floatingLabel>
              <Label>What's your username?</Label>
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


const mapDispatchToProps = function(dispatch){
  return{
    getUserAction:(user) =>dispatch(getUserThunk(user))
  }
}
export default connect(
  null,
  mapDispatchToProps)
(UserNameScreen);
