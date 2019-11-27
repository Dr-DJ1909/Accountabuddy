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
import { MessageText } from '../styles';

const TaskExercise = (props) => {
  const hp = props.hp;
  const user = props.user;
  let image;
  if (hp <=1 && hp >= 0.4) {
    image = <ExercisePet />;
  } else {
    image = <Text>(=ｘェｘ=)</Text>
  }

  let message;
  if (hp <= 1 && hp >= 0.7) {
    message = <MessageText>{user.pet.Name} is on fire!</MessageText>
  } else if (hp < 0.7 && hp >= 0.4) {
    message = <MessageText>{user.pet.Name} is pretty fired up!</MessageText>
  } else if (hp < 0.4 && hp >= 0) {
    message = <MessageText>{user.pet.Name} seems a little inactive...maybe doing a few tasks will help energize them?</MessageText>
  } else {
    message = <MessageText>{user.pet.Name} seems to have died... Hurry and complete a task to revive them!</MessageText>
  }

  return (
    <PageWrapperView>
      <TasksHeader />
      <HeaderText>Exercise stuff</HeaderText>
      {image}
      {message}
    </PageWrapperView>
  )
}

const mapStateToProps = function(state) {
  return {
    user: state.user.user,
    hp: state.user.user.pet.ExerciseHP
  }
}
export default connect(
  mapStateToProps,
  null)
  (TaskExercise);

