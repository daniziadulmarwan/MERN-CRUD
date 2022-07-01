import { legacy_createStore as createStore} from 'redux'

const initialState = {
  teachers: [],
  name: 'Fayha ZM',
  users: [],
}

const reducer = (state = initialState, action) => {
  if(action.type === 'UPDATE_DATA_TEACHER') {
    return {
      ...state,
      teachers: action.payload
    }
  }

  if(action.type === 'UPDATE_NAME') {
    return {
      ...state,
      name: 'Dani ZM'
    }
  }

  if(action.type === 'UPDATE_USER') {
    return {
      ...state,
      users: action.payload
    }
  }

  return state
}

const store = createStore(reducer)

export default store