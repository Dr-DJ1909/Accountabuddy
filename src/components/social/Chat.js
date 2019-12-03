import React, {Component} from 'react';
import { connect } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat';
import { PageWrapperAlignTopView } from '../../styles';
import {newChat, newMessage, previousMessages} from '../../api/ChatRoute'
import firebase from 'firebase';
//import {QuerySnapshot} from '@firebase/firestore-types';



class Chat extends Component {
  // static navigationOptions = ({ navigation }) => ({
  //   title: (navigation.state.params || {}).name || 'Chat!'
  // });
  constructor() {
    super();
    this.state = {
      chatUpdated: false,
      messages: [],
    };
    this.getNewMessages();
  }

  // get user() {
  //   return {
  //     name: this.props.navigation.state.params.name,
  //     email: this.props.navigation.state.params.email,
  //     avatar: this.props.navigation.state.params.avatar,
  //     id: firebaseSDK.uid,
  //     _id: firebaseSDK.uid
  //   };
  // }

  // changeState() {
  //   console.log(this.state)
  //   this.setState({chatUpdated: !chatUpdated})
  // }

  getNewMessages = async () => {
    let newMessages = []
    // this.setState({chatUpdated: !this.state.chatUpdated})
    try {
     const message =  await firebase
      .firestore()
      .collection('Chat')
      .doc('R9jeX5rLvaRDeUF0rf1R')

      message.onSnapshot((QuerySnapshot) =>{
        let currentMessages = QuerySnapshot.data().messages
        console.log("START OF SNAPSHOT>>>>>>>>>",QuerySnapshot.data())
        this.setState({
          messages: currentMessages
        })

        // if(currentMessages.length){
        //   QuerySnapshot.data().messages.forEach((current, idx, arr) =>{
        //     // newMessages.push(current)
        //     // if (idx === arr.length-1) {
        //       const updatedMessages = [...this.state.messages, current]
        //       this.setState({messages: updatedMessages})
        //     // }
        //   })
        //   console.log('can set state??????????????')
          // this.setState({
          //   messages: currentMessages
          // })
        // }
        // console.log('NEWMESSSAGESDDDSDFGDSGDF',newMessages)
        // this.setState({chatUpdated: !this.state.chatUpdated})

      })
      // console.log('NEWMESSSAGESDDDSDFGDSGDF',newMessages)
      console.log('newMessages >>>>>>>>>>>>>>>', newMessages)
      return newMessages.messages
    }

    catch (error) {
      console.error(error)
    }
  }
  async componentDidMount() {
    // let updatedMessages = await getNewMessages()

    // updatedMessages.messages.reverse()
    // console.log('MESSAGES TO CONCAT',updatedMessages.messages)
    try {
      let loadChat = await previousMessages()
      loadChat.messages.reverse()
      loadChat.messages.forEach((current)=>{
        let date = current.createdAt.toDate()
        current.createdAt = date
      })
      this.setState({
        messages:loadChat.messages
      })
      //  console.log('getNewMessages >>>>', await this.getNewMessages())
      // if(newMessages.length){
      //   const newMessages = [...this.state.messages, ...updatedMessages.messages]
      //   this.setState({
      //     messages:newMessages
      //   })
      //   console.log('this.state.messagesthis.state.messagesthis.state.messagesthis.state.messages',this.state.messages)
      // }
      // else{
      //   this.setState({
      //   messages:loadChat.messages
      // })
      // }
      // let messagesToAppend = await this.getNewMessages();
      // console.log('messagestoappend on first load >>>>>>>>>>>>>>>>>>>>>>>>>>>', messagesToAppend)
      // if (messagesToAppend.length) {
      //   // messagesToAppend.messages.reverse();
      //   console.log('messagestoappend >>>>>>>', messagesToAppend)
      //   if (messagesToAppend.messages.length) {
      //     this.setState({
      //       messages: messagesToAppend.messages
      //     })
      //   }
      // } else {
      //   this.setState({
      //   messages:loadChat.messages
      //   })
      // }
    } catch (error) {
      console.error(error)
    }
    // login.refOn(message =>
    //   this.setState(previousState => ({
    //     messages: GiftedChat.append(previousState.messages, message)
    //   }))
    // );
  }

  // async componentWillUpdate() {
  //   console.log('component will update!!!!!!!!')
  //   try {
  //     let messagesToAppend = await this.getNewMessages();
  //     console.log('messagestoappend on first load >>>>>>>>>>>>>>>>>>>>>>>>>>>', messagesToAppend)
  //     if (messagesToAppend.length) {
  //       // messagesToAppend.messages.reverse();
  //       console.log('messagestoappend >>>>>>>', messagesToAppend)
  //       if (messagesToAppend.messages.length) {
  //         this.setState({
  //           messages: messagesToAppend.messages
  //         })
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  render() {
    console.log('current state? >>>>', this.state.messages)
    // let currMessages =(this.getNewMessages().length) ? this.getNewMessages() : this.state.messages
    return (
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={this.props.user}
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
      author:user,
      createdAt:messages[0].createdAt
    }

    newMessage(messageObject)

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
