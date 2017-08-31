import React, {Component} from "react"
import * as PIXI from "pixi.js"

export default class Fuck extends Component {
  constructor(props) {
    super(props)
    this.app = new PIXI.Application(800, 600, {
      antialias: true
    })
    this.thing = new PIXI.Graphics()
  }

  componentDidMount() {
    this.app.stage.addChild(this.thing)
    this.refs.gameCanvas.appendChild(this.app.view)
    this.thing.x = 400
    this.thing.y = 600
    this.count = 0
    this.app.ticker.add(() => {
      this.count += 0.1

      this.thing.clear()
      this.thing.lineStyle(10, 0xff0000, 1)
      this.thing.beginFill(0xffff00, 0.5)

      this.thing.moveTo(
        -120 + Math.sin(this.count) * 20,
        -100 + Math.cos(this.count) * 20
      )
      this.thing.lineTo(
        120 + Math.cos(this.count) * 20,
        -100 + Math.sin(this.count) * 20
      )
      this.thing.lineTo(
        120 + Math.sin(this.count) * 20,
        100 + Math.cos(this.count) * 20
      )
      this.thing.lineTo(
        -120 + Math.cos(this.count) * 20,
        100 + Math.sin(this.count) * 20
      )
      this.thing.lineTo(
        -120 + Math.sin(this.count) * 20,
        -100 + Math.cos(this.count) * 20
      )

      this.thing.rotation = this.count * 0.1
    })
  }

  animate() {}

  render() {
    return <div className="game-canvas-container" ref="gameCanvas" />
  }
}
