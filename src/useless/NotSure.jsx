
/**
   Draws the lines across the whole board.
   @param {CanvasRenderingContext2D} context
   @param {number} lineDistance - Number of pixel between each line
 */
drawLines(context, lineDistance) {
  const xLines = this.screen.width / lineDistance
  const yLines = this.screen.height / lineDistance

  // Draw
  context.save()
  context.translate(this.camera.x, this.camera.y)
  context.strokeStyle = "#ffffff"
  context.fillStyle = "#000000"
  context.lineWidth = 2

  for (let x = 0; x <= xLines; x++) {
    context.beginPath()
    context.moveTo(lineDistance * x, 0)
    context.lineTo(lineDistance * x, this.screen.height)
    context.closePath()
    context.fill()
    context.stroke()
  }
  for (let y = 0; y <= yLines; y++) {
    context.beginPath(0, lineDistance * y)
    context.moveTo(0, lineDistance * y)
    context.lineTo(this.screen.width, lineDistance * y)
    context.closePath()
    context.fill()
    context.stroke()
  }
  context.restore()
}

/**
   Draws the red boxes underneath the character, denoting the placement of
   buildings
   @param {CanvasRenderingContext2D} context
   @param {number} lineDistance - Number of pixels between each line
*/
drawBuildingLine(context, lineDistance) {
  const squares = 2 * this.screen.width / lineDistance
  const gridPosition = {
    x: clamp(
      Math.floor(
        squares *
          (this.character.position.x - this.camera.x) /
          this.screen.width
      )
    )(0, 9),
    y: clamp(
      Math.floor(
        squares *
          (this.character.position.y - this.camera.y) /
          this.screen.height
      )
    )(0, 9)
  }
  context.save()
  context.strokeStyle = "red"
  context.lineWidth = "5"
  context.translate(this.camera.x, this.camera.y)
  context.rect(
    lineDistance * gridPosition.x / 2,
    lineDistance * gridPosition.y / 2,
    lineDistance / 2,
    lineDistance / 2
  )
  context.stroke()
  context.restore()
}

/**
   @param {CanvasRenderingContext2D} context
   @param {Character} char
*/
draw(context, char) {
  const lineLength = 100
  // draw building block
  this.drawBuildingLine(context, lineLength)

  // lines
  this.drawLines(context, lineLength)

  // draw character
  char.draw(context)
}
