import React, {Component} from 'react';
import {
  PageWrapperKeyboardAvoidingView,
  HeaderText,
  HeaderTasksText,
  TaskWrapperView,
  HeaderWrapperView,
  LabelText,
  TaskView,
  TextInput,
  BlueButton,
  ButtonText,
  Picker
} from '../../styles';
import {
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

export default function AddTaskInput(props) {
  return (
    <PageWrapperKeyboardAvoidingView>
      <HeaderText>Add a new task</HeaderText>
      <LabelText>What are you going to do?</LabelText>
      <TextInput
        placeholder="Go to the gym"
        placeholderColor="#c4c3cb"
        onChange={props.handleNameChange}
        defaultValue={props.name}
      />
      <LabelText>What category does it belong to?:</LabelText>
      <Picker
        selectedValue={props.category}
        onValueChange={props.handleCategoryChange}
        mode='dropdown'
      >
        <Picker.Item label="Exercise" value="Exercise" />
        <Picker.Item label="Chores" value="Chores" />
        <Picker.Item label="Social" value="Social" />
      </Picker>

      <BlueButton
        underlayColor="white"
        onPress={props.handleSubmit}
      >
        <ButtonText>Add</ButtonText>
      </BlueButton>
    </PageWrapperKeyboardAvoidingView>
  );
}
