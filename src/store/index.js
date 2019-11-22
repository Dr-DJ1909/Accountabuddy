import { createStore, combineReducers, applyMiddleware } from 'redux';
import { userReducer } from './user';

const reducer = combineReducers({
  user: userReducer
});
const store = createStore(reducer);

export default store;
