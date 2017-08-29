import * as PIXI from "pixi.js"

/**
   @param {CanvasRenderingContext2D} context -
   @param {{width: number, height: number}} window -
   @param {{rotation: number}} character -
   @param {{x: number, y: number}} scene -
 */
export function drawScene(context, window, character, scene) {
  context.save()
  context.fillStyle = "#112233"
  context.fillRect(100, 100, scene.width, scene.height)
  context.restore()

  const position = {
    x: 100 + scene.width / 2,
    y: 100 + scene.height / 2
  }
  drawCharacter(character, context, position)
}

/**
   Draws the full map onto the screen. (Ideally we'll only want to draw a
   scene.)
   @param {CanvasRenderingContext2D} context -
   @param {{height: number, width: number}} screen -
 */
export function drawMap(context, screen) {
  context.save()
  context.fillStyle = "#112233"
  context.fillRect(0, 0, screen.width, screen.height)
  context.restore()
}

/**
   Draws the Character, shaped like an arrow.
   @param {Character} character -
   @param {CanvasRenderingContext2D} context -
   @param {{x: number, y: number}} position -
 */
export function drawCharacter(character, context, position) {
  const graphics = new PIXI.Graphics()
  graphics.beginFill(0x00ff00)
  graphics.moveTo(0, -15)
  graphics.lineTo(10, 10)
  graphics.lineTo(5, 7)
  graphics.lineTo(-5, 7)
  graphics.lineTo(-10, 10)
  graphics.endFill()

  // context.save()
  // context.translate(position.x, position.y)
  // context.rotate(character.rotation * Math.PI / 180)
  // context.strokeStyle = "#ffffff"
  // context.fillStyle = "#000000"
  // context.lineWidth = 2
  // context.beginPath()
  // context.moveTo(0, -15)
  // context.lineTo(10, 10)
  // context.lineTo(5, 7)
  // context.lineTo(-5, 7)
  // context.lineTo(-10, 10)
  // context.closePath()
  // context.fill()
  // context.stroke()
  // context.restore()
}

// function drawBuildingLine(context, lineDistance) {
//   const squares = 2 * this.screen.width / lineDistance
//   const gridPosition = {
//     x: clamp(
//       Math.floor(
//         squares *
//           (this.character.position.x - this.camera.x) /
//           this.screen.width
//       )
//     )(0, 9),
//     y: clamp(
//       Math.floor(
//         squares *
//           (this.character.position.y - this.camera.y) /
//           this.screen.height
//       )
//     )(0, 9)
//   }
//   context.save()
//   context.strokeStyle = "red"
//   context.lineWidth = "5"
//   context.translate(this.camera.x, this.camera.y)
//   context.rect(
//     lineDistance * gridPosition.x / 2,
//     lineDistance * gridPosition.y / 2,
//     lineDistance / 2,
//     lineDistance / 2
//   )
//   context.stroke()
//   context.restore()
// }
