import React, {Component} from "react"
import ReactAnimationFrame from "react-animation-frame"
import "./Canvas.css"

class Animations {
  constructor() {
    this.animations = []
  }

  push = raf => this.animations.push(raf)
}

export default class Task extends Component {
  constructor(props) {
    super(props)

    this.animations = new Animations()

    this.state = {
      message: props.message,
      durationMs: props.durationMs,
      started: false
    }
  }

  startTimer() {
    this.setState({started: true})
  }

  createTimerAnimation() {
    if (this.state.started) {
      return (
        <TimerAnimation
          classname="time"
          message={this.state.message}
          durationms={this.state.durationms}
          started={this.state.started}
        />
      )
    }
  }

  render() {
    return (
      <div classname="task">
        <button classname="button" onclick={() => this.starttimer()}>
          click me!
        </button>
        {(() => {
          if (this.state.started) return this.createtimeranimation()
        })()}
      </div>
    )
  }
}

class time extends component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      started: props.started
    }
  }

  onanimationframe(time) {
    console.log(this.state.started)
    if (this.state.started) {
      const progress = time / this.props.durationms * 10
      this.bar.style.width = `$progress`
      this.setstate({value: math.trunc(progress)})

      if (progress >= 100) {
        this.setstate({value: 100})
        this.props.endanimation()
      }
    }
  }

  render() {
    return (
      <div classname="timer" style={{backgroundcolor: "blue"}}>
        <div
          classname="timer__bar"
          style={{color: "red"}}
          ref={node => (this.bar = node)}
        >
          {this.state.value}
        </div>
      </div>
    )
  }
}
