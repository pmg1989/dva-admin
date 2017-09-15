import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Media, Player } from 'react-media-player'
import CircleProgress from './CircleProgress'
import styles from './MediaPlayer.less'

class CircleMediaPlayer extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    autoPlay: PropTypes.bool,
  }

  static defaultProps = {
    autoPlay: true,
  }

  static renderPlay () {
    return (
      <polygon
        points="13.083,11.5 20.583,16 13.083,20.5 "
        className={styles['circle-media-player__play']}
      />
    )
  }

  static renderPause () {
    return (
      <g className={styles['circle-media-player__pause']}>
        <rect width="3" height="9" x="11.5" y="11.5" />
        <rect width="3" height="9" x="17.5" y="11.5" />
      </g>
    )
  }

  componentDidMount () {
    this._circle = new CircleProgress(this._svg)
  }

  _handleTimeUpdate = ({ currentTime, duration }) => {
    this._circle.setProgress((currentTime / duration) * 100)
  }

  render () {
    return (
      <Media>
        {({ isPlaying, playPause }) =>
          (<button className={styles['circle-media-player']} onClick={() => playPause()}>
            <Player
              autoPlay={this.props.autoPlay}
              src={this.props.src}
              vendor="audio"
              onTimeUpdate={this._handleTimeUpdate}
              crossOrigin="anonymous"
            />
            <svg width="32px" height="32px" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="14.5" className={styles['circle-media-player__background']} />
              <circle ref={(c) => { this._svg = c }} cx="16" cy="16" r="14.5" className={styles['circle-media-player__foreground']} />
              { isPlaying
                ? CircleMediaPlayer.renderPause()
                : CircleMediaPlayer.renderPlay()
              }
            </svg>
          </button>)
        }
      </Media>
    )
  }
}

export default CircleMediaPlayer
