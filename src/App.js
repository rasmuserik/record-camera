import React, { Component } from "react"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import RadioGroup from "@material-ui/core/RadioGroup"
import Radio from "@material-ui/core/Radio"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import RecordRTC from "recordrtc"
import { promisify } from "util"

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
      audio: this.state.audioDevice
        ? {
            deviceId: { exact: this.state.audioDevice }
          }
        : false,
      video: this.state.videoDevice
        ? {
            deviceId: { exact: this.state.videoDevice }
          }
        : true
    })
    this.setState({ stream })
    const devices = await window.navigator.mediaDevices.enumerateDevices()
    this.setState({ devices })
    const video = document.getElementById("cameraPreview")
    video.srcObject = stream
    video.play()
  }
  componentDidUpdate() {}
  render() {
    setTimeout(() => this.startCamera(), 0)
    return (
      <Grid container spacing={24}>
        <Grid item xs={5}>
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
        <Grid item xs={5}>
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
        <Grid item xs={2}>
          <a id="dllink" target="_blank" style={{ display: "none" }} />
          {this.state.recording ? (
            <Button
              onClick={() => {
                this.state.recorder.stopRecording(async o => {
                  console.log(o)
                  this.setState({ recording: false })
                  let blob = await this.state.recorder.getBlob()
                  console.log("here", blob)
                  const url = window.URL.createObjectURL(blob)
                  const a = document.getElementById("dllink")
                  a.href = url
                  //a.download = filename
                  a.click()
                  //window.URL.revokeObjectURL(url)
                })
              }}
            >
              stop recording
            </Button>
          ) : (
            <Button
              onClick={() => {
                try {
                  const recorder = RecordRTC(this.state.stream, {
                    recorderType: RecordRTC.WebAssemblyRecorder
                  })
                  recorder.startRecording()
                  this.setState({ recording: true, recorder })
                } catch (e) {
                  alert(e.toString())
                }
              }}
            >
              record
            </Button>
          )}
        </Grid>
        <Grid item xs={12}>
          <video id="cameraPreview" autoPlay={true} muted={true} />
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(App)
