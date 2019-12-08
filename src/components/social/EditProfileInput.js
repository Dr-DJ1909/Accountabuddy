import React, { Component } from "react";
import { LabelText } from "../../styles";
import {
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Picker,
  AsyncStorage
} from "react-native";
import ImageUpload from "../../components/social/ImageUpload";

export default class EditProfileInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: ""
    };
  }
  render() {
    return (
      <KeyboardAvoidingView>
        <LabelText>About Me:</LabelText>
        <TextInput
          multiline={true}
          numberOfLines={8}
          onChange={this.props.handleBioChange}
          defaultValue={this.props.bio}
          style={styles.textInput}
        />
        <ImageUpload user={this.props.user} uId={this.props.uId} />
        <TouchableOpacity
          style={styles.button}
          onPress={this.props.handleSubmit}
        >
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    height: 30,
    flexDirection: "row",
    backgroundColor: "#0A369D",
    borderColor: "white",
    borderWidth: 0,
    borderRadius: 10,
    margin: 5,
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    fontFamily: "Raleway-Medium",
    margin: 2
  },
  textInput: {
    height: 150,
    fontSize: 18,
    borderRadius: 10,
    borderWidth: 0,
    padding: 10,
    borderColor: "#ca03fc",
    backgroundColor: "#eeeeee",
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
    width: 400,
    alignSelf: "center"
  }
});
