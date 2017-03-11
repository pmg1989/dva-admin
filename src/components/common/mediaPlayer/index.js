import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import MediaPlayer from './MediaPlayer'
import styles from './MediaPlayer.less'

class Playlist extends Component {
  _handleTrackClick(track) {
    this.props.onTrackClick(track)
  }

  render() {
    const { tracks, currentTrack } = this.props
    return (
      <aside className={styles["media-playlist"]}>
        <header className={styles["media-playlist-header"]}>
          <h3 className={styles["media-playlist-title"]}>播放列表</h3>
        </header>
        <ul className={styles["media-playlist-tracks"]}>
          {tracks.map(track =>
            <li
              key={track.label}
              className={classnames(styles['media-playlist-track'], { [styles['is-active']]: track === currentTrack })}
              onClick={this._handleTrackClick.bind(this, track)}
            >
              {track.label}
            </li>
          )}
        </ul>
      </aside>
    )
  }
}

const mod = (num, max) => ((num % max) + max) % max

class Index extends Component {

  static propTypes = {
    playlist: PropTypes.arrayOf(PropTypes.shape({
      src: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired
    })).isRequired,
    repeat: PropTypes.bool,
    autoPlay: PropTypes.bool,
    curPlay: PropTypes.number
  }

  static defaultProps = {
    autoPlay: true,
    curPlay: 0
  }

  state = {
    currentTrack: this.props.playlist[this.props.curPlay || 0],
    repeatTrack: !!this.props.repeat,
    autoPlay: !!this.props.autoPlay
  }

  _handleTrackClick = (track) => {
    this.setState({ currentTrack: track })
  }

  _navigatePlaylist = (direction) => {
    const { playlist } = this.props
    const newIndex = mod(playlist.indexOf(this.state.currentTrack) + direction, playlist.length)
    this.setState({ currentTrack: playlist[newIndex] })
  }

  render() {
    const { currentTrack, repeatTrack, autoPlay } = this.state
    const { playlist } = this.props

    return (
        <div className={styles['media-player-wrapper']}>
          <MediaPlayer
            ref={c => this._mediaPlayer = c}
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
          <Playlist
            tracks={playlist}
            currentTrack={currentTrack}
            onTrackClick={this._handleTrackClick}
          />
        </div>
    )
  }
}

export default Index
