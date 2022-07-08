const initialState = {
  users: []
}

type User = {
  type:string,
  payload: string|object
}

export const UserReducer = (state = initialState, action: User) => {
  if(action.type === 'UPDATE_USER') {
    return {
      ...state,
      users: action.payload
    }
  }

  return state
}