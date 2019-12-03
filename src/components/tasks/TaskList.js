import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  PageWrapperView,
  HeaderText,
  HeaderTasksText,
  MessageTextLarge,
  MessageView,
  TopHeader,
  TopHeaderText,
  DividerHeader
} from '../../styles';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import TaskItem from '../../screens/tasks/TaskItem';
import {
  decreaseChoreHPThunk,
  increaseChoreHPThunk,
  decreaseExerciseHPThunk,
  increaseExerciseHPThunk,
  updateTaskThunk,
  deleteTaskThunk,
  failedTaskThunk
} from '../../store/user';
import TasksHeader from './TasksHeader';
import {Header} from 'react-navigation-stack';

class TaskList extends Component {
  constructor() {
    super();
    this.complete.bind(this);
    this.delete.bind(this);
    this.failed.bind(this);
  }
  complete(completedTask) {
    // this.props.updateTaskAction(CompletedTask)

    if (completedTask.category === 'Chores') {
      this.props.increaseChoreHPAction(completedTask);
    }
    if (completedTask.category === 'Exercise') {
      this.props.increaseExerciseHPAction(completedTask);
    }
  }
  delete(unwantedTask) {
    this.props.deleteTaskAction(unwantedTask);
  }
  failed(failedTask) {
    // this.props.failedTaskAction(failedTask)
    if (failedTask.category === 'Chores') {
      this.props.decreaseChoreHPAction(failedTask);
      return;
    }
    if (failedTask.category === 'Exercise') {
      this.props.decreaseExerciseHPAction(failedTask);
      return;
    }
  }

  render() {
    const tasksDisplay = (
      <FlatList
        style={{flex: 2, width: '100%'}}
        data={this.props.incompleteTasks}
        ItemSeparatorComponent={renderSeparator}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <TaskItem
              item={item}
              style={{flex: 1}}
              index={index}
              complete={() => {
                this.complete(item);
              }}
              delete={() => {
                this.delete(item);
              }}
              failed={() => {
                this.failed(item);
              }}
              addTask={this.addTask}
            />
          );
        }}
      />
    );

    const noTasksDisplay = (
      <MessageView>
        <MessageTextLarge>
          It looks like you have no tasks yet. Why not try adding one?
        </MessageTextLarge>
      </MessageView>
    );

    let display = this.props.incompleteTasks.length
      ? tasksDisplay
      : noTasksDisplay;
    return (
      <PageWrapperView>
        <TopHeader>
          <TopHeaderText>Current tasks</TopHeaderText>
          <TasksHeader />
        </TopHeader>
        <DividerHeader />
        {display}
      </PageWrapperView>
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
        marginBottom: '5%'
      }}
    />
  );
};

const mapStateToProps = function(state) {
  return {
    user: state.user.user,
    incompleteTasks: state.user.user.incompleteTasks
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    getUserAction: () => dispatch(getUserThunk()),
    // updateTaskAction:(task) => dispatch(updateTaskThunk(task)),
    deleteTaskAction: task => dispatch(deleteTaskThunk(task)),
    // failedTaskAction:(task) => dispatch(failedTaskThunk(task)),
    increaseChoreHPAction: task => dispatch(increaseChoreHPThunk(task)),
    decreaseChoreHPAction: task => dispatch(decreaseChoreHPThunk(task)),
    increaseExerciseHPAction: task => dispatch(increaseExerciseHPThunk(task)),
    decreaseExerciseHPAction: task => dispatch(decreaseExerciseHPThunk(task))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
