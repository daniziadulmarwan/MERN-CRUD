import { legacy_createStore as createStore, combineReducers } from 'redux'
import { UserReducer } from './user-reducer'
import { AlertReducer } from './alert-reducer'

const reducer = combineReducers({UserReducer,AlertReducer})

const store = createStore(reducer)

export default store