import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Media, Player, controls, utils } from 'react-media-player'
import classnames from 'classnames'
import PlayPause from './PlayPause'
import MuteUnmute from './MuteUnmute'
import Repeat from './Repeat'
import Fullscreen from './Fullscreen'
import styles from './MediaPlayer.less'

const { CurrentTime, Progress, SeekBar, Duration, Volume } = controls
const { keyboardControls } = utils

const PrevTrack = props => (
  <svg width="10px" height="12px" viewBox="0 0 10 12" {...props}>
    <polygon fill="#FAFBFB" points="10,0 2,4.8 2,0 0,0 0,12 2,12 2,7.2 10,12" />
  </svg>
)

const NextTrack = props => (
  <svg width="10px" height="12px" viewBox="0 0 10 12" {...props}>
    <polygon fill="#FAFBFB" points="8,0 8,4.8 0,0 0,12 8,7.2 8,12 10,12 10,0" />
  </svg>
)

class MediaPlayer extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    currentTrack: PropTypes.string.isRequired,
    repeatTrack: PropTypes.bool.isRequired,
    autoPlay: PropTypes.bool,
    onPrevTrack: PropTypes.func.isRequired,
    onNextTrack: PropTypes.func.isRequired,
    onRepeatTrack: PropTypes.func.isRequired,
  }

  _handlePrevTrack = () => {
    this.props.onPrevTrack()
  }

  _handleNextTrack = () => {
    this.props.onNextTrack()
  }

  _handleRepeatTrack = () => {
    this.props.onRepeatTrack()
  }

  _handleEnded = () => {
    this.props.onNextTrack()
  }

  render () {
    const { src, currentTrack, repeatTrack, autoPlay } = this.props
    return (
      <div className={styles['media-player-wrapper']}>
        <Media>
          { mediaProps =>
            (<div
              className={classnames(styles['media-player'], { [styles['media-player--fullscreen']]: mediaProps.isFullscreen })}
              onKeyDown={keyboardControls.bind(null, mediaProps)}
            >
              <div
                className={styles['media-player-element']}
                onClick={() => mediaProps.playPause()}
              >
                <Player
                  src={src}
                  loop={repeatTrack}
                  autoPlay={autoPlay}
                  onEnded={this._handleEnded}
                />
              </div>
              <div className={classnames(styles['media-controls'], styles['media-controls--full'])}>
                <div className={styles['media-row']}>
                  <CurrentTime className={classnames(styles['media-control'], styles['media-control--current-time'])} />
                  {currentTrack}
                  <Duration className={classnames(styles['media-control'], styles['media-control--duration'])} />
                </div>
                <div className={classnames(styles['media-control-group'], styles['media-control-group--seek'])}>
                  <Progress className={classnames(styles['media-control'], styles['media-control--progress'])} />
                  <SeekBar className={classnames(styles['media-control'], styles['media-control--seekbar'])} />
                </div>
                <div className={styles['media-row']}>
                  <div className={styles['media-control-group']} style={{ width: '15%', minWidth: '96px' }}>
                    <MuteUnmute className={classnames(styles['media-control'], styles['media-control--mute-unmute'])} />
                    <Volume className={classnames(styles['media-control'], styles['media-control--volume'])} />
                  </div>
                  <div className={styles['media-control-group']} >
                    <PrevTrack className={classnames(styles['media-control'], styles['media-control--prev-track'])} onClick={this._handlePrevTrack} />
                    <PlayPause className={classnames(styles['media-control'], styles['media-control--play-pause'])} />
                    <NextTrack className={classnames(styles['media-control'], styles['media-control--next-track'])} onClick={this._handleNextTrack} />
                  </div>
                  <div className={styles['media-control-group']}>
                    <Repeat
                      className={classnames(styles['media-control'], styles['media-control--repeat'])}
                      isActive={repeatTrack}
                      onClick={this._handleRepeatTrack}
                    />
                    <Fullscreen className={classnames(styles['media-control'], styles['media-control--fullscreen'])} />
                  </div>
                </div>
              </div>
            </div>)
          }
        </Media>
      </div>
    )
  }
}

export default MediaPlayer
