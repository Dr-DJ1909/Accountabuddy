import React, { Component } from 'react';
import { PageWrapperView, HeaderText, TaskWrapperView } from '../styles';
import {
  Button,
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableHighlight,
  Picker,
  FlatList,
  Row,
} from 'react-native';

class TasksWrapper extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [{ name: 'Do Laundry', category: 'Chores' }],
    };
  }
  addTask = task => {
    this.setState({ tasks: this.state.push(task) });
  }; // this function will be modified as we figure out how to keep track of state.
  render() {
    return (
      <TaskWrapperView>
        {/* <Text style={{ flex: 1 }}>Task List</Text>
        <FlatList
          style={{ width: '100%', height: '50%', alignSelf: 'center' }}
          data={this.state.tasks}
          keyExtractor={item => item._id}
          renderItem={({ item: task }) => <Text>{task.name}</Text>}
        /> */}
        <AddTask />
      </TaskWrapperView>
    );
  }
}

class AddTask extends Component {
  constructor() {
    super();
    this.state = { name: '', category: '', completion: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(evt) {
    evt.preventDefault();
    this.props.addTask(this.state); //add task thunk would go here
  }
  addCategory = category => {
    this.setState({ category });
  };
  handleNameChange = event => {
    let name = event.nativeEvent.text;
    this.setState({
      name: name,
    });
  };
  handleSubmit(evt) {
    evt.preventDefault();
    this.props.addTask(this.state);
  }
  render() {
    console.log(this.state);
    return (
      <KeyboardAvoidingView style={styles.formView}>
        <Text>Describe Task</Text>
        <Text style={styles.logoText}>New Task</Text>
        <TextInput
          placeholder="Task Name"
          placeholderColor="#c4c3cb"
          style={styles.textInput}
          onChange={this.handleNameChange}
        />
        <Picker
          selectedValue={this.state.category}
          onValueChange={this.addCategory}
        >
          <Picker.Item label="Exercise" value="Exercise" />
          <Picker.Item label="Chores" value="Chores" />
          <Picker.Item label="Social" value="Social" />
        </Picker>
        <TouchableHighlight
          style={styles.button}
          underlayColor="white"
          // onPress={this.props.addTask(this.state)}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableHighlight>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  // container: {
  // //   flex: 1,
  // //   backgroundColor: '#fff',
  // //   justifyContent: 'center',
  // //   padding: 10,
  // // },
  logoText: {
    fontSize: 40,
    fontWeight: '800',
    marginTop: 150,
    marginBottom: 30,
    textAlign: 'center',
  },
  formView: {
    flex: 1,
  },
  textInput: {
    height: 60,
    fontSize: 14,
    borderRadius: 10,
    borderWidth: 5,
    padding: 10,
    borderColor: '#AAE56B',
    backgroundColor: '#fafafa',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
    width: 400,
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#2DD1B0',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#111',
    alignSelf: 'center',
    borderRadius: 5,
  },
  taskRow: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default TasksWrapper;
/*
Create individual task components

*/
