import React, {Component} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  AsyncStorage,
  Button
} from 'react-native';
import {
  ProfileWrapperView,
  HeaderText,
  PetView,
  BubbleText,
  AbsolutePositionBubbleView,
  ProfileHeaderView,
  ProfileView
} from '../../styles';
import {newFriend, getFriendList} from '../../api/FriendsRoute';
import {getUsers, getUser, updateBio} from '../../api/UserRoute';
import Icon from 'react-native-vector-icons/Feather';
import TasksHeader from '../../components/tasks/TasksHeader';
import Profile from '../../components/social/Profile';
import UserFriends from '../social/UserFriends';
import EditProfileInput from '../../components/social/EditProfileInput';

export default class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      bio: '',
      userKey: '',
      friends: [],
      showForm: 'false'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBioChange = this.handleBioChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  async componentDidMount() {
    let userKey = await AsyncStorage.getItem('userKey');
    const friends = await getFriendList(userKey);
    let user = await getUser(userKey);
    Promise.all([friends, userKey, user]);
    this.setState({
      userKey: userKey,
      user: user,
      friends: friends,
      bio: user.bio
    });
  }
  handleBioChange = event => {
    let bio = event.nativeEvent.text;
    this.setState({bio: bio});
    console.log('bio', this.state.bio);
  };
  async handleSubmit(evt) {
    evt.preventDefault();
    console.log('have this:', this.state.userKey, this.state.bio);
    await updateBio(this.state.userKey, this.state.bio);
    this.setState({bio: this.state.bio});
  }

  handleClick = event => {
    return this.setState({
      showForm: !this.state.showForm
    });
  };
  render() {
    console.log('AAYY', this.state.user);
    console.log('YOO', this.state.userKey);
    console.log('biooooo', this.state.bio);
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
              <View style={{flex: 1}}>
                <ProfileView>
                  <Text>About Me: {this.state.bio}</Text>
                </ProfileView>
                <Button title="Edit Bio" onPress={this.handleClick}></Button>
                {this.state.showForm ? (
                  <EditProfileInput
                    handleSubmit={this.handleSubmit}
                    handleBioChange={this.handleBioChange}
                    bio={this.state.bio}
                  />
                ) : null}
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
