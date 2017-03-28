import React, {Component} from 'react'
import MediaListPlayer from '../../components/common/mediaPlayer'
import VideoPlayer from '../../components/common/mediaPlayer/VideoPlayer'
import AudioPlayer from '../../components/common/mediaPlayer/AudioPlayer'
import CirclePlayer from '../../components/common/mediaPlayer/CirclePlayer'
import styles from './index.less'

const playlist = [
  { src: 'http://www.youtube.com/embed/h3YVKTxTOgU', label: 'Brand New (Youtube)' },
  { src: 'https://youtu.be/VOyYwzkQB98', label: 'Neck Deep (Youtube)' },
  { src: 'https://player.vimeo.com/video/156147818', label: 'Pump (Vimeo)' },
  { src: 'https://vimeo.com/channels/staffpicks/150734165', label: 'Lesley (Vimeo)' },
  { src: 'http://a1083.phobos.apple.com/us/r1000/014/Music/v4/4e/44/b7/4e44b7dc-aaa2-c63b-fb38-88e1635b5b29/mzaf_1844128138535731917.plus.aac.p.m4a', label: 'iTunes Preview' },
  { src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', label: 'Big Buck Bunny' },
  { src: 'https://vid4u.org/ninja/5/dev/assets/madmax-intro.mp4', label: 'Mad Max Intro' },
  { src: 'http://demosthenes.info/assets/videos/mountain.mp4', label: 'Mountain' },
  { src: 'http://www.w3schools.com/html/movie.mp4', label: 'Bear' },
  { src: 'http://jelmerdemaat.nl/online-demos/conexus/video/small.mp4', label: 'Lego Robot' },
  { src: 'http://shapeshed.com/examples/HTML5-video-element/video/320x240.m4v', label: 'iPod Help' },
  { src: 'http://html5demos.com/assets/dizzy.mp4', label: 'Dizzy Kitty' },
  { src: 'http://www.noiseaddicts.com/samples_1w72b820/3890.mp3', label: 'Noise Addicts' }
]

class Demo extends Component {

  render() {
    return (
      <div className={styles['media-player-wrapper']}>
        <MediaListPlayer playlist={playlist}/>
        {/*<VideoPlayer src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"/>
        <AudioPlayer src="http://om81a8oz0.bkt.clouddn.com/lms/recording/student/jl/22-8.mp3?e=1489044283&token=fl6A1F9KHk0raN9TIv9kr4mZRnd1KovppmqGTET_:XTh1gUXeZlaJ_NIqNWbM6hN0zuw="/>
        <CirclePlayer src="http://om81a8oz0.bkt.clouddn.com/lms/recording/student/jl/22-8.mp3?e=1489044283&token=fl6A1F9KHk0raN9TIv9kr4mZRnd1KovppmqGTET_:XTh1gUXeZlaJ_NIqNWbM6hN0zuw="/>
        */}
        </div>
    )
  }
}

export default Demo
