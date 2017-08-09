import React, {Component} from "react"
import "./App.css"

import Character from "./Character"
import {clamp} from "./helper"

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

function keysToDirection(keys) {
  const direction = {x: 0, y: 0}
  if (keys.left) direction.x = -1
  if (keys.right) direction.x = 1
  if (keys.up) direction.y = -1
  if (keys.down) direction.y = 1
  return direction
}

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      /* screen: {
       *   width: 500,
       *   height: 500,
       *   ratio: window.devicePixelRation || 1
       * },*/
      /* startingTime: new Date(),
       * context: null,*/
      keys: {
        left: 0,
        right: 0,
        up: 0,
        down: 0
      }
    }

    this.screen = {
      width: 500,
      height: 500,
      ratio: window.devicePixelRatio || 1
    }

    this.character = new Character({
      position: {x: this.screen.width / 2, y: this.screen.height / 2},
      speed: 5
    })
    this.camera = {
      x: (this.screen.height + this.character.position.x) / 3,
      y: (this.screen.height + this.character.position.y) / 3
    }
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

  drawLines(context, lineLength) {
    const xLines = this.screen.width / lineLength
    const yLines = this.screen.height / lineLength

    // Draw
    context.save()
    context.translate(this.camera.x, this.camera.y)
    context.strokeStyle = "#ffffff"
    context.fillStyle = "#000000"
    context.lineWidth = 2

    for (let x = 0; x <= xLines; x++) {
      context.beginPath()
      context.moveTo(lineLength * x, 0)
      context.lineTo(lineLength * x, this.screen.height)
      context.closePath()
      context.fill()
      context.stroke()
    }
    for (let y = 0; y <= yLines; y++) {
      context.beginPath(0, lineLength * y)
      context.moveTo(0, lineLength * y)
      context.lineTo(this.screen.width, lineLength * y)
      context.closePath()
      context.fill()
      context.stroke()
    }
    context.restore()
  }

  drawBuildingLine(context, lineLength) {
    const squares = 2 * this.screen.width / lineLength
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
      lineLength * gridPosition.x / 2,
      lineLength * gridPosition.y / 2,
      lineLength / 2,
      lineLength / 2
    )
    context.stroke()
    context.restore()
  }

  move(char) {
    // Character move
    char.move(keysToDirection(this.state.keys))

    // Camera move
    this.camera = {
      x: (500 / 2 - this.character.position.x) / 3,
      y: (500 / 2 - this.character.position.y) / 3
    }
  }

  draw(context, char) {
    const lineLength = 100
    // draw building block
    this.drawBuildingLine(context, lineLength)

    // lines
    this.drawLines(context, lineLength)

    // draw character
    char.draw(context)
  }

  update() {
    const context = this.state.context
    const char = this.character
    const frameTime = new Date()

    // info
    context.save()
    context.fillStyle = "red"
    context.fillText(
      (frameTime.getTime() - this.state.startingTime.getTime()) / 1000,
      10,
      250
    )
    context.fillText(JSON.stringify(char.position), 10, 200)
    context.restore()

    // Motion trail
    context.save()
    context.fillStyle = "#000"
    context.globalAlpha = 0.4
    context.fillRect(0, 0, this.screen.width, this.screen.height)
    context.globalAlpha = 1
    context.restore()

    this.move(char)
    this.draw(context, char)

    requestAnimationFrame(() => this.update())
  }

  render() {
    return (
      <div className="App">
        <canvas
          ref="canvas"
          width={this.screen.width * this.screen.ratio}
          height={this.screen.height * this.screen.ratio}
        />
      </div>
    )

    // <div className="App-header">
    // <img src={logo} className="App-logo" alt="logo" />
    // </div>
  }
}
