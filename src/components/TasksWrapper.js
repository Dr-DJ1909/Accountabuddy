import React, { Component } from 'react';
import { PageWrapperView, HeaderText } from '../styles';

class TasksWrapper extends Component {
  render() {
    return (
      <PageWrapperView>
        <HeaderText>This is the tasks page</HeaderText>
      </PageWrapperView>
    )
  }
}

export default TasksWrapper;
