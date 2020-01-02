import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { themeReducer } from './themeDux'
import { userReducer } from './userDux'
import {commitsReducer} from './commitsDux'



// const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const rootReducer = combineReducers({ themeMode: themeReducer, userData: userReducer, commitsData: commitsReducer })
export const initializeStore = () => {
  return createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}