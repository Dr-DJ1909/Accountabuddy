import React, { Component } from 'react';
import { PageWrapperView, HeaderText } from '../styles';

class HomeWrapper extends Component {
  constructor() {
    super();
    this.state = {
      on: true,
    }

    setInterval(() => {
      this.setState(previousState => {
        return {
          on: !previousState.on,
        };
      });
    }, 1200);
  }

  render() {

    let sprite = this.state.on
      ? <HeaderText>(ง •̀_•́)ง</HeaderText>
      : <HeaderText>（‐＾▽＾‐）</HeaderText>;
    return (
      <PageWrapperView>
        <HeaderText>This is the home page</HeaderText>
        {sprite}
      </PageWrapperView>
    )
  }
}

export default HomeWrapper;
