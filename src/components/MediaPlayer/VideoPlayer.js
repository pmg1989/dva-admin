import React from 'react'
import PropTypes from 'prop-types'
import { Media, Player, controls } from 'react-media-player'
import classnames from 'classnames'
import PlayPause from './PlayPause'
import MuteUnmute from './MuteUnmute'
import Fullscreen from './Fullscreen'
import styles from './MediaPlayer.less'

const { CurrentTime, Progress, SeekBar, Duration, Volume } = controls

function VideoPlayer ({ src, autoPlay }) {
  return (
    <Media>
      {({ isFullscreen, playPause }) =>
        (<div
          className={classnames(styles['media-player'], { [styles['media-player--fullscreen']]: isFullscreen })}
        >
          <Player
            autoPlay={autoPlay}
            src={src}
            onClick={() => playPause()}
          />
          <div className={styles['media-controls']}>
            <div className={styles['media-control-group']} >
              <PlayPause className={classnames(styles['media-control'], styles['media-control--play-pause'])} />
              <CurrentTime className={classnames(styles['media-control'], styles['media-control--current-time'])} />
            </div>
            <div className={classnames(styles['media-control-group'], styles['media-control-group--seek'])}>
              <Progress className={classnames(styles['media-control'], styles['media-control--progress'])} />
              <SeekBar className={classnames(styles['media-control'], styles['media-control--seekbar'])} />
            </div>
            <Duration className={classnames(styles['media-control'], styles['media-control--duration'])} />
            <div className={styles['media-control-group']} >
              <MuteUnmute className={classnames(styles['media-control'], styles['media-control--mute-unmute'])} />
              <Volume className={classnames(styles['media-control'], styles['media-control--volume'])} />
            </div>
            <div className={styles['media-control-group']} >
              <Fullscreen className={classnames(styles['media-control'], styles['media-control--fullscreen'])} />
            </div>
          </div>
        </div>)
      }
    </Media>
  )
}

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  autoPlay: PropTypes.bool,
}

VideoPlayer.defaultProps = {
  autoPlay: true,
}

export default VideoPlayer
