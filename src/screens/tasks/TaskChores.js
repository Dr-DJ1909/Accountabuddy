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
  TaskView,
  Divider,
  TopHeader,
  TopHeaderText,
  MessageView
} from '../../styles';
import ChoresPet from './ChoresPet';
import DeadPet from '../DeadPet'
import TasksHeader from '../../components/tasks/TasksHeader';
import { MessageText } from '../../styles';
import ProgressBarAnimated from 'react-native-progress-bar-animated';

const TaskChores = (props) => {
  const hp = props.hp;
  const user = props.user;
  let image;
  if (hp <=1 && hp >= 0.4) {
    image = <ChoresPet />;
  } else {
    image = <DeadPet />
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
    <TopHeader>
      <TopHeaderText>Chores</TopHeaderText>
      <TasksHeader />
    </TopHeader>
      <MessageText>{user.pet.Name}'s health:</MessageText>
      <ProgressBarAnimated
        width={200}
        value={props.hp * 100}
        maxValue={100}
      />
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
    hp: state.user.user.pet.ChoresHP
  }
}
export default connect(
  mapStateToProps,
  null)
  (TaskChores);

