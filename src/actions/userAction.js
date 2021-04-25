import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from './userTypes'
import { history } from '../utils/history';
const axios = require('axios')


export const loginActions = {
    fetchToken,
    fetchUserRequest,
    fetchUserSuccess,
    fetchUserFailure,
};

function fetchUsers(username, password) {
    
    return (dispatch) => {
        dispatch(fetchUserRequest())
        axios.post('http://apps.avantrio.xyz:8010/api/user/login', {
            username: username,
            password: password
        })
            .then(response => {
                if (response.data.token) {
                    const info = response.data
                    dispatch(fetchUserSuccess(info))
                    history.push('/DashBoard')
                    refreshPage()
                }
                else {
                    history.push("/")
                    refreshPage()
                }
            })
            .catch(error => {
                dispatch(fetchUserFailure(error.message))
                history.push("/")
                refreshPage()
            })
    }
}

function refreshPage() {
    window.location.reload(false);
  }

function fetchUserRequest() {
    return {
        type: FETCH_USER_REQUEST
    }
}

function fetchUserSuccess(info) {
    return {
        type: FETCH_USER_SUCCESS,
        payload: info
    }
}

function fetchUserFailure(error) {
    return {
        type: FETCH_USER_FAILURE,
        payload: error
    }
}
