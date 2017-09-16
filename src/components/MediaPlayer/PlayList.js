import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './MediaPlayer.less'

class PlayList extends Component {
  static propTypes = {
    tracks: PropTypes.array.isRequired,
    currentTrack: PropTypes.object.isRequired,
    onTrackClick: PropTypes.func.isRequired,
  }

  _handleTrackClick (track) {
    this.props.onTrackClick(track)
  }

  render () {
    const { tracks, currentTrack } = this.props
    return (
      <aside className={styles['media-playlist']}>
        <header className={styles['media-playlist-header']}>
          <h3 className={styles['media-playlist-title']}>播放列表</h3>
        </header>
        <ul className={styles['media-playlist-tracks']}>
          {tracks.map(track => (
            <li key={track.label}>
              <div className={classnames(styles['media-playlist-track'], { [styles['is-active']]: track === currentTrack })} onClick={this._handleTrackClick.bind(this, track)}>
                {track.label}
              </div>
            </li>
          )
          )}
        </ul>
      </aside>
    )
  }
}

export default PlayList
