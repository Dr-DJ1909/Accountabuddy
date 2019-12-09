import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from '../Home';
import { Dimensions } from 'react-native';
import {
  PageWrapperView,
  HeaderText,
  Divider,
  TopHeader,
  TopHeaderText,
  MessageView
} from '../../styles';
import ExercisePet from './ExercisePet';
import TasksHeader from '../../components/tasks/TasksHeader';
import { MessageText } from '../../styles';
import DeadPet from '../DeadPet';
import ProgressBarAnimated from 'react-native-progress-bar-animated';

const TaskExercise = (props) => {
  const hp = props.hp;
  const user = props.user;
  let image;
  if (hp <=1 && hp >= 0.4) {
    image = <ExercisePet />;
  } else {
    image = (<DeadPet />)
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
      <TopHeader>
        <TopHeaderText>Exercise Progress</TopHeaderText>
        <TasksHeader />
      </TopHeader>
      <MessageText>{user.pet.Name}'s health:</MessageText>
      <ProgressBarAnimated
        width={200}
        value={hp * 100}
        maxValue={100}
        backgroundColor='#48EFBF'
      />
      <Divider /><Divider />
      {image}
      <Divider />
      <MessageView>
        {message}
      </MessageView>
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

