import React, {Component} from "react"
import {particleOrganismz} from "./Animation"
/* import Task from "./Canvas"*/

import "./HelloWorld.css"

export default class HelloWorld extends Component {
  constructor(props) {
    super(props)

    this.state = {
      screen: {
        width: window.innerWidth,
        height: window.innerHeight,
        ratio: window.devicePixelRatio || 1
      },
      canvas: this.refs.canvas,
      color: "hotpink"
    }
  }

  componentDidMount() {
    /* const context = this.refs.canvas.getContext("2d")*/
    this.setState({canvas: this.refs.canvas})
    console.log(this.state.canvas, this.refs.canvas)
    particleOrganismz(this.refs.canvas)
  }

  toggleColor() {
    let newColor
    this.state.color === "yellow"
      ? (newColor = "hotpink")
      : (newColor = "yellow")
    this.setState({
      color: newColor
    })
  }

  changeColor(event) {
    this.setState({
      color: event.target.value
    })
  }

  render() {
    const styleObj = {
      backgroundColor: this.state.color,
      fontSize: 32
    }

    return (
      <section style={styleObj} id="hello-world">
        <h2>Hello, {this.props.name}!</h2>
        <h2>{this.state.color}</h2>
        <input
          value={this.state.color}
          onChange={this.changeColor.bind(this)}
        />
        <canvas
          ref="canvas"
          width={this.state.screen.width * this.state.screen.ratio}
          height={this.state.screen.height * this.state.screen.ratio}
        />
      </section>
    )
  }
}
