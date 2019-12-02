import React, {Component} from 'react';
import { connect } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat';
import { PageWrapperAlignTopView } from '../../styles';
import {newChat, newMessage, previousMessages} from '../../api/ChatRoute'


class Chat extends Component {
  // static navigationOptions = ({ navigation }) => ({
  //   title: (navigation.state.params || {}).name || 'Chat!'
  // });

  state = {
    messages: [{
      createdAt : new Date()
    }],
  };

  // get user() {
  //   return {
  //     name: this.props.navigation.state.params.name,
  //     email: this.props.navigation.state.params.email,
  //     avatar: this.props.navigation.state.params.avatar,
  //     id: firebaseSDK.uid,
  //     _id: firebaseSDK.uid
  //   };
  // }
  async componentWillMount() {
    try {
      let loadChat = await previousMessages()
      loadChat.messages.reverse()
      loadChat.messages.forEach((current)=>{
        let date = current.createdAt.toDate()
        current.createdAt = date
        console.log('are you here?', current.createdAt)
      })

    console.log('previous messages object>>>>>>>>><>>><>>>>>>>>', loadChat.messages)
    this.setState({
      messages:loadChat.messages
    })
    } catch (error) {
      console.error(error)
    }
    // login.refOn(message =>
    //   this.setState(previousState => ({
    //     messages: GiftedChat.append(previousState.messages, message)
    //   }))
    // );
  }

  render() {
    return (
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={this.props.user}
        />
    );
  }
  componentWillUnmount() {
    // login.refOff();
  }

  async onSend(messages) {
    console.log('how does this look?',messages)
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)}))
    let user = this.props.userKey
    messages[0].author = user
    newMessage(messages[0])
    // const chatObject = {
    //   content:messages[0].text,
    //   author:user,
    //   timeCreated:Date()
    // }
    // let message = this.state.messages[this.state.messages.length-1]
    // console.log('single latest message',message)
    // if(message){
    //   message.author = user
    //   newMessage(message)
    // }
  }
}

const mapStateToProps = function(state) {
  return {
    user: state.user.user,
    userKey: state.user.userKey
  }
}
export default connect(
  mapStateToProps,
  null)
  (Chat);
