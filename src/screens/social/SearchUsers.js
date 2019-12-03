import {ListItem, SearchBar} from 'react-native-elements';
import React from 'react';
import {View, FlatList, StyleSheet, AsyncStorage, Button} from 'react-native';
import {PageWrapperView, AddTaskBtnView} from '../../styles';
import {
  newFriend,
  getFriendList,
  requestFriend,
  getRequestList
} from '../../api/FriendsRoute';
import {getUsers} from '../../api/UserRoute';
import Icon from 'react-native-vector-icons/Feather';
import Constants from 'expo-constants';
import TasksHeader from '../../components/tasks/TasksHeader';
class SearchUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      userKey: '',
      value: '',
      requestHistory: [],
      targetUser: ''
    };
    this.arrayholder = [];
  }
  async componentDidMount() {
    let users = await getUsers();
    const userKey = await AsyncStorage.getItem('userKey');

    Promise.all([users, userKey]);
    this.setState({
      users: users,
      userKey: userKey
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
      return itemData.includes(textData); // this will return true if our itemData contains the textData
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

  async getTargetUserHistory() {
    const targetUserHistory = await getRequestList(this.state.targetUser);
    this.setState({
      requestHistory: targetUserHistory
    });
  }

  render() {
    let users = this.state.users;
    let friends = this.state.friends;
    let target = '';
    if (this.state.users.length) {
      return (
        <View style={{flex: 1, paddingTop: 70}}>
          <FlatList
            extraData={this.state}
            data={this.state.users}
            renderItem={({item}) => (
              <ListItem
                // leftAvatar={{source: {uri: item.picture.thumbnail}}}
                rightElement={
                  <Button
                    title="Request"
                    onPress={() => {
                      if (
                        !this.state.requestHistory.includes(this.state.userKey)
                      ) {
                        requestFriend(item.uId, this.state.userKey);
                        target = item.uId;
                        this.setState({targetUser: target}, () => {
                          this.getTargetUserHistory();
                        });
                      } else {
                        console.log('NO REQ');
                      }
                    }}
                  />
                }
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
      return <View></View>;
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
