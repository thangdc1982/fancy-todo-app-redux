import { combineReducers } from 'redux';
import todoReducers from './TodoReducer';
import userReducers from './UserReducer';

export const initialState = {};

const rootReducers = combineReducers({
  todos: todoReducers,    
  user: userReducers
});

export default rootReducers;

