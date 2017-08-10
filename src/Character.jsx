import {directionMatrixToAngle} from "./helper"

/**
   Position vector for 2 dimensional space
   @typedef {Object} Position -
   @property {number} x - Horizontal position
   @property {number} y - Vertical position
 */

/**
   Direction vector for 2 dimensional space
   @typedef {Object} Direction -
   @property {number} x - Horizontal direction
   @property {number} y - Vertical direction
 */

/**
   Position vector for 2 dimensional space
   @typedef {Object} CharacterArgument -
   @property {Position} position - Starting position of the character.
   @property {number} speed - Movement speed of the character.
 */

/** Character is the main unit of the game. */
export default class Character {
  /**
     @param {CharacterArgument} args - Argument object to pass to the character.
   */
  constructor(args) {
    this.position = args.position
    this.speed = args.speed

    this.rotation = 180
  }

  /**
     Moves the character in the direction.
     @param {Direction} direction
   */
  move(direction) {
    if (JSON.stringify(direction) !== JSON.stringify({x: 0, y: 0}))
      this.rotation = directionMatrixToAngle(direction)
    const newPosX = this.position.x + direction.x * this.speed
    const newPosY = this.position.y + direction.y * this.speed
    if (newPosX <= 500 && newPosX >= 0) this.position.x = newPosX
    if (newPosY <= 500 && newPosY >= 0) this.position.y = newPosY
  }

  /** @return {Position} */
  getPosition() {
    return this.position
  }

  /**
     Draws the Character, shaped like an arrow.
     @param {CanvasRenderingContext2D} context
   */
  draw(context) {
    // Draw
    context.save()
    context.translate(this.position.x, this.position.y)
    context.rotate(this.rotation * Math.PI / 180)
    context.strokeStyle = "#ffffff"
    context.fillStyle = "#000000"
    context.lineWidth = 2
    context.beginPath()
    context.moveTo(0, -15)
    context.lineTo(10, 10)
    context.lineTo(5, 7)
    context.lineTo(-5, 7)
    context.lineTo(-10, 10)
    context.closePath()
    context.fill()
    context.stroke()
    context.restore()
  }
}
