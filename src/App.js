import React, { Component } from "react"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import RadioGroup from "@material-ui/core/RadioGroup"
import Radio from "@material-ui/core/Radio"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
})

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

class App extends Component {
  state = {
    videoDevice: "",
    audioDevice: "",
    stream: undefined,
    streams: [],
    devices: []
  }
  constructor() {
    super()
    this.startCamera()
  }

  async startCamera() {
    console.log("here1")
    // setup camera
    if (
      this.state.prevVideo === this.state.videoDevice &&
      this.state.prevAudio === this.state.audioDevice
    ) {
      return
    }
    this.state.prevVideo = this.state.videoDevice
    this.state.prevAudio = this.state.audioDevice
    console.log("here2")
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: this.state.videoDevice
        ? true
        : {
            deviceId: this.state.videoDevice
          }
    })
    this.setState({ stream })
    const devices = await window.navigator.mediaDevices.enumerateDevices()
    this.setState({ devices })
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
    setTimeout(() => this.startCamera(), 0)
    return (
      <Grid container spacing={24}>
        <Grid item xs={6}>
          <RadioGroup
            value={this.state.videoDevice}
            onChange={e => this.setState({ videoDevice: e.target.value })}
          >
            {this.state.devices
              .filter(o => o.kind === "videoinput")
              .map(({ deviceId, groupId, kind, label }) => (
                <FormControlLabel
                  control={<Radio />}
                  key={deviceId}
                  value={deviceId}
                  label={label}
                />
              ))}
          </RadioGroup>
        </Grid>
        <Grid item xs={6}>
          <RadioGroup
            value={this.state.audioDevice}
            onChange={e => this.setState({ audioDevice: e.target.value })}
          >
            {this.state.devices
              .filter(o => o.kind === "audioinput")
              .map(({ deviceId, groupId, kind, label }) => (
                <FormControlLabel
                  control={<Radio />}
                  key={deviceId}
                  value={deviceId}
                  label={label}
                />
              ))}
          </RadioGroup>
        </Grid>
        <Grid item xs={12}>
          <video id="cameraPreview" autoplay={true} />
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(App)
