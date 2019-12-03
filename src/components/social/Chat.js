import React, {Component} from 'react';
import { connect } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat';
import { PageWrapperAlignTopView } from '../../styles';
import {newChat, newMessage, previousMessages} from '../../api/ChatRoute'
import firebase from 'firebase';
//import {QuerySnapshot} from '@firebase/firestore-types';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatUpdated: false,
      messages: [],
    };
    this.getNewMessages();
  }
  getNewMessages = async () => {
    let newMessages = []
    try {
     const message =  await firebase
      .firestore()
      .collection('Chat')
      .doc(this.props.navigation.state.params.item.roomKey)

      message.onSnapshot((QuerySnapshot) =>{
        let currentMessages = QuerySnapshot.data().messages
        currentMessages.forEach((current)=>{
        let date = current.createdAt.toDate()
        current.createdAt = date
      })
        this.setState({
          messages: currentMessages.reverse()
        })
      })
      return newMessages.messages
    }

    catch (error) {
      console.error(error)
    }
  }
  async componentDidMount() {
    try {
      let loadChat = await previousMessages(this.props.navigation.state.params.item.roomKey)
      loadChat.messages.reverse()
      loadChat.messages.forEach((current)=>{
        let date = current.createdAt.toDate()
        current.createdAt = date
      })
      this.setState({
        messages:loadChat.messages
      })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    console.log('props in chat', this.props)
    return (
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={this.state.user}
        />
    );
  }

  async onSend(messages) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)}))
    let user = this.props.userKey
    messages[0].author = user
    let messageObject = {
      _id:messages[0]._id,
      text:messages[0].text,
      user:{
        _id:user
      },
      createdAt:messages[0].createdAt
    }

    newMessage(this.props.navigation.state.params.item.roomKey,messageObject)
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
