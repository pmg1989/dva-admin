import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MediaPlayer from './MediaPlayer'
import PlayList from './PlayList'
import styles from './MediaPlayer.less'

const mod = (num, max) => ((num % max) + max) % max

class Index extends Component {
  static propTypes = {
    playlist: PropTypes.arrayOf(PropTypes.shape({
      src: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
    })).isRequired,
    repeat: PropTypes.bool,
    autoPlay: PropTypes.bool,
    curPlay: PropTypes.number,
  }

  static defaultProps = {
    autoPlay: true,
    curPlay: 0,
  }

  state = {
    currentTrack: this.props.playlist[this.props.curPlay || 0],
    repeatTrack: !!this.props.repeat,
    autoPlay: !!this.props.autoPlay,
  }

  _handleTrackClick = (track) => {
    this.setState({ currentTrack: track })
  }

  _navigatePlaylist = (direction) => {
    const { playlist } = this.props
    const newIndex = mod(playlist.indexOf(this.state.currentTrack) + direction, playlist.length)
    this.setState({ currentTrack: playlist[newIndex] })
  }

  render () {
    const { currentTrack, repeatTrack, autoPlay } = this.state
    const { playlist } = this.props

    return (
      <div className={styles['media-player-wrapper']}>
        <MediaPlayer
          ref={(c) => { this._mediaPlayer = c }}
          src={currentTrack.src}
          autoPlay={autoPlay}
          loop={repeatTrack}
          currentTrack={currentTrack.label}
          repeatTrack={repeatTrack}
          onPrevTrack={() => this._navigatePlaylist(-1)}
          onNextTrack={() => this._navigatePlaylist(1)}
          onRepeatTrack={() => { this.setState({ repeatTrack: !repeatTrack }) }}
          onPlay={() => !autoPlay && this.setState({ autoPlay: true })}
          onPause={() => this.setState({ autoPlay: false })}
          onEnded={() => !repeatTrack && this._navigatePlaylist(1)}
        />
        <PlayList
          tracks={playlist}
          currentTrack={currentTrack}
          onTrackClick={this._handleTrackClick}
        />
      </div>
    )
  }
}

export default Index
