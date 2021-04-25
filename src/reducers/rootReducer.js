import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import userReducer from './userReducer'

//combined two reducers and export as single
const rootReducer = combineReducers({
    login: loginReducer,
    userData: userReducer
})

export default rootReducer