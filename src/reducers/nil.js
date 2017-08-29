const initialState = [{}]

export default function nil(state = initialState, action) {
  switch (action.type) {
    case "":
      return [{}]
    default:
      return state
  }
}
