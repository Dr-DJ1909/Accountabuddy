import React, { Component } from 'react';
import { PageWrapperView, HeaderText } from '../styles';

class HomeWrapper extends Component {
  render() {
    return (
      <PageWrapperView>
        <HeaderText>This is the home page</HeaderText>
      </PageWrapperView>
    )
  }
}

export default HomeWrapper;
