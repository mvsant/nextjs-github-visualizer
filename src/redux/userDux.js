import axios from 'axios'
import { baseUrl, userRequest, pageLoader } from '../connections/api'

const initialState = {
    name: '',
    userCredentials: [],
    repos: [],
    reqParams: {
        page: 1,
        order: 'asc',
        itensPerLoad: '20',
    },
    userError: '',
    reposError: '',
    loading: false,
}

const actionTypes = {
    USER: 'USER',

    USER_REQUEST: 'USER_REQUEST',
    USER_SUCCESSFUL_RESPONSE: 'USER_SUCCESSFUL_RESPONSE',
    USER_FAILED_RESPONSE: 'USER_FAILED_RESPONSE',

    REPOS_REQUEST: 'REPOS_REQUEST',
    REPOS_SUCCESSFUL_RESPONSE: 'REPOS_SUCCESSFUL_RESPONSE',
    REPOS_SUCCESSFUL_SEQUENTIAL_RESPONSE: 'REPOS_SUCCESSFUL_SEQUENTIAL_RESPONSE',
    REPOS_RESPONSE_PARAMETERS: 'REPOS_RESPONSE_PARAMETERS',
    REPOS_FAILED_RESPONSE: 'REPOS_FAILED_RESPONSE',
}

// ACTIONS

export const userTyped = payload => {
    return {
        type: actionTypes.USER,
        payload
    }
}

const userRequestAction = payload => {
    return {
        type: actionTypes.USER_REQUEST,
        payload
    }
}

export const userRequestSent = user => {
    if (user === '' || user === name) {
        return function (dispatch) {
            dispatch(failedUserResponse('Invalid user request'))
        }
    }
    else {
        userRequest.url = `${baseUrl + user}`;
        return function (dispatch) {
            //loading 
            dispatch(userRequestAction(user))
            axios(userRequest)
                .then(userResponse => {
                    const userReceived = userResponse.data
                    dispatch(successfulUserResponse(userReceived))
                })
                .catch(error => {
                    dispatch(failedUserResponse(error.message))
                })
        }
    }
}

const successfulUserResponse = payload => {
    return {
        type: actionTypes.USER_SUCCESSFUL_RESPONSE,
        payload
    }
}

const failedUserResponse = payload => {
    return {
        type: actionTypes.USER_FAILED_RESPONSE,
        payload
    }
}

//repos actions

const reposRequestAction = payload => {
    return {
        type: actionTypes.REPOS_REQUEST,
        payload
    }
}

export const reposRequestSent = user => {
    const {userName} = user
    const {currentPage} = user
    const {currentOrder} = user
    if (userName === '' || userName === undefined /* || userName === name */) {
        return function (dispatch) {
            return dispatch(failedReposResponse('Repositories not found!'))
        }
    }
    else {
        userRequest.url = `${baseUrl + userName}/repos`;
        userRequest.params = { page: `${currentPage}`, direction: `${currentOrder}`, 
        per_page: `${initialState.reqParams.itensPerLoad}` };
        return function (dispatch) {
            //loading 
            dispatch(reposRequestAction())
            axios(userRequest)
                .then(reposResponse => {
                    const repos = reposResponse.data
                    if (currentPage === 1) {
                        dispatch(successfulReposResponse(repos))
                    }
                    else {
                        dispatch(successfulSequentialReposResponse(repos))
                    }
                })
                .catch(error => {
                    dispatch(failedReposResponse(error.message))
                })
        }
    }
}

const successfulReposResponse = payload => {
    return {
        type: actionTypes.REPOS_SUCCESSFUL_RESPONSE,
        payload
    }
}

const successfulSequentialReposResponse = payload => {
    return {
        type: actionTypes.REPOS_SUCCESSFUL_SEQUENTIAL_RESPONSE,
        payload
    }
}

export const requestParameters = payload => {
    return {
        type: actionTypes.REPOS_RESPONSE_PARAMETERS,
        payload
    }
}

const failedReposResponse = payload => {
    return {
        type: actionTypes.REPOS_FAILED_RESPONSE,
        payload
    }
}

// REDUCERS

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER:
            return {
                ...state,
                name: action.payload
            }
        case actionTypes.USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.USER_SUCCESSFUL_RESPONSE: return {
            ...state,
            userCredentials: action.payload,
            userError: '',
            reposError: '',
            loading: false
        }
        case actionTypes.USER_FAILED_RESPONSE: return {
            ...state,
            userCredentials: [],
            repos: [],
            userError: action.payload,
            loading: false
        }
        //repos cases
        case actionTypes.REPOS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.REPOS_SUCCESSFUL_RESPONSE: return {
            ...state,
            repos: action.payload,
            userError: '',
            reposError: '',
            loading: false
        }
        case actionTypes.REPOS_FAILED_RESPONSE: return {
            ...state,
            userCredentials: [],
            repos: [],
            reposError: action.payload,
            loading: false
        }
        case actionTypes.REPOS_SUCCESSFUL_SEQUENTIAL_RESPONSE: return {
            ...state,
            repos: [...state.repos, ...action.payload],
            userError: '',
            reposError: '',
            loading: false
        }
        case actionTypes.REPOS_RESPONSE_PARAMETERS: return {
            ...state,
            reqParams: action.payload,
            loading: false
        }
        default: return state
    }
}