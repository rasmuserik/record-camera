import React, { Component } from "react"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import RadioGroup from "@material-ui/core/RadioGroup"
import Radio from "@material-ui/core/Radio"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Typography from "@material-ui/core/Typography"

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
})

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

class App extends Component {
  state = {
    videoDevice: "",
    streams: [],
    devices: []
  }
  constructor() {
    super()
    this.initCamera()
  }
  async initCamera() {
    const devices = await window.navigator.mediaDevices.enumerateDevices()
    this.setState({ devices })
    console.log(devices)
  }

  async startCamera() {
    // setup camera
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    })
    const video = document.getElementById("cameraPreview")
    video.srcObject = stream
    video.play()
  }
  componentDidUpdate() {
    const { streams } = this.state
    for (const { id, stream } of streams) {
      const video = document.getElementById(id)
      console.log("didUpdate", video, stream)
      video.srcObject = stream
      video.play()
    }
  }
  render() {
    return (
      <div>
        <RadioGroup
          value={this.state.videoDevice}
          onChange={e => this.setState({ videoDevice: e.target.value })}
        >
          {this.state.devices.map(({ deviceId, groupId, kind, label }) => (
            <FormControlLabel
              control={<Radio />}
              key={deviceId}
              value={deviceId}
              label={deviceId + groupId + kind + label}
            />
          ))}
        </RadioGroup>
      </div>
    )
  }
}

export default withStyles(styles)(App)
