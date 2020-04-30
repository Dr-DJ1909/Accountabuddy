import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  AsyncStorage,
  Button
} from 'react-native';

import {
  newFriend,
  getPendingList,
  denyResponse,
  newChat,
  addChatRoom
} from '../../api/FriendsRoute';

import { getUsers } from '../../api/UserRoute';
import Icon from 'react-native-vector-icons/Feather';
import TasksHeader from '../../components/tasks/TasksHeader';
import { ScrollView } from 'react-native-gesture-handler';

class FriendRequests extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      userKey: '',
      friends: []
    };
  }
  async componentDidMount() {
    let users = await getUsers(); //Retrieves all users
    const userKey = await AsyncStorage.getItem('userKey');
    const friends = await getPendingList(userKey);
    Promise.all([friends, userKey]);
    this.setState({
      users: users,
      userKey: userKey,
      friends: friends
    });
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
          marginBottom: '5%'
        }}
      ></View>
    );
  };
  render() {
    let friends = this.state.friends;
    if (this.state.friends.length) {
      return (
        <View style={{ flex: 1, paddingTop: 70 }}>
          <FlatList
            extraData={this.state}
            data={this.state.friends}
            renderItem={({ item }) => (
              <ListItem
                rightElement={() => (
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Button
                      title="Deny"
                      onPress={() => {
                        denyResponse(this.state.userKey, item.uId);
                        denyResponse(item.uId, this.state.userKey);
                        this.setState({
                          friends: this.state.friends.filter(
                            friend => friend.uId !== item.uId
                          )
                        });
                      }}
                    />
                    <Button
                      title="Accept"
                      onPress={async () => {
                        newFriend(this.state.userKey, item.uId);
                        newFriend(item.uId, this.state.userKey);
                        let chatRoom = await newChat(); //Adds a chatroom id to firestore
                        await addChatRoom(
                          this.state.userKey,
                          item.uId,
                          chatRoom
                        ); // adds the chatroom id to both + only those users.
                        await addChatRoom(
                          item.uId,
                          this.state.userKey,
                          chatRoom
                        );

                        this.setState({
                          friends: this.state.friends.filter(
                            friend => friend.uId !== item.uId
                          )
                        });
                      }}
                    />
                  </View>
                )}
                // leftAvatar={{source: {uri: item.picture.thumbnail}}}
                title={item.email}
                subtitle={item.UserName}
              />
            )}
            // keyExtractor={item => item.email}
            keyExtractor={(item, index) => `${index}`}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
          />
        </View>
      );
    } else {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 70,
            flex: 1
          }}
        >
          <Text>No friends...</Text>
        </View>
      );
    }
  }
}
export default FriendRequests;
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#20B2AA'
  },
  headerContent: {
    padding: 30,
    alignItems: 'center'
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    marginBottom: 10
  },
  image: {
    width: 60,
    height: 60
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600'
  },
  body: {
    padding: 30,
    backgroundColor: '#E6E6FA'
  },
  box: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2
    },
    elevation: 2
  },
  username: {
    color: '#20B2AA',
    fontSize: 22,
    alignSelf: 'center',
    marginLeft: 10
  }
});
