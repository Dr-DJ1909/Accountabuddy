import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  AsyncStorage,
  Button
} from 'react-native';
import { ProfileHeaderView, ProfileView, LabelText } from '../../styles';
import { getFriendList } from '../../api/FriendsRoute';
import { getUser, updateBio } from '../../api/UserRoute';
import FriendPet from './FriendPet';

export default function ProfileDisplay(props) {
  let {
    UserName,
    bio,
    email,
    pet,
    avatar
  } = props.navigation.state.params.friend;
  return (
    <View>
      <ProfileHeaderView>
        <View style={styles.headerText}>
          <Image style={styles.pic} source={{ uri: avatar }} />

          <Text style={styles.name}>{UserName}</Text>
        </View>
      </ProfileHeaderView>
      <View style={styles.content}>
        <View style={styles.item}>
          <View style={{ flex: 1 }}>
            <ProfileView>
              <LabelText>About Me:</LabelText>
              <Text>{bio}</Text>
            </ProfileView>
            <FriendPet
              userPet={props.navigation.state.params.userPet}
              friendPet={props.navigation.state.params.friend.pet}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    padding: 20,
    alignItems: 'center'
  },
  pic: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10
  },
  name: {
    fontSize: 20,
    color: '#FFFAF0',
    fontWeight: '700'
  },
  content: {
    backgroundColor: '#D8C4E9',
    height: 600,
    alignItems: 'center'
  },
  item: {
    flexDirection: 'row'
  },
  infoContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 5
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: '#FFFFFF'
  }
});
