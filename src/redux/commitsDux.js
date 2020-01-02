import axios from 'axios'
import { baseUrl, userRequest, pageLoader } from '../connections/api'

const initialState = {
    repoChosen: '',
    commits: [],
    error: '',
    loading: false,
}

const actionTypes = {
    REPO_CHOSEN: 'REPO_CHOSEN',
    COMMITS_REQUEST: 'COMMITS_REQUEST',
    COMMITS_SUCCESSFUL_RESPONSE: 'COMMITS_SUCCESSFUL_RESPONSE',
    COMMITS_FAILED_RESPONSE: 'COMMITS_FAILED_RESPONSE',
}

// ACTIONS

export const repoChosen = payload => {
    return {
        type: actionTypes,
        payload
    }
}

export const commitsRequestSent = commitsUrl => {
    if (commitsUrl === '' || commitsUrl === undefined) {
        return function (dispatch) {
          dispatch(failedCommitsResponse('Commits Not Found'))
        }
      }
      else {
        userRequest.url = `${commitsUrl.replace('{/sha}', '')}`
        return function (dispatch) {
          axios(userRequest)
            .then(response => {
              const commits = response.data
              dispatch(successfulCommitsResponse(commits))
            })
            .catch(commitsError => {
              dispatch(failedCommitsResponse(commitsError.message))
            })
        }
      }
}

export const successfulCommitsResponse = payload => {
    return {
        type: actionTypes.COMMITS_SUCCESSFUL_RESPONSE,
        payload
    }
}

export const failedCommitsResponse = payload => {
    return {
        type: actionTypes.COMMITS_FAILED_RESPONSE,
        payload
    }
}

// REDUCERS

export const commitsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.COMMITS_REQUEST:
            return {
                ...state,
                repoChosen:action.payload
            }
        case actionTypes.COMMITS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.COMMITS_SUCCESSFUL_RESPONSE: return {
            ...state,
            commits: action.payload,
            loading: false
        }
        case actionTypes.COMMITS_FAILED_RESPONSE: return {
            ...state,
            name: '',
            error:action.payload,
            loading: false
        }
        default: return state
    }
}