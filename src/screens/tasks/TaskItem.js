import React, {Component} from 'react';
import {
  TaskView,
  TaskText,
  TaskBtns
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
    right: [{onPress: () => {props.delete()}, text: 'Delete', type: 'delete'}],
    rowId: props.index,
    sectionId: 1
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
      </TaskView>
    </Swipeout>
  );
}

export default TaskItem;
