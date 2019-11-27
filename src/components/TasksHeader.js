import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TasksDrawerBtn from './TasksDrawerBtn';

class TasksHeader extends Component {
  render() {
    return (
      <View style={styles.header}>
        <TasksDrawerBtn />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    backgroundColor: 'whitesmoke'
  }
});

export default TasksHeader;
