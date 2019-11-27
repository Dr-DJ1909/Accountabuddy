import React, {Component} from 'react';
import { connect } from 'react-redux';
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
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import TaskItem from './TaskItem';
import { updateTaskThunk } from '../store/user';
import TasksHeader from './TasksHeader';

class TaskListCompleted extends Component {
  constructor() {
    super();
    this.delete.bind(this)
  }

  delete(unwantedTask){
    console.log('unwantedTaskHere', unwantedTask)
  }

  render() {
    return (
      <PageWrapperView>
        <TasksHeader />
        <HeaderText>Task History</HeaderText>
        <FlatList
          style={{flex: 2, width: '100%'}}
          data={this.props.completedTasks}
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
                addTask={this.addTask}
              />
            );
          }}
        />
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
    completedTasks: state.user.user.completedTasks
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    updateTaskAction:(task) => dispatch(updateTaskThunk(task)),
    deleteTaskAction:(task) => dispatch(deleteTaskThunk(task))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (TaskListCompleted);

