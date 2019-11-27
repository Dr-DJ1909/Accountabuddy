import React, {Component} from 'react';
import {
  PageWrapperView,
  HeaderText,
  HeaderTasksText,
  TaskWrapperView,
  HeaderWrapperView,
  LabelText,
  TaskView,
  TaskText
} from '../../styles';
import {
  Text,
  StyleSheet
} from 'react-native';
import {CheckBox} from 'native-base';
import Swipeout from 'react-native-swipeout';

function TaskItem(props) {
  const swipeSettings = {
    autoClose: true,
    onClose: (secid, rowId, direction) => {},
    onOpen: (secId, rowId, direction) => {},
    right: [{onPress: () => {props.delete()}, text: 'Delete', type: 'delete'}],
    rowId: props.index,
    sectionId: 1
  };

  return (
    <Swipeout {...swipeSettings}>
      <TaskView>
        <TaskText>Task: {props.item.name}</TaskText>
        <TaskText>Category: {props.item.category}</TaskText>
      </TaskView>
    </Swipeout>
  );
}

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

export default TaskItem;
