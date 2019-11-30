import React, {Component} from 'react';
import { connect } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat';
import { PageWrapperAlignTopView } from '../../styles';

class Chat extends Component {
  // static navigationOptions = ({ navigation }) => ({
  //   title: (navigation.state.params || {}).name || 'Chat!'
  // });

  // state = {
  //   messages: []
  // };

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
    console.log('chat is loading');
    return (
      // <PageWrapperAlignTopView>
        <GiftedChat
          // messages={this.state.messages}
          // onSend={firebaseSDK.send}
          // user={this.user}
        />
      // </PageWrapperAlignTopView>
    );
  }

  // componentDidMount() {
  //   firebaseSDK.refOn(message =>
  //     this.setState(previousState => ({
  //       messages: GiftedChat.append(previousState.messages, message)
  //     }))
  //   );
  // }
  // componentWillUnmount() {
  //   firebaseSDK.refOff();
  // }
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
