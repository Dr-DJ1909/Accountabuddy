import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TasksDrawerBtn from './TasksDrawerBtn';
import { TaskNavBtnView } from '../../styles';

class TasksHeader extends Component {
  render() {
    return (
      <TaskNavBtnView>
        <TasksDrawerBtn />
      </TaskNavBtnView>
    )
  }
}

export default TasksHeader;
