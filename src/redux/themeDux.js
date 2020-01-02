//import { createStore } from 'redux'
//import { composeWithDevTools } from 'redux-devtools-extension'
//import thunkMiddleware from 'redux-thunk'
//import axios from 'axios'
//import { baseUrl, userRequest, pageLoader } from '../connections/api'

const initialState = {
    theme: "light"
}

const actionTypes = {
    CHANGE_THEME: 'CHANGE_THEME',
}

// ACTIONS

export const changeTheme = payload => {
    return {
        type: actionTypes.CHANGE_THEME,
        payload
    }
}

// REDUCERS

export const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_THEME: return {
            ...state,
            theme: action.payload
        }
        default: return state
    }
}
