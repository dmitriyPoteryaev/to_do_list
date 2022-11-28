import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import TasksReducer from './TasksReducer';


const rootReducer = combineReducers({
    tasks:TasksReducer,
  
})

export const  store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));