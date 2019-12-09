import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  AsyncStorage,
  Alert
} from "react-native";
import { Container, Form, Input, Item, Label, Button } from "native-base";
import { withNavigation } from "react-navigation";
import {
  newUser,
  googleUser,
  signUpUser,
  signInWithGoogleAsync,
  loginUser,
  getUser
} from "../api/UserRoute";
import { getUserThunk, getUserKeyThunk } from "../store/user";

class SignUpLogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      imageURI: ""
    };
    this.signUp = this.signUp.bind(this.signUp);
  }
  async GoogleSignIn() {
    const { navigate } = this.props.navigation;
    //msg.user.id
    const msg = await signInWithGoogleAsync();
    const googleSignedIn = await getUser(msg.user.id);
    // console.log('msg>>>>>>', msg);
    console.log("googleSignedIn>>>>>>", googleSignedIn);
    this.props.getUserAction(googleSignedIn);
    this.props.getUserKey(msg.user.id);
    if (msg.type === "success") {
      navigate("NavWrapper");
    }
  }

  signUp = async (email, password) => {
    try {
      const { navigate } = this.props.navigation;
      let newUserKey = await signUpUser(email, password);
      console.log("newUserId in signUp", newUserKey);
      this.props.getUserAction(await getUser(newUserKey));
      this.props.getUserKey(newUserKey);
      navigate("TestPetScreen");
    } catch (error) {
      console.log(error);
    }
  };
  wrongLoginAlert = () => {
    alert("Incorrect email or password");
  };

  loginUser = async (email, password) => {
    const { navigate } = this.props.navigation;
    try {
      let userKey = await loginUser(email, password);
      if (userKey) {
        const currentUser = await getUser(userKey);
        this.props.getUserAction(currentUser);
        this.props.getUserKey(userKey);
        if (currentUser.isDoingTutorial) {
          console.log("are you here??????");
          navigate("TestPetScreen");
        } else {
          navigate("NavWrapper");
        }
      } else {
        console.log("wrong");
        this.wrongLoginAlert();
      }
    } catch (err) {
      console.log(err.toString());
    }
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="height"
        keyboardVerticalOffset={60}
      >
        <Container style={{ ...styles.container, backgroundColor: "#EFE2E5" }}>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={email => this.setState({ email })}
              />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={password => this.setState({ password })}
              />
            </Item>

            <Button
              style={{ margin: 5, marginTop: 15 }}
              full
              rounded
              success
              onPress={() =>
                this.loginUser(this.state.email, this.state.password)
              }
            >
              <Text style={{ fontFamily: "Raleway-Medium", color: "white" }}>
                Log In
              </Text>
            </Button>
            <Button
              style={{ margin: 5 }}
              full
              rounded
              primary
              onPress={() => this.signUp(this.state.email, this.state.password)}
            >
              <Text style={{ fontFamily: "Raleway-Medium", color: "white" }}>
                Sign Up
              </Text>
            </Button>

            <Button
              warning
              full
              rounded
              buttonStyle={{
                backgroundColor: "red"
              }}
              style={{ margin: 5 }}
              onPress={() => this.GoogleSignIn()}
            >
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text
                  style={{
                    fontFamily: "Raleway-Medium",
                    color: "white",
                    textAlign: "center"
                  }}
                >
                  Log In With Google
                </Text>
              </View>
            </Button>
          </Form>
        </Container>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 10,
    alignContent: "center"
  }
});

const mapStateToProps = function(state) {
  return {
    user: state.user
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    getUserAction: user => dispatch(getUserThunk(user)),
    getUserKey: userKey => dispatch(getUserKeyThunk(userKey))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpLogIn);
