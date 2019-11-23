import React, { Component } from 'react';
import { Image } from 'react-native';
import { HeaderText } from '../styles';
import Home from '../screens/Home';

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
      // ? <HeaderText>(ง •̀_•́)ง</HeaderText>
      // : <HeaderText>（‐＾▽＾‐）</HeaderText>;
      ? <Image
        source={require('../assets/img/cat/CatWave01.png')}
        style={{height: 300, width: 300}}
        />
      : <Image
        source={require('../assets/img/cat/CatWave02.png')}
        style={{height: 300, width: 300}}
        />
    return (
      <Home sprite={sprite}></Home>
    )
  }
}

export default HomeWrapper;
