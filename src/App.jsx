import React, {Component} from "react"
import "./App.css"

import Canvas from "./Canvas"
import Fuck from "./Fuck"

import Character from "./Character"
import {keysToDirection} from "./helper"
import {drawScene} from "./Scene"

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
      scene: {
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: window.innerHeight
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

    this.character = new Character({
      position: {x: this.state.scene.width / 2, y: this.state.scene.height / 2},
      speed: 5
    })
  }

  handleResize(value, e) {
    let newSceneX = this.character.position.x - this.state.scene.width / 2
    let newSceneY = this.character.position.y - this.state.scene.height / 2
    if (newSceneX < 0) newSceneX = 0
    if (newSceneY < 0) newSceneY = 0

    this.setState({
      scene: {
        x: newSceneX,
        y: newSceneY,
        width: window.innerWidth,
        height: window.innerHeight
      }
    })
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

    requestAnimationFrame(() => this.update())
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleKeys)
    window.removeEventListener("resize", this.handleKeys)
    window.removeEventListener("resize", this.handleResize)
  }

  startGame() {}

  /** @deprecated */
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
    context.fillText(JSON.stringify(this.state.scene), 10, 300)
    context.restore()
  }

  calculateScenePosition() {
    let newSceneX = this.character.position.x - this.state.scene.width / 2
    let newSceneY = this.character.position.y - this.state.scene.height / 2
    if (newSceneX < 0) newSceneX = 0
    if (newSceneY < 0) newSceneY = 0

    this.setState({
      scene: {
        x: newSceneX,
        y: newSceneY,
        width: this.state.scene.width,
        height: this.state.scene.height
      }
    })
  }

  update() {
    this.character.move(keysToDirection(this.state.keys))
    this.calculateScenePosition()
  }

  render() {
    return (
      <div className="App">
        <Canvas
          update={() => this.update()}
          handleResize={this.handleResize.bind(this, false)}
          character={this.character}
          scene={this.state.scene}
        />
      </div>
    )
  }
}
