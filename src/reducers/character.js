const initialState = {position: {x: 15, y: 15}, speed: 5}

export default function character(state = initialState, action) {
  switch (action.type) {
    case "EDIT_CHARACTER_POSITION":
      return {
        ...state,
        position: action.position
      }
    case "EDIT_CHARACTER_SPEED":
      return {
        ...state,
        speed: action.speed
      }
    default:
      return state
  }
}
