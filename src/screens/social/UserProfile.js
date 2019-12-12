import React, { Component } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  AsyncStorage,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import { ProfileHeaderView, ProfileView } from "../../styles";
import { getUser, updateBio } from "../../api/UserRoute";
import EditProfileInput from "../../components/social/EditProfileInput";

export default class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      bio: "",
      avatar: "",
      userKey: "",
      refresh: false,
      showForm: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBioChange = this.handleBioChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  async componentDidMount() {
    let userKey = await AsyncStorage.getItem("userKey");
    let user = await getUser(userKey);
    Promise.all([userKey, user]);
    this.setState({
      userKey: userKey,
      user: user,
      bio: user.bio
    });
  }
  //updates information in profile's Bio 'EditProfileInput' component with inputted text
  handleBioChange = event => {
    let bio = event.nativeEvent.text;
    this.setState({ bio: bio });
  };
  //calls the updateBio function to add the form's bio information to the database and show on user's profile
  async handleSubmit(evt) {
    evt.preventDefault();

    await updateBio(this.state.userKey, this.state.bio);
    this.setState({ bio: this.state.bio });
    this.setState({ refresh: !this.state.refresh });
  }

  //triggers the display of 'edit profile' form
  handleClick = event => {
    return this.setState({
      showForm: !this.state.showForm
    });
  };

  //Displays images for user's earned badges based on a check of user's completed tasks history
  displayBadge = () => {
    let badges = [];
    const gymBadge = (
      <Image
        style={styles.badge}
        key="gymBadge"
        source={require("../../assets/img/badges/Badge_Gym.png")}
      />
    );
    const choresBadge = (
      <Image
        style={styles.badge}
        key="choresBadge"
        source={require("../../assets/img/badges/Badge_Chore.png")}
      />
    );
    const socialBadge = (
      <Image
        style={styles.badge}
        key="socialBadge"
        source={require("../../assets/img/badges/Badge_Social.png")}
      />
    );

    this.state.user.completedTasks.forEach(task => {
      if (task.category === "Exercise" && !badges.includes(gymBadge)) {
        badges.push(gymBadge);
      }
      if (task.category === "Chores" && !badges.includes(choresBadge)) {
        badges.push(choresBadge);
      }
      if (task.category === "Social" && !badges.includes(socialBadge)) {
        badges.push(socialBadge);
      }
    });

    return badges.map(badge => badge);
  };
  render() {
    let { userKey, bio, showForm, user } = this.state;
    if (userKey) {
      //checks for logged in user
      return (
        <View>
          <ProfileHeaderView>
            <View style={styles.headerText}>
              <Image style={styles.pic} source={{ uri: user.avatar }} />

              <Text style={styles.name}>{user.UserName}</Text>
            </View>
          </ProfileHeaderView>

          <View style={styles.content}>
            <View style={styles.item}>
              <View style={{ flex: 1 }}>
                <ProfileView>
                  <Text style={styles.text}>About Me: </Text>
                  <Text style={styles.text}>{this.state.bio}</Text>
                </ProfileView>

                <View style={{ flexDirection: "row" }}>
                  {this.displayBadge()}
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={this.handleClick}
                >
                  <Text style={styles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>
                {/*renders form to edit profile based on status of 'showForm' on state*/}
                {showForm ? (
                  <KeyboardAvoidingView>
                    {/*component with a form that can be edited*/}
                    <EditProfileInput
                      handleSubmit={this.handleSubmit}
                      handleBioChange={this.handleBioChange}
                      bio={bio}
                      user={user}
                      uId={userKey}
                    />
                  </KeyboardAvoidingView>
                ) : null}
              </View>
            </View>
          </View>
        </View>
      );
    } else {
      return <View></View>;
    }
  }
}

const styles = StyleSheet.create({
  headerText: {
    padding: 20,
    alignItems: "center"
  },
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
  pic: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    marginTop: 20
  },
  name: {
    fontSize: 30,
    color: "#FFFAF0",
    fontWeight: "700",
    fontFamily: "TepenoSansBold",
    textTransform: "uppercase",
    letterSpacing: 2
  },
  content: {
    backgroundColor: "#5c9ead",
    height: 600,
    alignItems: "center"
  },
  item: {
    flexDirection: "row"
  },

  badge: {
    width: 100,
    height: 100
  },
  text: {
    fontSize: 22,
    color: "#5c9ead",
    fontFamily: "Raleway-Medium",
    textAlign: "center"
  }
});
