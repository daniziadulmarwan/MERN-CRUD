import { legacy_createStore as createStore, combineReducers} from 'redux'

const initialStateHome = {
  name:"",
  alert: ""
}

const HomeReducer = (state = initialStateHome, action) => {
  if(action.type === "UPDATE_NAME") {
    return {
      ...state,
      name: "ZEITEIM TECH"
    }
  }

  if(action.type === 'ALERT') {
    return {
      ...state,
      alert: action.payload
    }
  }

  return state
}

const initialStateUser = {
  users: [],
}

const UserReducer = (state = initialStateUser, action) => {
  if(action.type === 'UPDATE_USER') {
    return {
      ...state,
      users: action.payload
    }
  }

  return state
}

const reducer = combineReducers({HomeReducer,UserReducer})

const store = createStore(reducer)

export default store