import React, { Component } from 'react';
import { Image } from 'react-native';
import { PageWrapperView, AbsolutePositionPetView, HeaderText, PetView, BubbleText, AbsolutePositionBubbleView, AddTaskBtnView } from '../styles';
import Icon from 'react-native-vector-icons/Feather';

class ExercisePet extends Component {
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
      ? <Image
        source={require('../assets/img/cat/CatSquat01.png')}
        style={{height: 300, width: 300}}
        />
      : <Image
        source={require('../assets/img/cat/CatSquat02.png')}
        style={{height: 300, width: 300}}
        />
    return (
      <PetView>
        <AbsolutePositionPetView>
          <AddTaskBtnView>
            {/* <Icon
              name='plus-circle'
              size={40}
              backgroundColor='#4472CA'
            /> */}
          </AddTaskBtnView>
        </AbsolutePositionPetView>
        {sprite}
      </PetView>
    );
  }
}

export default ExercisePet;
