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
} from '../../styles';
import {newFriend, getFriendList} from '../../api/FriendsRoute';
import {getUsers} from '../../api/UserRoute';
import Icon from 'react-native-vector-icons/Feather';
import ListUsers from '../../components/social/UsersList';
import SafeAreaView from 'react-native-safe-area-view';
import Constants from 'expo-constants';
import TasksHeader from '../../components/tasks/TasksHeader';

class SearchUsers extends React.Component {
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
    Promise.all([users, friends, userKey]);

    console.log('what are friends', friends);
    this.setState({
      users: users,
      userKey: userKey,
      friends: friends
    });
    console.log('check', this.state.friends);
  }
  render() {
    let users = this.state.users;
    let friends = this.state.friends;
    newFriend(this.state.userKey, 'TvKvKUdwTrZfmLc5Xu7kkqlXZVC3');
    newFriend('TvKvKUdwTrZfmLc5Xu7kkqlXZVC3', this.state.userKey);
    newFriend('XeTqoqUIyBabuPw23ZKHJgufx4W2', this.state.userKey);
    newFriend(this.state.userKey, 'XeTqoqUIyBabuPw23ZKHJgufx4W2');
    if (this.state.users.length) {
      return (
        <SafeAreaView>
          <TasksHeader></TasksHeader>
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

export default SearchUsers;

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
