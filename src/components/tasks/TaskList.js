import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
  PageWrapperView,
  HeaderText,
  HeaderTasksText,
  TaskWrapperView,
  HeaderWrapperView,
  LabelText,
  TaskView,
  MessageText
} from '../../styles';
import {
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import TaskItem from '../../screens/tasks/TaskItem';
import {decreaseChoreHPThunk,increaseChoreHPThunk,decreaseExerciseHPThunk,increaseExerciseHPThunk, updateTaskThunk, deleteTaskThunk, failedTaskThunk } from '../../store/user';
import TasksHeader from './TasksHeader';
import { Header } from 'react-navigation-stack';

class TaskList extends Component {
  constructor() {
    super();
    this.complete.bind(this);
    this.delete.bind(this);
    this.failed.bind(this)
  }
  complete(completedTask) {
    console.log('are you here?', completedTask);
    // this.props.updateTaskAction(CompletedTask)

    if(completedTask.category === 'Chores'){
      this.props.increaseChoreHPAction(completedTask)
    }
    if(completedTask.category === 'Exercise'){
      this.props.increaseExerciseHPAction(completedTask)
    }
  }
  delete(unwantedTask){
    console.log('unwantedTaskHere', unwantedTask)
    this.props.deleteTaskAction(unwantedTask)
  }
  failed(failedTask){
    console.log('failedTaskHere', failedTask)
    // this.props.failedTaskAction(failedTask)
    if(failedTask.category === 'Chores'){
      this.props.decreaseChoreHPAction(failedTask)
      return
    }
    if(failedTask.category === 'Exercise'){
      this.props.decreaseExerciseHPAction(failedTask)
      return
    }

  }

  render() {
    const tasksDisplay =
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
              complete={() =>{this.complete(item)}}
              delete = {() =>{this.delete(item)}}
              failed = {()=>{this.failed(item)}}
              addTask={this.addTask}
            />
          );
        }}
      />

    const noTasksDisplay =
    <MessageText>
      It looks like you have no tasks yet. Why not try adding one?
    </MessageText>

    let display = this.props.incompleteTasks.length ? tasksDisplay : noTasksDisplay;
    return (
      <PageWrapperView>
        <TasksHeader />
        <HeaderText>Current Tasks</HeaderText>
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
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    getUserAction: () => dispatch(getUserThunk()),
    // updateTaskAction:(task) => dispatch(updateTaskThunk(task)),
    deleteTaskAction:(task) => dispatch(deleteTaskThunk(task)),
    // failedTaskAction:(task) => dispatch(failedTaskThunk(task)),
    increaseChoreHPAction:(task) => dispatch(increaseChoreHPThunk(task)),
    decreaseChoreHPAction: (task) => dispatch(decreaseChoreHPThunk(task)),
    increaseExerciseHPAction:(task) =>dispatch(increaseExerciseHPThunk(task)),
    decreaseExerciseHPAction: (task) =>dispatch(decreaseExerciseHPThunk(task))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (TaskList);

