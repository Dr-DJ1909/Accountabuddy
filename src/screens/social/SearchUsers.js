import {ListItem, SearchBar} from 'react-native-elements';
import React, {Component} from 'react';
import {
  Image,
  Text,
  View,
  FlatList,
  StyleSheet,
  AsyncStorage,
  Button
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
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      userKey: '',
      friends: [],
      value: ''
    };
    this.arrayholder = [];
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
    this.arrayholder = this.state.users;
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%'
        }}
      />
    );
  };
  searchFilterFunction = text => {
    this.setState({
      value: text
    });
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.email.toLowerCase()}`;
      const textData = text.toLowerCase();
      return itemData.includes(textData); // this will return true if our itemData contains the textData
    });
    console.log('filtered list>>>>>>>', newData);
    this.setState({
      users: newData
    });
    if (!newData.length) {
      this.setState({
        users: [{UserName: 'Sorry not found...'}]
      });
    }
  };
  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Search friend name..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };
  render() {
    let users = this.state.users;
    let friends = this.state.friends;
    newFriend(this.state.userKey, 'TvKvKUdwTrZfmLc5Xu7kkqlXZVC3');
    newFriend('TvKvKUdwTrZfmLc5Xu7kkqlXZVC3', this.state.userKey);
    newFriend('XeTqoqUIyBabuPw23ZKHJgufx4W2', this.state.userKey);
    newFriend(this.state.userKey, 'XeTqoqUIyBabuPw23ZKHJgufx4W2');
    if (this.state.users.length) {
      return (
        <View style={{flex: 1}}>
          <TasksHeader></TasksHeader>
          <FlatList
            extraData={this.state}
            data={this.state.users}
            renderItem={({item}) => (
              <ListItem
                // leftAvatar={{source: {uri: item.picture.thumbnail}}}
                title={item.email}
                subtitle={item.UserName}
                onPress={() => {
                  newFriend(this.state.userKey, item.uId);
                  newFriend(item.uId, this.state.userKey);
                }}
              />
            )}
            // keyExtractor={item => item.email}
            keyExtractor={(item, index) => `${index}`}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
          />
        </View>
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
    backgroundColor: '#F9C2FF',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 32
  }
});
