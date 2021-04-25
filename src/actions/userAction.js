import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from './userTypes'
import { history } from '../utils/history';
const axios = require('axios')

export const userActions = {
    fetchUsers,
    fetchUserRequest,
    fetchUserSuccess,
    fetchUserFailure,
};

function fetchUsers(token) {
    
    return (dispatch) => {
        
        dispatch(fetchUserRequest())
        axios.get('http://apps.avantrio.xyz:8010/api/users' , { headers: {"Authorization" : `Bearer ${token}`} })
            .then(response => {
                if (response.data) {
                    const user = response.data
                    dispatch(fetchUserSuccess(user))
                }
                else {
                    history.push("/")
                }
            })
            .catch(error => {
                dispatch(fetchUserFailure(error.message))
                history.push("/")
            })
    }
}

function fetchUserRequest() {
    return {
        type: FETCH_USER_REQUEST
    }
}

function fetchUserSuccess(users) {
    return {
        type: FETCH_USER_SUCCESS,
        payload: users
    }
}

function fetchUserFailure(error) {
    return {
        type: FETCH_USER_FAILURE,
        payload: error
    }
}
