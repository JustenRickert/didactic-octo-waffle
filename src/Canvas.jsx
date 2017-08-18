import React, {Component} from "react"
import * as PIXI from "pixi.js"

/**
   @param {PIXI.Graphics} graphics -
   @param {{position: {x: number, y: number}, rotation: number} character -
   @param{{x: number, y: number, width: number, height: number}} scene
 */
function drawScene(graphics, scene, map) {
  const lineLength = 150
  graphics.clear()

  graphics.lineStyle(1, 0x000000)
  for (let xBar = -scene.x; xBar < scene.width + scene.x; xBar += lineLength) {
    graphics.moveTo(xBar, 0)
    graphics.lineTo(xBar, scene.height)
    graphics.endFill()
  }
  for (let yBar = -scene.y; yBar < scene.height + scene.y; yBar += lineLength) {
    graphics.moveTo(0, yBar)
    graphics.lineTo(scene.width, yBar)
    graphics.endFill()
  }
}

/**
   @param {PIXI.Graphics} graphics -
   @param {{position: {x: number, y: number}, rotation: number} character -
   @param{{x: number, y: number, width: number, height: number}} scene
 */
function drawCharacter(graphics, character, scene, map) {
  // We want to set the character in the center of the screen, else have them
  // move freely around the scene
  let x, y
  scene.x <= 0 ? (x = character.position.x) : (x = scene.width / 2)
  scene.y <= 0 ? (y = character.position.y) : (y = scene.height / 2)

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

/** @param {string} information */

export default class Canvas extends Component {
  constructor(props) {
    super(props)
    this.app = new PIXI.Application(
      this.props.scene.width,
      this.props.scene.height,
      {backgroundColor: 0x1099bb, antialias: false}
    )

    this.animate = this.animate.bind(this)
    this.character = props.character
    /**
       @type {{x: number, y: number, width: number, height: number}} scene */
    this.sceneGraphics = new PIXI.Graphics()
    this.charGraphics = new PIXI.Graphics()

    this.debugtext = new PIXI.Text(JSON.stringify(this.character.position))
    this.debugtext.x = 30
    this.debugtext.y = 30
  }

  /**
     In this case, componentDidMount is used to grab the canvas container ref,
     and hook up the PixiJS renderer
   */
  componentDidMount() {
    window.addEventListener("resize", this.handleResize.bind(this, false))

    this.refs.gameCanvas.appendChild(this.app.view)
    this.app.stage.addChild(
      this.sceneGraphics,
      this.charGraphics,
      this.debugtext
    )
    this.animate()
  }

  handleResize(value, e) {
    this.app.renderer.view.width = window.innerWidth
    this.app.renderer.view.height = window.innerHeight
    this.props.handleResize(value, e)
  }

  /**
     Animation loop for updating Pixi Canvas
   */
  animate() {
    requestAnimationFrame(() => this.animate())
    this.props.update()

    this.app.renderer.render(this.app.stage)
    drawScene(this.sceneGraphics, this.props.scene)
    drawCharacter(this.charGraphics, this.character, this.props.scene)
    this.debugtext.text = JSON.stringify({
      x: this.character.position.x,
      y: this.character.position.y,
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
