import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  PageWrapperView,
  HeaderText,
  HeaderTasksText,
  TaskWrapperView,
  HeaderWrapperView,
  LabelText,
  View,
  Text
} from '../../styles';
import {AsyncStorage} from 'react-native';
import EditProfileInput from '../social/EditProfileInput';
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      bio: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBioChange = this.handleBioChange.bind(this);
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    await method;
  }

  handleBioChange = event => {
    let bio = event.nativeEvent.text;
    this.setState({bio: bio});
  };

  render() {
    return (
      <View>
        <Text>About Me:</Text>
        <EditProfileInput
          handleSubmit={this.handleSubmit}
          handleBioChange={this.handleBioChange}
          bio={this.state.bio}
        />
      </View>
    );
  }
}

export default Profile;
