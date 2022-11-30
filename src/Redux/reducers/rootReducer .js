import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import TasksReducer from './TasksReducer';

/**
 *Функция ,связана с объединением всех reducer в один
 */
const rootReducer = combineReducers({
    tasks:TasksReducer,
  
})

export const  store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));