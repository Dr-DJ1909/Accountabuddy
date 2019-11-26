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

const GET_USER = 'GET_USER';
const GET_USER_KEY = 'GET_USER_KEY';
const GET_ALL_TASKS = 'GET_ALL_TASKS'
const UPDATE_TASK = 'UPDATE_TASK'//from incomplete to complete
const ADD_TASK = 'ADD_TASK'

const addTask = (newTask) =>{
  return{
    type:ADD_TASK,
    newTask
  }
}

const getAllTasks = (allTasks) =>{
  return{
    type:GET_ALL_TASKS,
    allTasks
  }
}

const updateTask = (updatedTask) =>{
  return{
    type:UPDATE_TASK,
    updatedTask
  }
}

const getUser = user => {
  return {
    type: GET_USER,
    user
  };
};

const getUserKey = userKey => {
  return {
    type: GET_USER_KEY,
    userKey
  };
};

export const addTaskThunk = newTask =>{
  return function (dispatch){
    try {
      console.log('addTask is being accessed', newTask)
      dispatch(addTask(newTask))
    } catch (error) {
      console.error(error)
    }
  }
}

export const getAllTasks = allTasks =>{
  return function (dispatch){
    try{
      console.log('GetAllTasks being accessed')
      dispatch(getAllTasks(allTasks))
    }
    catch(error){
      console.error(error)
    }
  }
}

export const updateTask = updatedTask =>{
  return function (dispatch){
    try {
      console.log('updateTask being accessed')
      dispatch(updateTask(updatedTask))
    } catch (error) {
      console.error(error)
    }
  }
}

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

    case ADD_TASK:
      const retrievedData =  AsyncStorage.getItem('loggedinUser')
      const data = JSON.parse(retrievedData)
      data.tasks.push(action.newTask)
      AsyncStorage.setItem('loggedinUser', JSON.stringify(data))
      return{...state, user:data}

    case GET_ALL_TASKS:
      const

    case UPDATE_TASK:

    default:
      return state;
  }
};
