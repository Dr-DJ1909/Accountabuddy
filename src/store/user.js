const initialState = {
  user: {},
}

export const GET_USER = 'GET_USER';

export const getUser = ({user}) => {
    return {
        type: GET_USER,
        user
    }
}

export const getUserThunk = () => {
  console.log('the thunk is being accessed')
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user
    case ADD_STUDENT:
      return [...state, action.student]
    default:
      return state
  }
}
