import React, {Component} from "react"
import "./App.css"

import Character from "./Character"
import {clamp, directionMatrixToAngle, keysToDirection} from "./helper"
import {drawMap, drawCharacter, drawScene} from "./Scene"

const KEY = {
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40,
  A: 65,
  D: 68,
  W: 87,
  S: 83,
  SPACE: 32
}

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      window: {
        width: window.innerWidth,
        height: window.innerHeight,
        ratio: window.devicePixelRatio || 1
      },
      startingTime: new Date(),
      context: null,
      keys: {
        left: false,
        right: false,
        up: false,
        down: false
      }
    }

    this.map = {
      height: 1000,
      ratio: window.devicePixelRatio || 1
    }

    this.window = {}

    this.scene = {
      x: 0,
      y: 0,
      width: 200,
      height: 200
    }

    this.character = new Character({
      position: {x: this.scene.width / 2, y: this.scene.height / 2},
      speed: 5
    })

    // this.camera = {
    //   x: (this.screen.height + this.character.position.x) / 3,
    //   y: (this.screen.height + this.character.position.y) / 3
    // }
  }

  handleResize(value, e) {
    //TODO
    /* this.setState({
     *   screen: {
     *     camera: this.character.position,
     *     width: window.innerWidth,
     *     height: window.innerHeight,
     *     ratio: window.devicePixelRatio || 1
     *   }
     * })*/
  }

  /**
     @param {boolean} value
     @param {Event} e
   */
  handleKeys(value, e) {
    let keys = this.state.keys
    if (e.keyCode === KEY.LEFT || e.keyCode === KEY.A) keys.left = value
    if (e.keyCode === KEY.RIGHT || e.keyCode === KEY.D) keys.right = value
    if (e.keyCode === KEY.UP || e.keyCode === KEY.W) keys.up = value
    if (e.keyCode === KEY.DOWN || e.keyCode === KEY.S) keys.down = value
    /* if (e.keyCode === KEY.SPACE) keys.space = value*/
    this.setState({
      keys: keys
    })
  }

  componentDidMount() {
    window.addEventListener("keyup", this.handleKeys.bind(this, false))
    window.addEventListener("keydown", this.handleKeys.bind(this, true))
    window.addEventListener("resize", this.handleResize.bind(this, false))

    const context = this.refs.canvas.getContext("2d")
    this.setState({
      context: context
    })
    this.startGame()
    requestAnimationFrame(() => this.update())
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleKeys)
    window.removeEventListener("resize", this.handleKeys)
    window.removeEventListener("resize", this.handleResize)
  }

  startGame() {
    /* this.createObject(character, "character")*/
  }

  // /**
  //    Draws the lines across the whole board.
  //    @param {CanvasRenderingContext2D} context
  //    @param {number} lineDistance - Number of pixel between each line
  //  */
  // drawLines(context, lineDistance) {
  //   const xLines = this.screen.width / lineDistance
  //   const yLines = this.screen.height / lineDistance

  //   // Draw
  //   context.save()
  //   context.translate(this.camera.x, this.camera.y)
  //   context.strokeStyle = "#ffffff"
  //   context.fillStyle = "#000000"
  //   context.lineWidth = 2

  //   for (let x = 0; x <= xLines; x++) {
  //     context.beginPath()
  //     context.moveTo(lineDistance * x, 0)
  //     context.lineTo(lineDistance * x, this.screen.height)
  //     context.closePath()
  //     context.fill()
  //     context.stroke()
  //   }
  //   for (let y = 0; y <= yLines; y++) {
  //     context.beginPath(0, lineDistance * y)
  //     context.moveTo(0, lineDistance * y)
  //     context.lineTo(this.screen.width, lineDistance * y)
  //     context.closePath()
  //     context.fill()
  //     context.stroke()
  //   }
  //   context.restore()
  // }

  // /**
  //    Draws the red boxes underneath the character, denoting the placement of
  //    buildings
  //    @param {CanvasRenderingContext2D} context
  //    @param {number} lineDistance - Number of pixels between each line
  // */
  // drawBuildingLine(context, lineDistance) {
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

  // /**
  //    @param {CanvasRenderingContext2D} context
  //    @param {Character} char
  // */
  // draw(context, char) {
  //   const lineLength = 100
  //   // draw building block
  //   this.drawBuildingLine(context, lineLength)

  //   // lines
  //   this.drawLines(context, lineLength)

  //   // draw character
  //   char.draw(context)
  // }

  /** */
  drawDebugInfo() {
    const frameTime = new Date()
    const context = this.state.context
    // info
    context.save()
    context.fillStyle = "#fff"
    context.fillRect(0, 0, 100, this.state.window.height)
    context.fillStyle = "red"
    context.fillText(JSON.stringify(this.character.position), 10, 200)
    context.fillText(
      (frameTime.getTime() - this.state.startingTime.getTime()) / 1000,
      10,
      250
    )
    context.fillText(JSON.stringify(this.scene), 10, 300)
    context.restore()
  }

  updateScenePosition() {
    this.scene = {
      x: this.character.position.x - this.character.startingPosition.x,
      y: this.character.position.y - this.character.startingPosition.y,
      width: this.scene.width,
      height: this.scene.height
    }
  }

  update() {
    this.character.move(keysToDirection(this.state.keys))
    this.updateScenePosition()

    const window = {
      x: this.state.window.width,
      y: this.state.window.height
    }

    drawScene(this.state.context, this.state.window, this.character, this.scene)
    // drawMap(this.state.context, this.screen)
    // drawCharacter(this.character, this.state.context)
    this.drawDebugInfo(this.character)

    // // Background
    // // context.fillStyle = "#000"
    // // context.globalAlpha = 0.4
    // // context.globalAlpha = 1

    // this.move(char)
    // this.draw(context, char)

    requestAnimationFrame(() => this.update())
  }

  render() {
    return (
      <div className="App">
        <canvas
          ref="canvas"
          width={this.state.window.width * this.state.window.ratio}
          height={this.state.window.height * this.state.window.ratio}
        />
      </div>
    )
  }
}
