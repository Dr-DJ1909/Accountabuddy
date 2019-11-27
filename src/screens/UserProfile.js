import React, {Component} from 'react';
import {
  Image,
  Text,
  View,
  FlatList,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import {
  PageWrapperView,
  AbsolutePositionPetView,
  HeaderText,
  PetView,
  BubbleText,
  AbsolutePositionBubbleView,
  AddTaskBtnView
} from '../styles';
import {newFriend, getFriendList} from '../api/FriendsRoute';
import {getUsers} from '../api/UserRoute';
import Icon from 'react-native-vector-icons/Feather';
import ListUsers from '../components/UsersList';
import SafeAreaView from 'react-native-safe-area-view';
import Constants from 'expo-constants';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      userKey: '',
      friends: []
    };
  }
  async componentDidMount() {
    let users = await getUsers();
    const userKey = await AsyncStorage.getItem('userKey');
    const friends = await getFriendList(userKey);
    this.setState({users: users, userKey: userKey, friends: friends});
  }
  render() {
    let users = this.state.users;
    if (this.state.users.length) {
      return (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={users}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <ListUsers item={item} uId={this.state.userKey} />
            )}
          ></FlatList>
        </SafeAreaView>
      );
    } else {
      return <View></View>;
    }
  }
}

export default Profile;

//for testing view purposes
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 32
  }
});
