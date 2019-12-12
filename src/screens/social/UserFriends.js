import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  AsyncStorage,
  Button,
  Image
} from 'react-native';
import {
  PageWrapperView,
  AbsolutePositionPetView,
  HeaderText,
  PageWrapperViewLight
} from '../../styles';
import {ListItem} from 'react-native-elements';
import {newFriend, getFriendList} from '../../api/FriendsRoute';
import {getUsers} from '../../api/UserRoute';
import Icon from 'react-native-vector-icons/Feather';
import ProfileDisplay from './ProfileDisplay';
import {ScrollView} from 'react-native-gesture-handler';
import {getUser} from '../../api/UserRoute'

class UserFriends extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      userKey: '',
      friends: [],
      user:{}
    };
  }
  async componentDidMount() {
    // let users = await getUsers();
    const userKey = await AsyncStorage.getItem('userKey');
    const user = await getUser(userKey)
    const friends = await getFriendList(userKey);
    Promise.all([friends, userKey]);
    this.setState({
      userKey: userKey,
      friends: friends,
      user:user
    });
  }
  render() {
    let friends = this.state.friends;

    if (this.state.friends.length) {
      return (
        <View style={{flex: 1, paddingTop: 70}}>
          <FlatList
            extraData={this.state}
            data={this.state.friends}
            renderItem={({item}) => (
              <ListItem
              rightElement={ () =>(
                <View style={{flex: 1, flexDirection: 'row'}}>
                <Button
                title='Chat'
                onPress={() =>{
                  this.props.navigation.navigate('Chat', {
                    item:item,
                    //passes down the chat id to the chat component that will be loaded
                    })
                }
                  }/>
                <Button
                    title="View Profile"
                    onPress={() =>
                      this.props.navigation.navigate('ProfileDisplay', {
                        friend: item,
                        userPet: this.state.user.pet
                      })
                    }
                  />
                </View>

              )
                }
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
        <PageWrapperViewLight>
          <Text>No friends yet :( Search for a user and add someone! </Text>
        </PageWrapperViewLight>
      );
    }
  }
}

export default UserFriends;

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

