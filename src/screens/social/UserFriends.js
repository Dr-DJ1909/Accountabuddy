import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  AsyncStorage,
  Button
} from 'react-native';
import {PageWrapperViewLight} from '../../styles';
import {ListItem} from 'react-native-elements';
import {getFriendList} from '../../api/FriendsRoute';
import ProfileDisplay from './ProfileDisplay';
import {getUser} from '../../api/UserRoute';

class UserFriends extends React.Component {
  constructor() {
    super();
    this.state = {
      userKey: '',
      friends: [],
      user: {}
    };
  }
  async componentDidMount() {
    const userKey = await AsyncStorage.getItem('userKey');
    const user = await getUser(userKey);
    const friends = await getFriendList(userKey);
    Promise.all([friends, userKey]);
    this.setState({
      userKey: userKey,
      friends: friends,
      user: user
    });
  }
  render() {
    let friends = this.state.friends;

    if (friends.length) {
      return (
        <View style={{flex: 1, paddingTop: 70}}>
          <FlatList
            extraData={this.state}
            data={friends}
            renderItem={({item}) => (
              <ListItem
                rightElement={() => (
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <Button
                      title="Chat"
                      onPress={() => {
                        this.props.navigation.navigate('Chat', {
                          item: item
                          //passes down the chat id to the chat component that will be loaded
                        });
                      }}
                    />
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
                )}
                // leftAvatar={{source: {uri: item.picture.thumbnail}}}
                title={item.email}
                subtitle={item.UserName}
              />
            )}
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
  username: {
    color: '#20B2AA',
    fontSize: 22,
    alignSelf: 'center',
    marginLeft: 10
  }
});
