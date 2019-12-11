import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  PageWrapperAlignTopViewLight,
  HeaderText,
  TopHeaderText,
  TopHeader
} from '../../styles';
import {
  StyleSheet,
  Button,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  AsyncStorage
} from 'react-native';
import {BlueButtonWidth, ButtonText} from '../../styles';
import {getUserThunk} from '../../store/user';
import UserProfile from '../../screens/social/UserProfile';
import {newFriend} from '../../api/FriendsRoute';
import Chat from './Chat';

class SocialHome extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <PageWrapperAlignTopViewLight>
        <TopHeader>
          <TopHeaderText>Social</TopHeaderText>
        </TopHeader>
        <View style={{marginVertical: 50}}>
          <BlueButtonWidth
            onPress={() => this.props.navigation.navigate('UserProfile')}
          >
            <ButtonText>My Profile</ButtonText>
          </BlueButtonWidth>
          <BlueButtonWidth
            onPress={() => this.props.navigation.navigate('FriendList')}
          >
            <ButtonText>Friends List</ButtonText>
          </BlueButtonWidth>
          <BlueButtonWidth
            onPress={() => this.props.navigation.navigate('AddFriend')}
          >
            <ButtonText>Add friend</ButtonText>
          </BlueButtonWidth>

          <BlueButtonWidth
            onPress={() => this.props.navigation.navigate('FriendRequests')}
          >
            <ButtonText>Friend Requests</ButtonText>
          </BlueButtonWidth>
        </View>
      </PageWrapperAlignTopViewLight>
    );
  }
}

export default SocialHome;
// const mapStateToProps = function(state) {
//   return {
//     user: state.user
//   };
// };

// const mapDispatchToProps = function(dispatch) {
//   return {
//     getUserAction: () => dispatch(getUserThunk())
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(SocialHome);
