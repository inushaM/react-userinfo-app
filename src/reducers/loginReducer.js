
import { FETCH_LOGIN_REQUEST, FETCH_LOGIN_SUCCESS, FETCH_LOGIN_FAILURE } from '../actions/loginTypes'

const initialState = {
    loading: false,
    info: [],
    error: ''
}

const loginReducer = (state = initialState, atcion) => {
    switch (atcion.type) {
        case FETCH_LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_LOGIN_SUCCESS:
            return {
                loading: false,
                info: atcion.payload,
                error: ''
            }
        case FETCH_LOGIN_FAILURE:
            return {
                loading: false,
                info: [],
                error: atcion.payload
            }
        default: return state
    }
}

export default loginReducer