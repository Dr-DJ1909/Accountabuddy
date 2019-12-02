import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import TasksDrawerBtn from '../tasks/TasksDrawerBtn';
//called task but general drawer button
import {TaskNavBtnView} from '../../styles';

class SocialHeader extends Component {
  render() {
    return (
      <TaskNavBtnView>
        <TasksDrawerBtn />
      </TaskNavBtnView>
    );
  }
}

export default SocialHeader;
