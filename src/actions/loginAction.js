import { FETCH_LOGIN_REQUEST, FETCH_LOGIN_SUCCESS, FETCH_LOGIN_FAILURE } from './loginTypes'
import { history } from '../utils/history';
const axios = require('axios')


export const loginActions = {
    fetchToken,
    fetchLoginRequest,
    fetchLoginSuccess,
    fetchLoginFailure,
};

//this is the event of login and get access token
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
                    history.push('/Dashboard')
                }
                else {
                    history.push("/")
                }
            })
            .catch(error => {
                dispatch(fetchLoginFailure(error.message))
                history.push("/")
            })
    }
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