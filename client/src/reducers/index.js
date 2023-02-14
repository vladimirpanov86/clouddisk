import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import userReducer from './userReducer'
import fileReducer from './fileReducer'

const rootReducer = combineReducers({
  user: userReducer,
  files: fileReducer
})

export const store = configureStore({ reducer: rootReducer }, composeWithDevTools(applyMiddleware(thunk)))