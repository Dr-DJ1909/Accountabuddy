import {ListItem, SearchBar} from 'react-native-elements';
import React, {Component} from 'react';
import {
  Image,
  Text,
  View,
  FlatList,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import {
  PageWrapperView,
  AbsolutePositionPetView,
  HeaderText,
  PetView,
  BubbleText,
  AbsolutePositionBubbleView,
  AddTaskBtnView
} from '../../styles';
import {newFriend, getFriendList} from '../../api/FriendsRoute';
import {getUsers} from '../../api/UserRoute';
import Icon from 'react-native-vector-icons/Feather';
import ListUsers from '../../components/social/UsersList';
import SafeAreaView from 'react-native-safe-area-view';
import Constants from 'expo-constants';
import TasksHeader from '../../components/tasks/TasksHeader';
class SearchUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      userKey: '',
      friends: [],
      value: ''
    };
    this.arrayholder = [];
  }
  async componentDidMount() {
    let users = await getUsers();
    const userKey = await AsyncStorage.getItem('userKey');
    const friends = await getFriendList(userKey);
    Promise.all([users, friends, userKey]);
    console.log('what are friends', friends);
    this.setState({
      users: users,
      userKey: userKey,
      friends: friends
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
    console.log('filtered list>>>>>>>', newData);
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
        placeholder="Search friend name..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };
  render() {
    let users = this.state.users;
    let friends = this.state.friends;
    newFriend(this.state.userKey, 'TvKvKUdwTrZfmLc5Xu7kkqlXZVC3');
    newFriend('TvKvKUdwTrZfmLc5Xu7kkqlXZVC3', this.state.userKey);
    newFriend('XeTqoqUIyBabuPw23ZKHJgufx4W2', this.state.userKey);
    newFriend(this.state.userKey, 'XeTqoqUIyBabuPw23ZKHJgufx4W2');
    if (this.state.users.length) {
      return (
        <View style={{flex: 1}}>
          <TasksHeader></TasksHeader>
          <FlatList
            extraData={this.state}
            data={this.state.users}
            renderItem={({item}) => (
              <ListItem
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
    }
    // return (
    //   <SafeAreaView>
    //     <TasksHeader></TasksHeader>
    //     <FlatList
    //       data={users}
    //       keyExtractor={(item, index) => index.toString()}
    //       renderItem={({item}) => (
    //         <ListUsers item={item} uId={this.state.userKey} />
    //       )}
    //     ></FlatList>
    //   </SafeAreaView>
    // );
    // }
    else {
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

// import React, {Component} from 'react';
// import {View, Text, FlatList, ActivityIndicator} from 'react-native';
// import {ListItem, SearchBar} from 'react-native-elements';
// import {getUsers} from '../../api/UserRoute';
// class SearchUsers extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loading: false,
//       data: [],
//       error: null
//     };
//     this.arrayholder = [];
//   }
//   async componentDidMount() {
//     this.makeRemoteRequest();
//   }
//   makeRemoteRequest = () => {
//     const url = `https://randomuser.me/api/?&results=20`;
//     this.setState({loading: true});
//     fetch(url)
//       .then(res => res.json())
//       .then(res => {
//         this.setState({
//           data: res.results,
//           error: res.error || null,
//           loading: false
//         });
//         this.arrayholder = res.results;
//       })
//       .catch(error => {
//         this.setState({error, loading: false});
//       });
//   };
//   renderSeparator = () => {
//     return (
//       <View
//         style={{
//           height: 1,
//           width: '86%',
//           backgroundColor: '#CED0CE',
//           marginLeft: '14%'
//         }}
//       />
//     );
//   };
//   searchFilterFunction = text => {
//     this.setState({
//       value: text
//     });
//     const newData = this.arrayholder.filter(item => {
//       const itemData = `${item.name.title.toUpperCase()} ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
//       const textData = text.toUpperCase();
//       return itemData.indexOf(textData) > -1;
//     });
//     this.setState({
//       data: newData
//     });
//   };
//   renderHeader = () => {
//     return (
//       <SearchBar
//         placeholder="Search friend name..."
//         lightTheme
//         round
//         onChangeText={text => this.searchFilterFunction(text)}
//         autoCorrect={false}
//         value={this.state.value}
//       />
//     );
//   };
//   render() {
//     if (this.state.loading) {
//       return (
//         <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//           <ActivityIndicator />
//         </View>
//       );
//     }
//     return (
//       <View style={{flex: 1}}>
//         <FlatList
//           data={this.state.data}
//           renderItem={({item}) => (
//             <ListItem
//               leftAvatar={{source: {uri: item.picture.thumbnail}}}
//               title={`${item.name.first} ${item.name.last}`}
//               subtitle={item.email}
//             />
//           )}
//           keyExtractor={item => item.email}
//           ItemSeparatorComponent={this.renderSeparator}
//           ListHeaderComponent={this.renderHeader}
//         />
//       </View>
//     );
//   }
// }
// export default SearchUsers;
