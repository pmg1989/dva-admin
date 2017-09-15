import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Media, Player, controls } from 'react-media-player'
import classnames from 'classnames'
import PlayPause from './PlayPause'
import MuteUnmute from './MuteUnmute'
import styles from './MediaPlayer.less'

const { CurrentTime, SeekBar, Duration, Volume } = controls

const audioContext = new (window.AudioContext || window.webkitAudioContext)()
const panner = audioContext.createPanner()

panner.setPosition(0, 0, 1)
panner.panningModel = 'equalpower'
panner.connect(audioContext.destination)

class AudioPlayer extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    autoPlay: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    autoPlay: true,
  }

  componentDidMount () {
    const source = audioContext.createMediaElementSource(this._player.instance)
    source.connect(panner)
    panner.connect(audioContext.destination)
  }

  _handlePannerChange = ({ target }) => {
    const x = +target.value
    const y = 0
    const z = 1 - Math.abs(x)
    panner.setPosition(x, y, z)
  }

  render () {
    return (
      <Media>
        <div>
          <Player
            autoPlay={this.props.autoPlay}
            ref={(c) => { this._player = c }}
            src={this.props.src}
            useAudioObject
            crossOrigin="anonymous"
          />
          <div className={styles['media-controls']}>
            <div className={styles['media-control-group']}>
              <PlayPause className={classnames(styles['media-control'], styles['media-control--play-pause'])} />
              <CurrentTime className={classnames(styles['media-control'], styles['media-control--current-time'])} />
            </div>
            <SeekBar className={classnames(styles['media-control'], styles['media-control--volume-range'])} />
            <Duration className={classnames(styles['media-control'], styles['media-control--duration'])} />
            <div className={styles['media-control-group']} >
              <MuteUnmute className={classnames(styles['media-control'], styles['media-control--mute-unmute'])} />
              <Volume className={classnames(styles['media-control'], styles['media-control--volume'])} />
            </div>
          </div>
          {/* <input type="range" defaultValue="0" min="-1" max="1" step="any" onChange={this._handlePannerChange} /> */}
        </div>
      </Media>
    )
  }
}

export default AudioPlayer
