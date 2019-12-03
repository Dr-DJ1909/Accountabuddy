import React, {Component} from 'react';
import {Image, Text, View, StyleSheet, AsyncStorage} from 'react-native';
import {
  ProfileWrapperView,
  HeaderText,
  PetView,
  BubbleText,
  AbsolutePositionBubbleView,
  ProfileHeaderView
} from '../../styles';
import {newFriend, getFriendList} from '../../api/FriendsRoute';
import {getUsers, getUser} from '../../api/UserRoute';
import Icon from 'react-native-vector-icons/Feather';
import TasksHeader from '../../components/tasks/TasksHeader';
import Profile from '../../components/social/Profile';
import UserFriends from '../social/UserFriends';

export default class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      userKey: '',
      friends: []
    };
  }
  async componentDidMount() {
    let userKey = await AsyncStorage.getItem('userKey');
    const friends = await getFriendList(userKey);
    let user = await getUser(userKey);
    Promise.all([friends, userKey, user]);
    this.setState({
      userKey: userKey,
      user: user,
      friends: friends
    });
  }
  // let userKey = AsyncStorage.getItem('userKey');
  //   let friends = await getFriendList(userKey);
  //   let user = await getUser(userKey);
  //   Promise.all([friends, userKey, user]);
  //   this.setState({
  //     user: user,
  //     friends: friends
  //   });
  //   console.log('AAYY', this.state.user);
  render() {
    console.log('AAYY', this.state.user);
    console.log('YOO', this.state.userKey);
    let {userKey, friends} = this.state;
    if (this.state.userKey) {
      return (
        <View>
          <ProfileHeaderView>
            <View style={styles.headerText}>
              <Image
                style={styles.pic}
                source={require('../../assets/catIcon.png')}
              />

              <Text style={styles.name}>{this.state.user.email}</Text>
            </View>
          </ProfileHeaderView>

          <View style={styles.content}>
            <View style={styles.item}>
              <Profile user={this.state.user} userKey={this.state.userKey} />
            </View>
          </View>
        </View>
      );
    } else {
      return <View></View>;
    }
  }
}

const styles = StyleSheet.create({
  headerText: {
    padding: 20,
    alignItems: 'center'
  },
  pic: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10
  },
  name: {
    fontSize: 20,
    color: '#FFFAF0',
    fontWeight: '700'
  },
  content: {
    backgroundColor: '#D8C4E9',
    height: 600,
    alignItems: 'center'
  },
  item: {
    flexDirection: 'row'
  },
  infoContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 5
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: '#FFFFFF'
  }
});
