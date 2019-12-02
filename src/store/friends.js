import {AsyncStorage} from 'react-native';
import {newFriend, getFriendList} from '../api/FriendsRoute';

const initialState = {
  friends: [],
  allUsers: []
};

const ADD_FRIEND = 'ADD_FRIEND';
const GET_FRIENDS = 'GET_FRIENDS';
const GET_ALL_USERS = 'GET_ALL_USERS';

const addFriend = user => {
  return {
    type: ADD_FRIEND,
    user
  };
};

export const addFriendThunk = newFriend => {
  return async function(dispatch) {
    try {
      const retrievedData = await AsyncStorage.getItem('loggedinUser');
      const user = JSON.parse(retrievedData);
      await newFriend(user, newFriend);
      dispatch(addFriend(newFriend));
    } catch (error) {
      console.error(error);
    }
  };
};

export const friendReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      AsyncStorage.setItem('loggedinUser', JSON.stringify(action.user));
      console.log('the user in state >>>', action.user);
      return {...state, user: action.user};

    case GET_USER_KEY:
      AsyncStorage.setItem('userKey', action.userKey);
      console.log('userKey in state>>>', action.userKey);
      return {...state, userKey: action.userKey};

    case ADD_FRIEND:
      console.log('action.user >>>', action.user);
      return {...state, friends: [...state.friends, action.user]};

    case UPDATE_TASK:
      return {...state, user: action.user};

    case FAILED_TASK:
      return {...state, user: action.user};

    case DELETE_TASK:
      return {...state, user: action.user};

    default:
      return state;
  }
};
