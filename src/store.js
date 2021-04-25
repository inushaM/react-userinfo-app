import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/rootReducer'
// import logger from 'redux-logger'
import thunk from 'redux-thunk'; 

//store the loginReducer object
const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
