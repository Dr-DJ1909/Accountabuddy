import React, {Component} from 'react';
import {Image, Text, View, StyleSheet, AsyncStorage} from 'react-native';
import {
  ProfileWrapperView,
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
import TasksHeader from '../../components/tasks/TasksHeader';
import Profile from '../../components/social/Profile';
import UserFriends from '../social/UserFriends';

export default class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      userKey: '',
      friends: []
    };
  }
  async componentDidMount() {
    AsyncStorage.getItem('userKey');
    const friends = await getFriendList(userKey);
    Promise.all([friends, userKey]);
    console.log('what are friends', friends);
    this.setState({
      userKey: userKey,
      friends: friends
    });
  }
  render() {
    let {userKey, friends} = this.state;
    if (this.state.friends) {
      return (
        <View style={styles.container}>
          <TasksHeader></TasksHeader>

          <View style={styles.header}>
            <View style={styles.headerText}>
              <Image
                style={styles.icon}
                source={require('../../assets/catIcon.png')}
              />

              <Text style={styles.name}>User Name Here</Text>
              <Text style={styles.userInfo}>Email </Text>
              <Text style={styles.userInfo}>Test </Text>
            </View>
          </View>

          <View style={styles.content}>
            <View style={styles.item}>
              <View style={styles.iconContent}>
                <Image
                  style={styles.icon}
                  source={{uri: 'https://png.icons8.com/home/win8/50/ffffff'}}
                />
              </View>
              {/* <Profile /> */}
            </View>

            <View style={styles.item}>
              <View style={styles.iconContent}>
                <Image
                  style={styles.icon}
                  source={{
                    uri: 'https://png.icons8.com/settings/win8/50/ffffff'
                  }}
                />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.info}>Friends</Text>
              </View>
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
  header: {
    backgroundColor: '#644D78'
  },
  headerText: {
    padding: 20,
    alignItems: 'center'
  },
  icon: {
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
  userInfo: {
    fontSize: 16,
    color: '#778899',
    fontWeight: '600'
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
  iconContent: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 5
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
