import React, { Component } from 'react';
import { Image, TouchableOpacity, Text } from 'react-native';
import {
  PageWrapperView,
  AbsolutePositionPetView,
  HeaderText,
  PetView,
  BubbleText,
  AbsolutePositionBubbleView,
  AddTaskBtnView,
  DividerLarge,
  Divider
} from '../styles';
import Icon from 'react-native-vector-icons/Feather';

class HomePet extends Component {
  constructor() {
    super();
    this.state = {
      on: true,
      meow: false,
      count: 0
    };

    this.intervalId = setInterval(() => {
      this.setState(previousState => {
        return {
          on: !previousState.on
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
    let angerMeow = () => {
      if (this.state.count >= 10) {
        return <Text>STOP BEING DISTRACTED BY MY FLUFFINESS!</Text>;
      } else {
        return <Text></Text>;
      }
    };
    let meow = () => {
      if (this.state.meow === true) {
        return <Text>Meow</Text>;
      } else {
        return <Text></Text>;
      }
    };
    let sprite = this.state.on ? (
      <Image
        source={require('../assets/img/cat/CatWave01.png')}
        style={{ height: 300, width: 300 }}
      />
    ) : (
        <Image
          source={require('../assets/img/cat/CatWave02.png')}
          style={{ height: 300, width: 300 }}
        />
      );
    return (
      <PetView>
        <AbsolutePositionPetView>
          <Image
            source={require('../assets/img/vfx/ChatBubble01.png')}
            style={{ width: 300, height: 122 }}
          />
          <AbsolutePositionBubbleView>
            <BubbleText>"I'm doing great today! How about you?"</BubbleText>
          </AbsolutePositionBubbleView>
          <AddTaskBtnView>

          </AddTaskBtnView>
        </AbsolutePositionPetView>
        <DividerLarge />
        <DividerLarge />
        <DividerLarge />
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            if (this.state.count < 10) {
              this.setState({
                meow: !this.state.meow,
                count: this.state.count + 1
              });
            } else if (this.state.count >= 10) {
              this.setState({
                count: this.state.count + 1
              });
              if (this.state.count >= 20) {
                this.setState({
                  count: 0
                });
              }
            }
          }}
        >
          {sprite}
        </TouchableOpacity>
        {meow()}
        {angerMeow()}
      </PetView>
    );
  }
}

export default HomePet;
