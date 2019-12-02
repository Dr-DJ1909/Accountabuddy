import React, {Component} from 'react';
import { connect } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat';
import { PageWrapperAlignTopView } from '../../styles';
import {newChat, newMessage} from '../../api/ChatRoute'


class Chat extends Component {
  // static navigationOptions = ({ navigation }) => ({
  //   title: (navigation.state.params || {}).name || 'Chat!'
  // });

  state = {
    messages: [],
    messagesArray:''
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

  render() {
    return (
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={this.props.user}
        />
    );
  }

  componentDidMount() {
    // login.refOn(message =>
    //   this.setState(previousState => ({
    //     messages: GiftedChat.append(previousState.messages, message)
    //   }))
    // );
  }
  componentWillUnmount() {
    // login.refOff();
  }

  async onSend(messages) {
    console.log('this is getting passed in', messages[0].text)
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
      messagesArray:[...this.state.messagesArray, messages[0].text]
    }))
    console.log('hello?', this.state.messagesArray)
    let user = this.props.userKey
    console.log('this is the user', this.props.userKey)
    const chatObject = {
      content:messages[0].text,
      author:user,
      timeCreated:Date()
    }
    console.log('chatobject to be passed',chatObject)
    newMessage(chatObject)
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
