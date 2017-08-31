import React, {Component} from "react"
import PropTypes from "prop-types"

import Canvas from "./Canvas"

// import Character from "./Character"
import {keysToDirection, directionMatrixToAngle} from "./../helper"
// import {drawScene} from "./Scene"

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

const listItem = text => (
  <li className="list-item">
    <div className="content">{text}</div>
  </li>
)

export default class Game extends Component {
  static propTypes = {
    character: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  state = {
    scene: {
      position: {x: 0, y: 0},
      width: 800,
      height: 450
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
    context.fillText(JSON.stringify(this.props.character.position), 10, 200)
    context.fillText(
      (frameTime.getTime() - this.state.startingTime.getTime()) / 1000,
      10,
      250
    )
    context.fillText(JSON.stringify(this.state.scene), 10, 300)
    context.restore()
  }

  calculateScenePosition() {
    const {position} = this.props.character
    const {width, height} = this.state.scene
    let newSceneX = position.x - width / 2
    let newSceneY = position.y - height / 2
    if (newSceneX < 0) newSceneX = 0
    if (newSceneY < 0) newSceneY = 0

    this.setState({
      scene: {
        ...this.state.scene,
        position: {
          x: newSceneX,
          y: newSceneY
        }
      }
    })
  }

  updateCharacterPosition(keys) {
    const {character} = this.props
    const direction = keysToDirection(keys)
    const newPos = {
      position: {
        x: character.position.x + direction.x * character.speed,
        y: character.position.y + direction.y * character.speed
      }
    }
    this.props.actions.editCharacterPosition(newPos)
    this.props.actions.editCharacterRotation({
      rotation: directionMatrixToAngle(direction)
    })
  }

  update() {
    this.updateCharacterPosition(this.state.keys)
    this.calculateScenePosition()
  }

  render() {
    /* TODO: I read that it is bad to use bind within the render function.
        Something about it forcing updating of the component. Maybe in this case
        it isn't so bad because I'm only doing it for handling resize. That
        needs to be refactored anyway because it doesn't seem to be working */
    return (
      <div className="App">
        <ul className="list">
          {listItem("hello")}
          {listItem("wassup")}
        </ul>
        <Canvas
          className="game"
          update={() => this.update()}
          handleResize={this.handleResize.bind(this, false)}
          character={this.props.character}
          scene={this.state.scene}
        />
      </div>
    )
  }
}
