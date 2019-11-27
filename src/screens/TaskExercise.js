import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from '../screens/Home';
import { Text } from 'react-native';
import {
  PageWrapperView,
  HeaderText,
  HeaderTasksText,
  HeaderWrapperView,
  LabelText,
  TaskView
} from '../styles';
import ExercisePet from './ExercisePet';
import TasksHeader from '../components/TasksHeader';

const TaskExercise = (props) => {
  return (
    <PageWrapperView>
      <TasksHeader />
      <HeaderText>Exercise stuff</HeaderText>
      <ExercisePet />
    </PageWrapperView>
  )
}

const mapStateToProps = function(state) {
  return {
    user: state.user.user
  }
}
export default connect(
  mapStateToProps,
  null)
  (TaskExercise);

