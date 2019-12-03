import React, {Component} from 'react';
import {
  TaskView,
  TaskText,
  TaskBtns,
  TaskBtnsRight
} from '../../styles';
import {
  Text,
  StyleSheet
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/Feather';

function TaskItem(props) {
  const swipeSettings = {
    autoClose: true,
    onClose: (secid, rowId, direction) => {},
    onOpen: (secId, rowId, direction) => {},
    left: [{onPress: () => {props.complete()}, text: `Done!`, type: 'primary'}],
    right: [{onPress: () => {props.failed()}, text: `Didn't get it done...`, type: 'delete'}],
    rowId: props.index,
    sectionId: 1,
    buttonWidth: 150
  };

  return (
    <Swipeout {...swipeSettings}>
      <TaskView>
        <TaskText>Task: {props.item.name}</TaskText>
        <TaskText>Category: {props.item.category}</TaskText>
        <TaskBtns>
          <Icon
            name='check-circle'
            size={25}
            onPress={() => props.complete()}
          />
          <Icon
            name='x-circle'
            size={25}
            onPress = {()=>{props.failed()}}
          />
        </TaskBtns>
        <TaskBtnsRight>
          <Icon
            name='trash-2'
            size={25}
            onPress={() => props.delete()}
          />
        </TaskBtnsRight>
      </TaskView>
    </Swipeout>
  );
}

export default TaskItem;
