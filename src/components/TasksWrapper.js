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
  Button,
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView
} from 'react-native';
import {CheckBox} from 'native-base';
import {newTask} from '../api/TaskRoute';
import Swipeout from 'react-native-swipeout';
import AddTask from './AddTask';
import TaskList from '../screens/TaskList';

class TasksWrapper extends Component {
  render() {
    return (
      <TaskWrapperView>
        <ScrollView>
          <HeaderWrapperView>
            <HeaderTasksText>My Tasks</HeaderTasksText>
          </HeaderWrapperView>
          <TaskList />
          <AddTask />
        </ScrollView>
      </TaskWrapperView>
    );
  }
}

// renderSeparator = () => {
//   return (
//     <View
//       style={{
//         height: 1,
//         width: '86%',
//         backgroundColor: '#CED0CE',
//         marginLeft: '14%',
//         marginBottom: '5%'
//       }}
//     />
//   );
// };

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20
  },
  subheadText: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '800',
    textAlign: 'center'
  },
  formView: {
    flex: 1
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
    alignSelf: 'center'
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
    justifyContent: 'center'
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
    elevation: 8
  },
  buttonText: {
    fontSize: 24,
    color: '#111'
  },
  taskText: {
    fontSize: 20,
    // fontFamily: 'Helvetica'
  }
});

export default TasksWrapper;
