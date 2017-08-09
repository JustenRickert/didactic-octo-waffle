import {directionMatrixToAngle} from "./helper"

export default class Character {
  constructor(args) {
    this.position = args.position
    this.speed = args.speed

    this.rotation = 180
  }

  move(direction) {
    if (JSON.stringify(direction) !== JSON.stringify({x: 0, y: 0}))
      this.rotation = directionMatrixToAngle(direction)
    const newPosX = this.position.x + direction.x * this.speed
    const newPosY = this.position.y + direction.y * this.speed
    if (newPosX <= 500 && newPosX >= 0) this.position.x = newPosX
    if (newPosY <= 500 && newPosY >= 0) this.position.y = newPosY
  }

  getPosition() {
    return this.position
  }

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
