import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
  PageWrapperView,
  HeaderText,
  HeaderTasksText,
  TaskWrapperView,
  HeaderWrapperView,
  LabelText,
  TaskView
} from '../styles';
import {
  AsyncStorage
} from 'react-native';
import SettingsInfoInput from '../screens/SettingsInfoInput';
import {updateInfoThunk} from '../store/user';

class SettingsInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      petName: this.props.user.pet.Name,
      username: this.props.user.UserName,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePetNameChange = this.handlePetNameChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }

  async handleSubmit(evt) {
    console.log('state in SettingsInfo >>>>>>', this.state)
    // const { navigate } = this.props.navigation;
    evt.preventDefault();
    // const userKey = await AsyncStorage.getItem('userKey');
    // console.log('name changes in SettingsInfo', this.state)
    // await newTask(userKey, this.state);
    this.props.updateInfoDispatcher(this.state.username, this.state.petName);
    // this.setState({ petName: '', category: 'Exercise' });
    navigate('Home');
  }

  handlePetNameChange = event => {
    let name = event.nativeEvent.text;
    // console.log(name)
    this.setState({ petName: name });
  };

  handleUsernameChange = event => {
    let name = event.nativeEvent.text;
    this.setState({ username: name });
  };

  render() {
    return (
      <PageWrapperView>
          <SettingsInfoInput
            handleSubmit={this.handleSubmit}
            handleUsernameChange={this.handleUsernameChange}
            handlePetNameChange={this.handlePetNameChange}
            username={this.state.username}
            petName={this.state.petName}
          />
      </PageWrapperView>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    user: state.user.user
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    updateInfoDispatcher: (username, petName) => dispatch(updateInfoThunk(username, petName))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (SettingsInfo);
