import {ListItem, SearchBar} from 'react-native-elements';
import React from 'react';
import {View, FlatList, StyleSheet, AsyncStorage, Button} from 'react-native';
import {requestFriend, getSentList} from '../../api/FriendsRoute';
import {getUsers} from '../../api/UserRoute';
import Constants from 'expo-constants';

class SearchUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      userKey: '',
      value: '',
      sentList: []
    };
    this.arrayholder = [];
  }
  async componentDidMount() {
    let users = await getUsers();
    const userKey = await AsyncStorage.getItem('userKey');
    const sentList = await getSentList(userKey);
    Promise.all([users, userKey, sentList]);
    this.setState({
      users: users,
      userKey: userKey,
      sentList: sentList
    });
    this.arrayholder = this.state.users;
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%'
        }}
      />
    );
  };
  searchFilterFunction = text => {
    this.setState({
      value: text
    });
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.email.toLowerCase()}`;
      const textData = text.toLowerCase();
      return itemData.includes(textData);
    });
    this.setState({
      users: newData
    });
    if (!newData.length) {
      this.setState({
        users: [{UserName: 'Sorry not found...'}]
      });
    }
  };
  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Search for friend's email..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };

  render() {
    if (this.state.sentList && this.state.userKey) {
      let users = this.state.users.filter(
        user =>
          !this.state.sentList.includes(user.uId) &&
          user.uId !== this.state.userKey
      );
      return (
        <View style={{flex: 1, paddingTop: 70}}>
          <FlatList
            extraData={this.state}
            data={users}
            renderItem={({item}) => (
              <ListItem
                rightElement={
                  <Button
                    title="Request"
                    onPress={() =>requestFriend(item.uId, this.state.userKey)}
                  />
                }
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
        <View style={{flex: 1, paddingTop: 70}}>
          <FlatList
            extraData={this.state}
            data={this.state.users}
            renderItem={({item}) => (
              <ListItem
                rightElement={
                  <Button
                    title="Request"
                    onPress={() => {
                      requestFriend(item.uId, this.state.userKey);
                    }}
                  />
                }
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
    }
  }
}
export default SearchUsers;
//for testing view purposes
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },
  item: {
    backgroundColor: '#F9C2FF',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 32
  }
});
