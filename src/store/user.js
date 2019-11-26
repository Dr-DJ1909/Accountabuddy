import {AsyncStorage} from 'react-native';

/*
how we have connected firebase, redux, and asyncstorage (example using signup/login):

1. in the signup/login component, the loginUser function calls the firebase api function, handles the promise, and passes the resulting user object into a getUserAction thunk.

2. the thunk dispatches the user object. in the reducer, we set the user obj to asyncstorage, and set the user to the redux store simultaneously.

3. profit!

** note that post/put should be in the opposite order - the component function will set the obj to the redux store and asyncstorage, and then on the redux side we will update firebase via the obj we get from asyncstorage. (to be tested.)

*/

const initialState = {
  user: {},
  userKey: ''
};

export const GET_USER = 'GET_USER';
export const GET_USER_KEY = 'GET_USER_KEY';

export const getUser = user => {
  return {
    type: GET_USER,
    user
  };
};

export const getUserKey = userKey => {
  return {
    type: GET_USER_KEY,
    userKey
  };
};

export const getUserThunk = user => dispatch => {
  try {
    console.log('the thunk is being accessed');
    dispatch(getUser(user));
  } catch (error) {
    console.error(error);
  }
};

export const getUserKeyThunk = userKey => {
  return function(dispatch) {
    try {
      console.log('userKey thunk being accessed');
      dispatch(getUserKey(userKey));
    } catch (error) {
      console.error(error);
    }
  };
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      AsyncStorage.setItem('loggedinUser', JSON.stringify(action.user));
      console.log('the user in state >>>', action.user);
      return {...state, user: action.user};

    case GET_USER_KEY:
      AsyncStorage.setItem('userKey', action.userKey);
      console.log('userKey in state>>>', action.userKey);
      return {...state, userKey: action.userKey};

    default:
      return state;
  }
};
