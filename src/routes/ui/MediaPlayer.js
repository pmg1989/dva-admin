import React, {Component} from 'react'
import {Row, Col, Tabs} from 'antd'
import MediaPlayer from '../../components/common/mediaPlayer'
import VideoPlayer from '../../components/common/mediaPlayer/VideoPlayer'
import AudioListPlayer from '../../components/common/mediaPlayer/AudioListPlayer'
import AudioPlayer from '../../components/common/mediaPlayer/AudioPlayer'
import CirclePlayer from '../../components/common/mediaPlayer/CirclePlayer'

const TabPane = Tabs.TabPane

const playMediaList = [
  { src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', label: 'Big Buck Bunny' },
  { src: 'http://jelmerdemaat.nl/online-demos/conexus/video/small.mp4', label: 'Lego Robot' },
  { src: 'http://shapeshed.com/examples/HTML5-video-element/video/320x240.m4v', label: 'iPod Help' },
  { src: 'http://www.youtube.com/embed/h3YVKTxTOgU', label: 'Brand New (Youtube)' },
  { src: 'https://youtu.be/VOyYwzkQB98', label: 'Neck Deep (Youtube)' }
]

const playAudioList = [
  { src: 'https://p.scdn.co/mp3-preview/f83458d6611ae9589420f71c447ac9d2e3047cb8', label: 'mp3-preview-first' },
  { src: 'http://www.noiseaddicts.com/samples_1w72b820/3890.mp3', label: 'samples' },
  { src: 'https://p.scdn.co/mp3-preview/f83458d6611ae9589420f71c447ac9d2e3047cb8', label: 'mp3-preview-last' }
]

class Demo extends Component {

  render() {
    return (
      <Row>
        <Col span={16} offset={4}>
          <Tabs defaultActiveKey="3">
            <TabPane tab="MediaPlayer" key="1">
              <MediaPlayer playlist={playMediaList} autoPlay={false} />
            </TabPane>
            <TabPane tab="VideoPlayer" key="2">
              <VideoPlayer src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" autoPlay={false}/>
            </TabPane>
            <TabPane tab="AudioListPlayer" key="3">
              <AudioListPlayer playlist={playAudioList} autoPlay={false} curPlay={0}/>
            </TabPane>
            <TabPane tab="AudioPlayer" key="4">
              <AudioPlayer src="http://www.noiseaddicts.com/samples_1w72b820/3890.mp3" autoPlay={false}/>
            </TabPane>
            <TabPane tab="CirclePlayer" key="5">
              <CirclePlayer src="https://p.scdn.co/mp3-preview/f83458d6611ae9589420f71c447ac9d2e3047cb8" autoPlay={false}/>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    )
  }
}

export default Demo
