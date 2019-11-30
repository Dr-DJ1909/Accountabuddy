import React, {Component} from 'react';
import {Text, View, FlatList, StyleSheet, AsyncStorage} from 'react-native';
import {
  PageWrapperView,
  AbsolutePositionPetView,
  HeaderText
} from '../../styles';
import {ListItem} from 'react-native-elements';
import {newFriend, getFriendList} from '../../api/FriendsRoute';
import {getUsers} from '../../api/UserRoute';
import Icon from 'react-native-vector-icons/Feather';
import ListUsers from '../../components/social/UsersList';
import TasksHeader from '../../components/tasks/TasksHeader';
import {ScrollView} from 'react-native-gesture-handler';

class UserFriends extends React.Component {
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

    console.log('what are friends', this.state.users);
    this.setState({
      users: users,
      userKey: userKey,
      friends: friends
    });
    console.log('check', this.state.users);
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
        <View style={{flex: 1}}>
          <TasksHeader></TasksHeader>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text style={styles.name}>John Doe</Text>
          <FlatList
            data={this.state.data}
            renderItem={({item}) => (
              <ListItem
                roundAvatar
                title={`${item.name.first} ${item.name.last}`}
                subtitle={item.email}
                avatar={{uri: item.picture.thumbnail}}
                containerStyle={{borderBottomWidth: 0}}
              />
            )}
            keyExtractor={item => item.email}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
          />
        </View>
        </View>
      )
    }
  }
}

export default UserFriends;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#20B2AA'
  },
  headerContent: {
    padding: 30,
    alignItems: 'center'
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    marginBottom: 10
  },
  image: {
    width: 60,
    height: 60
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600'
  },
  body: {
    padding: 30,
    backgroundColor: '#E6E6FA'
  },
  box: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2
    },
    elevation: 2
  },
  username: {
    color: '#20B2AA',
    fontSize: 22,
    alignSelf: 'center',
    marginLeft: 10
  }
});
