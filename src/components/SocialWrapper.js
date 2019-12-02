import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PageWrapperView, HeaderText} from '../styles';
import {
  StyleSheet,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  AsyncStorage,
  TextInput,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import {Container, Form, Input, Item, Label, Button} from 'native-base';
import {getUserThunk} from '../store/user';
// import {UserProfile, UserFriends, SearchUsers} from '../screens/social';
import UserProfile from '../screens/social/UserProfile';
import UserFriends from '../screens/social/UserFriends';
import SearchUsers from '../screens/social/SearchUsers';
import FriendRequests from '../screens/social/FriendRequests';
import {newFriend} from '../api/FriendsRoute';
import {createDrawerNavigator} from 'react-navigation-drawer';

const SocialWrapper = createDrawerNavigator(
  {
    FriendList: {
      screen: UserFriends,
      navigationOptions: {
        drawerLabel: 'Friend List'
      }
    },
    AddFriend: {
      screen: SearchUsers,
      navigationOptions: {
        drawerLabel: 'Add Friend'
      }
    },
    UserProfile: {
      screen: UserProfile,
      navigationOptions: {
        drawerLabel: 'About Me'
      }
    },
    FriendRequests: {
      screen: FriendRequests,
      navigationOptions: {
        drawerLabel: 'Pending friend requests'
      }
    }
  },
  {
    initialRouteName: 'UserProfile',
    drawerPosition: 'left'
    // // drawerWidth: WIDTH*0.83,
    // contentComponent: ({ navigation }) => {
    // 	return(<TasksDrawer navigation={navigation} />)}
  }
);

export default SocialWrapper;

// class SocialWrapper extends Component {
//   constructor() {
//     super();
//   }

//   async componentDidMount() {}

//   handleSubmit() {}

//   render() {
//     return (
//       <PageWrapperView>
//         <HeaderText>Social Page</HeaderText>
//         <UserProfile />
//       </PageWrapperView>
//     );
//   }
// }

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

// export default connect(mapStateToProps, mapDispatchToProps)(SocialWrapper);
