import React, {Component} from 'react';
import {
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
  HeaderText
} from '../../styles';
import {ListItem} from 'react-native-elements';
import {newFriend, getFriendList} from '../../api/FriendsRoute';
import {getUsers, updateBio} from '../../api/UserRoute';
import Icon from 'react-native-vector-icons/Feather';
import TasksHeader from '../../components/tasks/TasksHeader';
import {ScrollView} from 'react-native-gesture-handler';
import EditProfileInput from '../social/EditProfileInput';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      bio: '',
      userKey: '',
      showForm: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBioChange = this.handleBioChange.bind(this);
  }
  async componentDidMount() {
    const userKey = await AsyncStorage.getItem('userKey');
    const friends = await getFriendList(userKey);
    const user = await getUser(userKey);
    Promise.all([friends, userKey, user]);
    this.setState({
      user: '',
      friends: friends,
      userKey: userKey
    });
    console.log('checkerr', this.state);
  }
  handleBioChange = event => {
    let bio = event.nativeEvent.text;
    this.setState({bio: bio});
    console.log('bio', this.state.bio);
  };
  async handleSubmit(evt) {
    evt.preventDefault();
    console.log('have this:', this.state.userKey, this.state.bio);
    await updateBio(this.props.userKey, this.state.bio);
  }

  handleClick = event => {
    return this.setState({
      showForm: !this.state.showForm
    });
  };

  render() {
    if (this.state) {
      return (
        <View style={{flex: 1}}>
          <Button title="Edit Bio" onPress={this.handleClick}></Button>
          {this.state.showForm ? (
            <EditProfileInput
              handleSubmit={this.handleSubmit}
              handleBioChange={this.handleBioChange}
              bio={this.state.bio}
            />
          ) : null}
          <View>
            <Text>About Me: {this.props.user.bio}</Text>
          </View>
        </View>
      );
    } else {
      return <View></View>;
    }
  }
}
export default Profile;
