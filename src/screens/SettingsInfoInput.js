import React, {Component} from 'react';
import {
  PageWrapperKeyboardAvoidingView,
  HeaderText,
  HeaderTasksText,
  TaskWrapperView,
  HeaderWrapperView,
  LabelText,
  TextInput,
  BlueButton,
  ButtonText,
  Divider
} from '../styles';
import {
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableHighlight,
  Picker,
  AsyncStorage
} from 'react-native';

export default function SettingsInfoInput(props) {
  return (
    <PageWrapperKeyboardAvoidingView>
      <HeaderText>Update Info</HeaderText>
      <Divider /><Divider />
      <LabelText>Change your username:</LabelText>
      <TextInput
        placeholder={props.username}
        placeholderColor="#c4c3cb"
        onChange={props.handleUsernameChange}
        defaultValue={props.username}
      />

      <LabelText>Change your pet's name:</LabelText>
      <TextInput
        placeholder={props.petName}
        placeholderColor="#c4c3cb"
        onChange={props.handlePetNameChange}
        defaultValue={props.petName}
      />
      <BlueButton
        underlayColor="white"
        onPress={props.handleSubmit}
      >
        <ButtonText>Update</ButtonText>
      </BlueButton>
    </PageWrapperKeyboardAvoidingView>
  );
}
