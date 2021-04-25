
import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from '../actions/userTypes'

const initialState = {
    loading: false,
    users: [],
    error: ''
}

const userReducer = (state = initialState, atcion) => {
    switch (atcion.type) {
        case FETCH_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USER_SUCCESS:
            return {
                loading: false,
                users: atcion.payload,
                error: ''
            }
        case FETCH_USER_FAILURE:
            return {
                loading: false,
                users: [],
                error: atcion.payload
            }
        default: return state
    }
}

export default userReducer