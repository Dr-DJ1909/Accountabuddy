import {AsyncStorage} from 'react-native';
import {
  AllIncompleteTasks,
  AllCompleteTasks,
  TaskComplete,
  TaskFailed,
  deleteTask
} from '../api/TaskRoute';
import {HPChange, newPetName} from '../api/PetRoute';
import {renameUserName} from '../api/UserRoute';

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
const LOGOUT_USER = 'LOGOUT_USER';

const UPDATE_INFO = 'UPDATE_INFO';

// const UPDATE_TASK = 'UPDATE_TASK' //from incomplete to complete
const ADD_TASK = 'ADD_TASK';
// const FAILED_TASK = 'FAILED_TASK'
const DELETE_TASK = 'DELETE_TASK';

const DECREASE_CHOREHP = 'DECREASE_CHOREHP';
const INCREASE_CHOREHP = 'INCREASE_CHOREHP';
const DECREASE_EXERCISEHP = 'DECREASE_EXERCISEHP';
const INCREASE_EXERCISEHP = 'INCREASE_EXERCISEHP';
const DECREASE_SOCIALHP = 'DECREASE_SOCIALHP';
const INCREASE_SOCIALHP = 'INCREASE_SOCIALHP';

const updateInfo = user => {
  return {
    type: UPDATE_INFO,
    user
  };
};

const decreaseChoreHP = user => {
  return {
    type: DECREASE_CHOREHP,
    user
  };
};

const increaseChoreHP = user => {
  return {
    type: INCREASE_CHOREHP,
    user
  };
};

const increaseExerciseHP = user => {
  return {
    type: INCREASE_EXERCISEHP,
    user
  };
};

const decreaseExerciseHP = user => {
  return {
    type: DECREASE_EXERCISEHP,
    user
  };
};

const decreaseSocialHP = user => {
  return {
    type: DECREASE_SOCIALHP,
    user
  };
};

const increaseSocialHP = user => {
  return {
    type: INCREASE_SOCIALHP,
    user
  };
};

const addTask = user => {
  return {
    type: ADD_TASK,
    user
  };
};

const deleteTaskAction = user => {
  return {
    type: DELETE_TASK,
    user
  };
};

// const failedTaskAction = (user) =>{
//   return{
//     type:FAILED_TASK,
//     user
//   }
// }

// const updateTask = (user) =>{
//   return{
//     type:UPDATE_TASK,
//     user
//   }
// }

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

const logOutUser = () => {
  return {
    type: LOGOUT_USER
  };
};

export const updateInfoThunk = (username, petName) => {
  return async function(dispatch) {
    try {
      const userKey = await AsyncStorage.getItem('userKey');
      const retrievedData = await AsyncStorage.getItem('loggedinUser');
      const user = JSON.parse(retrievedData);
      renameUserName(userKey, username);
      newPetName(userKey, petName);
      user.UserName = username;
      user.pet.Name = petName;
      AsyncStorage.setItem('loggedinUser', JSON.stringify(user));
      dispatch(updateInfo(user));
    } catch (error) {
      console.error(error);
    }
  };
};

export const decreaseChoreHPThunk = failedTask => {
  return async function(dispatch) {
    try {
      const userKey = await AsyncStorage.getItem('userKey');
      const retrievedData = await AsyncStorage.getItem('loggedinUser');
      const user = JSON.parse(retrievedData);
      TaskFailed(userKey, failedTask);
      user.pet.ChoresHP -= 0.2;
      if (user.pet.ChoresHP < 0) {
        user.pet.ChoresHP = 0;
      }
      HPChange(userKey, user.pet);
      user.failedTasks.push(failedTask);
      let newIncomplete = user.incompleteTasks.filter(current => {
        if (current.id != failedTask.id) {
          return current;
        }
      });
      user.incompleteTasks = newIncomplete;
      AsyncStorage.setItem('loggedinUser', JSON.stringify(user));
      dispatch(decreaseChoreHP(user));
    } catch (error) {
      console.error(error);
    }
  };
};

