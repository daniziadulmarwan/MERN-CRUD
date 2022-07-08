const initialState = {
  name: "Dani Ziadul Marwan",
  alert: ""
}

type Alert = {
  type:string,
  payload:string,
}

export const AlertReducer = (state = initialState, action:Alert) => {
  if(action.type === 'ALERT') {
    return {
      ...state,
      alert: action.payload
    }
  }

  return state
}