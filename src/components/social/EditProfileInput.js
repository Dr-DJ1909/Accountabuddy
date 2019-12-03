import React, {Component} from 'react';
import {
  PageWrapperView,
  HeaderText,
  HeaderTasksText,
  TaskWrapperView,
  HeaderWrapperView,
  LabelText,
  TaskView
} from '../../styles';
import {
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableHighlight,
  Picker,
  AsyncStorage
} from 'react-native';

export default class EditProfileInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: ''
    };
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.formView}>
        <LabelText>About Me:</LabelText>
        <TextInput
          multiline={true}
          numberOfLines={8}
          onChange={this.props.handleBioChange}
          defaultValue={this.props.bio}
          style={styles.textInput}
        />
        <TouchableHighlight
          style={styles.button}
          underlayColor="white"
          onPress={this.props.handleSubmit}
        >
          <Text style={styles.buttonText}>Update</Text>
        </TouchableHighlight>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    height: 30,
    flexDirection: 'row',
    backgroundColor: '#9403fc',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 5,
    marginTop: 5,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 20,
    color: 'white'
  },
  textInput: {
    height: 150,
    fontSize: 14,
    borderRadius: 10,
    borderWidth: 5,
    padding: 10,
    borderColor: '#ca03fc',
    backgroundColor: '#fafafa',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
    width: 400,
    alignSelf: 'center'
  }
});
