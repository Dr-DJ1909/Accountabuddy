import React, { Component } from 'react';
import {
  PageWrapperView,
  HeaderText,
  HeaderTasksText,
  TaskWrapperView,
  HeaderWrapperView,
  LabelText,
  TaskView,
} from '../styles';
import {
  Button,
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableHighlight,
  TouchableOpacity,
  Picker,
  FlatList,
  AsyncStorage,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { CheckBox } from 'native-base';
import { newTask } from '../api/TaskRoute';
import Swipeout from 'react-native-swipeout';

class TasksWrapper extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [
        { name: 'Do Laundry', category: 'Chores', completion: false },
        { name: 'Workout', category: 'Exercise', completion: false },
        { name: 'Call Mom', category: 'Social', completion: false },
      ],
    };
    this.complete.bind(this);
  }
  complete() {
    // this.setState({ completion: true })
    console.log('hi');
  }
  render() {
    return (
      <TaskWrapperView>
        <ScrollView>
          <HeaderWrapperView>
            <HeaderTasksText>My Tasks</HeaderTasksText>
          </HeaderWrapperView>
          <FlatList
            style={{ flex: 2, width: '100%' }}
            data={this.state.tasks}
            ItemSeparatorComponent={renderSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <TaskItem
                  item={item}
                  style={{ flex: 1 }}
                  index={index}
                  complete={this.complete}
                  addTask={this.addTask}
                />
              );
            }}
          ></FlatList>
          <AddTask />
        </ScrollView>
      </TaskWrapperView>
    );
  }
}

renderSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: '86%',
        backgroundColor: '#CED0CE',
        marginLeft: '14%',
        marginBottom: '5%',
      }}
    />
  );
};

function TaskItem(props) {
  const swipeSettings = {
    autoClose: true,
    onClose: (secid, rowId, direction) => {},
    onOpen: (secId, rowId, direction) => {},
    right: [{ onPress: () => {}, text: 'Delete', type: 'delete' }],
    rowId: props.index,
    sectionId: 1,
  };
  return (
    <Swipeout {...swipeSettings}>
      <TaskView>
        <Text style={styles.taskText}> Task: {props.item.name}</Text>
        <Text style={styles.taskText}>Category: {props.item.category}</Text>
        <CheckBox checked={false} onPress={() => props.complete()} />
      </TaskView>
    </Swipeout>
  );
}

class AddTask extends Component {
  constructor() {
    super();
    this.state = { name: '', category: '', completion: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async handleSubmit(evt) {
    evt.preventDefault();
    const userKey = await AsyncStorage.getItem('loggedinUser');
    console.log('USER KEY', userKey);
    newTask(userKey, this.state);
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
  render() {
    console.log(this.state);
    return (
      <KeyboardAvoidingView style={styles.formView}>
        <Text style={styles.subheadText}>New Task</Text>
        <LabelText>Describe Task</LabelText>
        <TextInput
          placeholder="Task Name"
          placeholderColor="#c4c3cb"
          style={styles.textInput}
          onChange={this.handleNameChange}
        />
        <LabelText>Choose Category: </LabelText>
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
          onPress={this.handleSubmit}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableHighlight>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
  },
  subheadText: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '800',
    textAlign: 'center',
  },
  formView: {
    flex: 1,
  },
  textInput: {
    height: 50,
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
    alignSelf: 'center',
  },
  button: {
    height: 30,
    flexDirection: 'row',
    backgroundColor: '#2DD1B0',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    justifyContent: 'center',
  },
  addTaskButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 90,
    backgroundColor: 'yellow',
    width: 90,
    height: 90,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  buttonText: {
    fontSize: 24,
    color: '#111',
  },
  taskText: {
    fontSize: 20,
    fontFamily: 'Helvetica',
  },
});

export default TasksWrapper;
