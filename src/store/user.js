const initialState = {
  user: {},
}

export const GET_USER = 'GET_USER';

export const getUser = () => {
    return {
        type: GET_USER,
        // user
    }
}

export const getUserThunk = () => dispatch => {
  try {
    console.log('the thunk is being accessed');
    dispatch(getUser());
  } catch(error) {
    console.error(error);
  }
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return state
    default:
      return state
  }
}
