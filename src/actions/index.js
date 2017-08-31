export const nil = () => {}
export const editCharacterPosition = ({position: {x, y}}) => ({
  type: "EDIT_CHARACTER_POSITION",
  position: {x, y}
})
export const editCharacterSpeed = ({speed}) => ({
  type: "EDIT_CHARACTER_SPEED",
  speed
})
export const editCharacterRotation = ({rotation}) => ({
  type: "EDIT_CHARACTER_ROTATION",
  rotation
})

