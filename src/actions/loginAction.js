import { FETCH_LOGIN_REQUEST, FETCH_LOGIN_SUCCESS, FETCH_LOGIN_FAILURE } from './loginTypes'
import { history } from '../utils/history';
const axios = require('axios')

export const loginActions = {
    fetchToken,
    fetchLoginRequest,
    fetchLoginSuccess,
    fetchLoginFailure,
};

function fetchToken(username, password) {
    
    return (dispatch) => {
        dispatch(fetchLoginRequest())
        axios.post('http://apps.avantrio.xyz:8010/api/user/login', {
            username: username,
            password: password
        })
            .then(response => {
                if (response.data.token) {
                    const info = response.data.token
                    dispatch(fetchLoginSuccess(info))
                    history.push('/DashBoard')
                    refreshPage()
                }
                else {
                    history.push("/")
                    refreshPage()
                }
            })
            .catch(error => {
                dispatch(fetchLoginFailure(error.message))
                history.push("/")
                refreshPage()
            })
    }
}

function refreshPage() {
    window.location.reload(false);
  }

function fetchLoginRequest() {
    return {
        type: FETCH_LOGIN_REQUEST
    }
}

function fetchLoginSuccess(info) {
    return {
        type: FETCH_LOGIN_SUCCESS,
        payload: info
    }
}

function fetchLoginFailure(error) {
    return {
        type: FETCH_LOGIN_FAILURE,
        payload: error
    }
}