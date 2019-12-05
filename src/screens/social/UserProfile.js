import React, {Component} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  AsyncStorage,
  Button
} from 'react-native';
import {ProfileHeaderView, ProfileView} from '../../styles';
import {getFriendList} from '../../api/FriendsRoute';
import {getUser, updateBio} from '../../api/UserRoute';
import EditProfileInput from '../../components/social/EditProfileInput';
import ImageUpload from '../../components/social/ImageUpload';

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
  displayBadge = () => {
    let badges = [];
    const gymBadge = (
      <Image
        style={styles.badge}
        key={'gymBadge'}
        source={require('../../assets/img/badges/Badge_Gym.png')}
      />
    );
    const choresBadge = (
      <Image
        style={styles.badge}
        key={'choresBadge'}
        source={require('../../assets/img/badges/Badge_Chore.png')}
      />
    );
    const socialBadge = (
      <Image
        style={styles.badge}
        key={'socialBadge'}
        source={require('../../assets/img/badges/Badge_Social.png')}
      />
    );

    this.state.user.completedTasks.forEach(task => {
      if (task.category === 'Exercise' && !badges.includes(gymBadge)) {
        badges.push(gymBadge);
      }
      if (task.category === 'Chores' && !badges.includes(choresBadge)) {
        badges.push(choresBadge);
      }
      if (task.category === 'Social' && !badges.includes(socialBadge)) {
        badges.push(socialBadge);
      }
    });

    return badges.map(badge => badge);
  };
  render() {
    console.log('user obj', this.state.user);
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

              <Text style={styles.name}>{this.state.user.UserName}</Text>
            </View>
          </ProfileHeaderView>

          <View style={styles.content}>
            <View style={styles.item}>
              <View style={{flex: 1}}>
                <ProfileView>
                  <Text>About Me: {this.state.bio}</Text>
                </ProfileView>

                <View style={{flexDirection: 'row'}}>
                  {this.displayBadge()}
                </View>

                <Button
                  title="Edit Profile"
                  onPress={this.handleClick}
                ></Button>
                {this.state.showForm ? (
                  // <EditProfileInput
                  //   handleSubmit={this.handleSubmit}
                  //   handleBioChange={this.handleBioChange}
                  //   bio={this.state.bio}
                  // />
                  <ImageUpload props={this.state.user} />
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
  },
  badge: {
    width: 100,
    height: 100
  }
});
