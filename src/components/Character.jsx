import {directionMatrixToAngle, clone} from "./../helper"

/**
   Position vector for 2 dimensional space
   @typedef {Object} CharacterArgument -
   @property {{x: number, y: number}} position - Starting position of the character.
   @property {number} speed - Movement speed of the character.
*/

/** Character is the main unit of the game. */
export default class Character {
  /**
     @param {CharacterArgument} arg - Argument object to pass to the character.
   */
  constructor(arg) {
    this.startingPosition = clone(arg.position)
    this.position = arg.position
    this.speed = arg.speed

    this.rotation = 0
  }

  /**
     Moves the character in the direction
     @param {{x: number, y: number}} direction -
  */
  move(direction) {
    if (JSON.stringify(direction) !== JSON.stringify({x: 0, y: 0}))
      this.rotation = directionMatrixToAngle(direction)
    const newPosX = this.position.x + direction.x * this.speed
    const newPosY = this.position.y + direction.y * this.speed
    // if (newPosX <= 500 && newPosX >= 0)
    this.position.x = newPosX
    // if (newPosY <= 500 && newPosY >= 0)
    this.position.y = newPosY
  }
}
