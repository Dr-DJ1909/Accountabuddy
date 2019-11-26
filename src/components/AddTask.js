import React, {Component} from 'react';
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
import {newTask} from '../api/TaskRoute';
import AddTaskInput from '../screens/AddTaskInput';

class AddTask extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      category: 'Exercise',
      completion: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    const userKey = await AsyncStorage.getItem('userKey');
    console.log('USER KEY', userKey);
    newTask(userKey, this.state);
  }

  handleCategoryChange = category => {
    this.setState({ category: category });
  };

  handleNameChange = event => {
    let name = event.nativeEvent.text;
    this.setState({ name: name });
  };

  render() {
    console.log('state in addtask >>>>', this.state);
    return (
      <AddTaskInput
        handleSubmit={this.handleSubmit}
        handleCategoryChange={this.handleCategoryChange}
        handleNameChange={this.handleNameChange}
        category={this.state.category}
      />
    );
  }
}

export default AddTask;
