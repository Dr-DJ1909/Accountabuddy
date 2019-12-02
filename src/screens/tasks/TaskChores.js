import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from '../Home';
import { Text } from 'react-native';
import {
  PageWrapperView,
  HeaderText,
  HeaderTasksText,
  HeaderWrapperView,
  LabelText,
  TaskView
} from '../../styles';
import ExercisePet from './ExercisePet';
import TasksHeader from '../../components/tasks/TasksHeader';
import { MessageText } from '../../styles';

const TaskChores = (props) => {
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
    message = <MessageText>{user.pet.Name}'s room is sparkling clean!</MessageText>
  } else if (hp < 0.7 && hp >= 0.4) {
    message = <MessageText>{user.pet.Name}'s room looks pretty good!</MessageText>
  } else if (hp < 0.4 && hp >= 0) {
    message = <MessageText>{user.pet.Name}'s room ...maybe doing a few tasks will help freshen things up?</MessageText>
  } else {
    message = <MessageText>{user.pet.Name} seems to have died from the toxic fumes in their room... Hurry and complete a task to revive them!</MessageText>
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
    hp: state.user.user.pet.ChoresHP
  }
}
export default connect(
  mapStateToProps,
  null)
  (TaskChores);

