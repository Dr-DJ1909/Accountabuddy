import {AsyncStorage} from 'react-native';
import {AllIncompleteTasks, AllCompleteTasks, TaskComplete, TaskFailed, deleteTask} from '../api/TaskRoute'

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
// const GET_ALL_TASKS = 'GET_ALL_TASKS'
// const GET_ALL_COMPLETED = 'GET_ALL_COMPLETED'
// const GET_ALL_INCOMPLETED = 'GET_ALL_INCOMPLETE'
const UPDATE_TASK = 'UPDATE_TASK'//from incomplete to complete
const ADD_TASK = 'ADD_TASK'
const FAILED_TASK = 'FAILED_TASK'
const DELETE_TASK = 'DELETE_TASK'


const addTask = (user) =>{
  return{
    type:ADD_TASK,
    user
  }
}

const deleteTaskAction = (user) =>{
  return{
    type:DELETE_TASK,
    user
  }
}

const failedTaskAction = (user) =>{
  return{
    type:FAILED_TASK,
    user
  }
}

// const getAllTasks = (allTasks) =>{
//   return{
//     type:GET_ALL_TASKS,
//     allTasks
//   }
// }

const updateTask = (user) =>{
  return{
    type:UPDATE_TASK,
    user
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

// const completedTasksView = (completedTaskArray) =>{
//   return{
//     type:GET_ALL_COMPLETED,
//     completedTaskArray
//   }

// }

// const incompleteTasksView = (incompleteTaskArray) =>{
//   type:GET_ALL_INCOMPLETE,
//   incompleteTaskArray
// }

// export const AllCompletedTasksThunk = () => {
//   return async function (dispatch){
//     try {
//       const userKey = await AsyncStorage.getItem('userKey')
//       const completedTasks = await AllCompleteTasks(userKey)
//       dispatch(completedTasksView(completedTasks))
//     } catch (error) {
//       console.log(error)
//     }
//   }
// }

// export const AllIncompleteTasksThunk = () =>{
//   return async function (dispatch){
//     try {
//       const userKey = await AsyncStorage.getItem('userKey')
//       const incompleteTasks = await AllIncompleteTasks(userKey)
//       dispatch(incompleteTasksView(incompleteTasks))
//     } catch (error) {
//       console.log(error)
//     }
//   }
// }

export const addTaskThunk = newTask =>{
  return async function (dispatch){
    try {
      const retrievedData = await AsyncStorage.getItem('loggedinUser')
      const user = JSON.parse(retrievedData)
      user.incompleteTasks.push(newTask)
      AsyncStorage.setItem('loggedinUser', JSON.stringify(user))
      dispatch(addTask(user))
    } catch (error) {
      console.error(error)
    }
  }
}

export const getAllTasksThunk = allTasks =>{
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

export const updateTaskThunk = updatedTask =>{
  return async function (dispatch){
    try {
      const userKey = await AsyncStorage.getItem('userKey')
      TaskComplete(userKey,updatedTask)//updates firebase
      const retrievedData= await AsyncStorage.getItem('loggedinUser')
      const user = JSON.parse(retrievedData)
      user.completedTasks.push(updatedTask)//updates asyncStorage
      let newIncomplete = user.incompleteTasks.filter((current) =>{
      if(current.name != updatedTask.name){
        return current}
      })
      user.incompleteTasks = newIncomplete
      AsyncStorage.setItem('loggedinUser',JSON.stringify(user))
      dispatch(updateTask(user))//uses user object to update redux store
    } catch (error) {
      console.error(error)
    }
  }
}

export const failedTaskThunk = failedTask =>{
  return async function(dispatch){
    try {
      const userKey = await AsyncStorage.getItem('userKey')
      TaskFailed(userKey,failedTask)
      const retrievedData = await AsyncStorage.getItem('loggedinUser')
      const user = JSON.parse(retrievedData)
      user.failedTasks.push(failedTask)
      let newIncomplete = user.incompleteTasks.filter((current) =>{
      if(current.name != failedTask.name){
        return current}
      })
      user.incompleteTasks = newIncomplete
      AsyncStorage.setItem('loggedinUser', JSON.stringify(user))
      dispatch(failedTaskAction(user))
    } catch (error) {
      console.error(error)
    }
  }
}


export const deleteTaskThunk = deletedTask =>{
  return async function(dispatch) {
    try {
      const userKey = await AsyncStorage.getItem('userKey')
      deleteTask(userKey,deletedTask)
      const retrievedData = await AsyncStorage.getItem('loggedinUser')
      const user = JSON.parse(retrievedData)
      let newIncomplete = user.incompleteTasks.filter((current) =>{
        if(current.name != deletedTask.name){
          return current}
        })
        user.incompleteTasks = newIncomplete
      console.log('user that deleted item', user)
      AsyncStorage.setItem('loggedinUser', JSON.stringify(user))
      dispatch(deleteTaskAction(user))
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
      console.log('action.user >>>', action.user)
      return{...state, user: action.user}

    case UPDATE_TASK:
      return {...state,user:action.user}

    case FAILED_TASK:
      return{...state,user:action.user}

    case DELETE_TASK:
      return {...state,user:action.user}

    // case GET_ALL_COMPLETED:
    //   return {...state, user:{...user, completeTasks:action.completedTaskArray}}

    // case GET_ALL_INCOMPLETED:
    //     console.log({...state,user:{...user,incompleteTasks:action.incompleteTaskArray}})
    //   return {...state,user:{...user,incompleteTasks:action.incompleteTaskArray}}

    default:
      return state;

  }
};
