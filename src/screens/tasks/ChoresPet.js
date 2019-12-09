import React, { Component } from 'react';
import { Image } from 'react-native';
import { PageWrapperView, AbsolutePositionPetView, HeaderText, PetView, BubbleText, AbsolutePositionBubbleView, AddTaskBtnView, TopHeaderText, TopHeader } from '../../styles';

class ChoresPet extends Component {
  constructor() {
    super();
    this.state = {
      on: true,
    }

    this.intervalId = setInterval(() => {
      this.setState(previousState => {
        return {
          on: !previousState.on,
        };
      });
    }, 1200);
  }

  componentDidMount() {
    this.intervalId;
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    let sprite = this.state.on
      ? <Image
        source={require('../../assets/img/cat/CatClean01.png')}
        style={{height: 300, width: 300}}
        />
      : <Image
        source={require('../../assets/img/cat/CatClean02.png')}
        style={{height: 300, width: 300}}
        />
    return (
      <PetView>
        {sprite}
      </PetView>
    );
  }
}

export default ChoresPet;
