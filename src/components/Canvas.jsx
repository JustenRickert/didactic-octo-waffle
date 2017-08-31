import React, {Component} from "react"
import PropTypes from "prop-types"
import * as PIXI from "pixi.js"

function drawScene(graphics, scene, map) {
  const lineLength = 150
  graphics.clear()

  graphics.lineStyle(1, 0x000000)
  for (
    let xBar = -scene.position.x;
    xBar < scene.width + scene.position.x;
    xBar += lineLength
  ) {
    graphics.moveTo(xBar, 0)
    graphics.lineTo(xBar, scene.height)
    graphics.endFill()
  }
  for (
    let yBar = -scene.position.y;
    yBar < scene.height + scene.position.y;
    yBar += lineLength
  ) {
    graphics.moveTo(0, yBar)
    graphics.lineTo(scene.width, yBar)
    graphics.endFill()
  }
}

function drawCharacter(graphics, character, scene, map) {
  // We want to set the character in the center of the screen, else have them
  // move freely around the scene
  let x, y
  scene.position.x <= 1 ? (x = character.position.x) : (x = scene.width / 2)
  scene.position.y <= 1 ? (y = character.position.y) : (y = scene.height / 2)

  graphics.clear()
  graphics.beginFill(0xff3300)
  graphics.moveTo(x, y - 15)
  graphics.lineTo(x + 10, y + 10)
  graphics.lineTo(x + 5, y + 7)
  graphics.lineTo(x - 5, y + 7)
  graphics.lineTo(x - 10, y + 10)
  graphics.endFill()

  graphics.position.x = x
  graphics.position.y = y
  graphics.pivot = {x, y}
  graphics.rotation = character.rotation
}

export default class Canvas extends Component {
  /* We need this constructor because there is no way to set debug position with
     the constructor function */
  constructor(props) {
    super(props)

    this.debugText = new PIXI.Text(JSON.stringify(props.character.position))
    this.debugText.x = 30
    this.debugText.y = 30
  }

  static propTypes = {
    character: PropTypes.object.isRequired
  }

  state = {
    animate: this.animate.bind(this),
    app: new PIXI.Application(this.props.scene.width, this.props.scene.height, {
      backgroundColor: 0x1099bb,
      antialias: false
    }),
    sceneGraphics: new PIXI.Graphics(),
    charGraphics: new PIXI.Graphics()
  }

  /**
     In this case, componentDidMount is used to grab the canvas container ref,
     and hook up the PixiJS renderer
   */
  componentDidMount() {
    /* window.addEventListener("resize", this.handleResize.bind(this, false))*/

    this.refs.gameCanvas.appendChild(this.state.app.view)
    this.state.app.stage.addChild(
      this.state.sceneGraphics,
      this.state.charGraphics,
      this.debugText
    )
    this.state.animate()
  }

  /* handleResize(value, e) {
   *   this.state.app.renderer.view.width = window.innerWidth
   *   this.state.app.renderer.view.height = window.innerHeight
   *   this.props.handleResize(value, e)
   * }
   */

  /** Animation loop for updating Pixi Canvas */
  animate() {
    requestAnimationFrame(() => this.animate())

    this.props.update()

    this.state.app.renderer.render(this.state.app.stage)
    drawScene(this.state.sceneGraphics, this.props.scene)
    drawCharacter(
      this.state.charGraphics,
      this.props.character,
      this.props.scene
    )
    this.debugText.text = JSON.stringify({
      x: this.props.character.position.x,
      y: this.props.character.position.y,
      scene: this.props.scene
    })
  }

  /**
     Render our container that will store our PixiJS game canvas. Store the ref
   */
  render() {
    return <div className="game-canvas-container" ref="gameCanvas" />
  }
}