export const decreaseExerciseHPThunk = failedTask => {
  return async function(dispatch) {
    try {
      const userKey = await AsyncStorage.getItem('userKey');
      const retrievedData = await AsyncStorage.getItem('loggedinUser');
      const user = JSON.parse(retrievedData);
      TaskFailed(userKey, failedTask);
      user.pet.ExerciseHP -= 0.2;
      if (user.pet.ExerciseHP < 0) {
        user.pet.ExerciseHP = 0;
      }
      HPChange(userKey, user.pet);
      user.failedTasks.push(failedTask);
      let newIncomplete = user.incompleteTasks.filter(current => {
        if (current.id != failedTask.id) {
          return current;
        }
      });
      user.incompleteTasks = newIncomplete;
      AsyncStorage.setItem('loggedinUser', JSON.stringify(user));
      dispatch(decreaseExerciseHP(user));
    } catch (error) {
      console.error(error);
    }
  };
};

export const decreaseSocialHPThunk = failedTask => {
  return async function(dispatch) {
    try {
      const userKey = await AsyncStorage.getItem('userKey');
      const retrievedData = await AsyncStorage.getItem('loggedinUser');
      const user = JSON.parse(retrievedData);
      TaskFailed(userKey, failedTask);
      user.pet.SocialHP -= 0.2;
      if (user.pet.SocialHP < 0) {
        user.pet.SocialHP = 0;
      }
      HPChange(userKey, user.pet);
      user.failedTasks.push(failedTask);
      let newIncomplete = user.incompleteTasks.filter(current => {
        if (current.id != failedTask.id) {
          return current;
        }
      });
      user.incompleteTasks = newIncomplete;
      AsyncStorage.setItem('loggedinUser', JSON.stringify(user));
      dispatch(decreaseSocialHP(user));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateTaskThunk = updatedTask => {
  return async function(dispatch) {
    try {
      const userKey = await AsyncStorage.getItem('userKey');
      TaskComplete(userKey, updatedTask); //updates firebase
      const retrievedData = await AsyncStorage.getItem('loggedinUser');
      const user = JSON.parse(retrievedData);
      user.completedTasks.push(updatedTask); //updates asyncStorage
      let newIncomplete = user.incompleteTasks.filter(current => {
        if (current.id != updatedTask.id) {
          return current;
        }
      });
      user.incompleteTasks = newIncomplete;
      AsyncStorage.setItem('loggedinUser', JSON.stringify(user));
      dispatch(updateTask(user)); //uses user object to update redux store
    } catch (error) {
      console.error(error);
    }
  };
};

export const increaseChoreHPThunk = completedTask => {
  return async function(dispatch) {
    try {
      const retrievedData = await AsyncStorage.getItem('loggedinUser');
      const userKey = await AsyncStorage.getItem('userKey');
      const user = JSON.parse(retrievedData);
      TaskComplete(userKey, completedTask);
      user.pet.ChoresHP += 0.1;
      if (user.pet.ChoresHP > 1) {
        user.pet.ChoresHP = 1;
      }
      HPChange(userKey, user.pet);
      user.completedTasks.push(completedTask);
      let newIncomplete = user.incompleteTasks.filter(current => {
        if (current.id != completedTask.id) {
          return current;
        }
      });
      user.incompleteTasks = newIncomplete;
      AsyncStorage.setItem('loggedinUser', JSON.stringify(user));
      dispatch(increaseChoreHP(user));
    } catch (error) {
      console.error(error);
    }
  };
};

export const increaseExerciseHPThunk = completedTask => {
  return async function(dispatch) {
    try {
      const retrievedData = await AsyncStorage.getItem('loggedinUser');
      const userKey = await AsyncStorage.getItem('userKey');
      const user = JSON.parse(retrievedData);
      TaskComplete(userKey, completedTask);
      user.pet.ExerciseHP += 0.1;
      if (user.pet.ExerciseHP > 1) {
        user.pet.ExerciseHP = 1;
      }
      HPChange(userKey, user.pet);
      user.completedTasks.push(completedTask);
      let newIncomplete = user.incompleteTasks.filter(current => {
        if (current.id != completedTask.id) {
          return current;
        }
      });
      user.incompleteTasks = newIncomplete;
      AsyncStorage.setItem('loggedinUser', JSON.stringify(user));
      dispatch(increaseExerciseHP(user));
    } catch (error) {
      console.error(error);
    }
  };
};

export const increaseSocialHPThunk = completedTask => {
  return async function(dispatch) {
    try {
      const retrievedData = await AsyncStorage.getItem('loggedinUser');
      const userKey = await AsyncStorage.getItem('userKey');
      const user = JSON.parse(retrievedData);
      TaskComplete(userKey, completedTask);
      user.pet.SocialHP += 0.1;
      if (user.pet.SocialHP > 1) {
        user.pet.SocialHP = 1;
      }
      HPChange(userKey, user.pet);
      user.completedTasks.push(completedTask);
      let newIncomplete = user.incompleteTasks.filter(current => {
        if (current.id != completedTask.id) {
          return current;
        }
      });
      user.incompleteTasks = newIncomplete;
      AsyncStorage.setItem('loggedinUser', JSON.stringify(user));
      dispatch(increaseSocialHP(user));
    } catch (error) {
      console.error(error);
    }
  };
};

export const addTaskThunk = newTask => {
  return async function(dispatch) {
    try {
      const retrievedData = await AsyncStorage.getItem('loggedinUser');
      const user = JSON.parse(retrievedData);
      user.incompleteTasks.push(newTask);
      AsyncStorage.setItem('loggedinUser', JSON.stringify(user));
      dispatch(addTask(user));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllTasksThunk = allTasks => {
  return function(dispatch) {
    try {
      dispatch(getAllTasks(allTasks));
    } catch (error) {
      console.error(error);
    }
  };
};

// export const failedTaskThunk = failedTask =>{
//   return async function(dispatch){
//     try {
//       const userKey = await AsyncStorage.getItem('userKey')
//       TaskFailed(userKey,failedTask)
//       const retrievedData = await AsyncStorage.getItem('loggedinUser')
//       const user = JSON.parse(retrievedData)
//       user.failedTasks.push(failedTask)
//       let newIncomplete = user.incompleteTasks.filter((current) =>{
//       if(current.name != failedTask.name){
//         return current}
//       })
//       user.incompleteTasks = newIncomplete
//       AsyncStorage.setItem('loggedinUser', JSON.stringify(user))
//       dispatch(failedTaskAction(user))
//     } catch (error) {
//       console.error(error)
//     }
//   }
// }

export const deleteTaskThunk = deletedTask => {
  return async function(dispatch) {
    try {
      const userKey = await AsyncStorage.getItem('userKey');
      deleteTask(userKey, deletedTask);
      const retrievedData = await AsyncStorage.getItem('loggedinUser');
      const user = JSON.parse(retrievedData);
      let newIncomplete = user.incompleteTasks.filter(current => {
        if (current.id != deletedTask.id) {
          return current;
        }
      });
      user.incompleteTasks = newIncomplete;
      AsyncStorage.setItem('loggedinUser', JSON.stringify(user));
      dispatch(deleteTaskAction(user));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getUserThunk = user => dispatch => {
  try {
    dispatch(getUser(user));
  } catch (error) {
    console.error(error);
  }
};

export const getUserKeyThunk = userKey => {
  return function(dispatch) {
    try {
      dispatch(getUserKey(userKey));
    } catch (error) {
      console.error(error);
    }
  };
};

export const logOutUserThunk = () => dispatch => {
  try {
    dispatch(logOutUser());
  } catch (error) {
    console.error(error);
  }
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      AsyncStorage.setItem('loggedinUser', JSON.stringify(action.user));
      return {...state, user: action.user};

    case GET_USER_KEY:
      AsyncStorage.setItem('userKey', action.userKey);
      return {...state, userKey: action.userKey};

    case LOGOUT_USER:
      AsyncStorage.clear();
      return {};

    case UPDATE_INFO:
      return {...state, user: action.user};

    case ADD_TASK:
      return {...state, user: action.user};

    // case UPDATE_TASK:
    //   return {...state,user:action.user}

    // case FAILED_TASK:
    //   return{...state,user:action.user}

    case DELETE_TASK:
      return {...state, user: action.user};

    case INCREASE_CHOREHP:
      return {...state, user: action.user};

    case DECREASE_CHOREHP:
      return {...state, user: action.user};

    case INCREASE_EXERCISEHP:
      return {...state, user: action.user};

    case DECREASE_EXERCISEHP:
      return {...state, user: action.user};

    case INCREASE_SOCIALHP:
      return {...state, user: action.user};

    case DECREASE_SOCIALHP:
      return {...state, user: action.user};

    default:
      return state;
  }
};
