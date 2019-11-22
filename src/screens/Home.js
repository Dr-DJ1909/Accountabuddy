import React, { Component } from 'react';
import { Image } from 'react-native';
import { PageWrapperView, AbsolutePositionPetView, HeaderText, PetView, BubbleText, AbsolutePositionBubbleView, AddTaskBtnView } from '../styles';
import Icon from 'react-native-vector-icons/Feather';

export default Home = (props) => {
  return (
    <PageWrapperView>
      {/* <HeaderText>This is the home page</HeaderText> */}
      <PetView>
        <AbsolutePositionPetView>
          <Image
            source={require('../assets/img/vfx/ChatBubble01.png')}
            style={{width: 300, height: 122}}
          />
          <AbsolutePositionBubbleView>
            <BubbleText>"I'm doing good today! How about you?</BubbleText>
          </AbsolutePositionBubbleView>
          <AddTaskBtnView>
            {/* <Icon
              name='plus-circle'
              size={40}
              backgroundColor='#4472CA'
            /> */}
          </AddTaskBtnView>
        </AbsolutePositionPetView>
        {props.sprite}
      </PetView>
    </PageWrapperView>
  );
}
