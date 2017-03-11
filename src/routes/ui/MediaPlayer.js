import React, {Component} from 'react'
import {Row, Col, Tabs} from 'antd'
import MediaListPlayer from '../../components/common/mediaPlayer'
import VideoPlayer from '../../components/common/mediaPlayer/VideoPlayer'
import AudioPlayer from '../../components/common/mediaPlayer/AudioPlayer'
import CirclePlayer from '../../components/common/mediaPlayer/CirclePlayer'

const TabPane = Tabs.TabPane

const playlist = [
  { src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', label: 'Big Buck Bunny' },
  { src: 'http://jelmerdemaat.nl/online-demos/conexus/video/small.mp4', label: 'Lego Robot' },
  { src: 'http://shapeshed.com/examples/HTML5-video-element/video/320x240.m4v', label: 'iPod Help' },
  { src: 'http://www.youtube.com/embed/h3YVKTxTOgU', label: 'Brand New (Youtube)' },
  { src: 'https://youtu.be/VOyYwzkQB98', label: 'Neck Deep (Youtube)' }
]

class Demo extends Component {

  render() {
    return (
      <Row>
        <Col span={16} offset={4}>
          <Tabs defaultActiveKey="2">
            <TabPane tab="MediaListPlayer" key="1">
              <MediaListPlayer playlist={playlist} autoPlay={false} />
            </TabPane>
            <TabPane tab="VideoPlayer" key="2">
              <VideoPlayer src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" autoPlay={false}/>
            </TabPane>
            <TabPane tab="AudioPlayer" key="3">
              <AudioPlayer src="https://p.scdn.co/mp3-preview/f83458d6611ae9589420f71c447ac9d2e3047cb8"/>
            </TabPane>
            <TabPane tab="CirclePlayer" key="4">
              <CirclePlayer src="https://p.scdn.co/mp3-preview/f83458d6611ae9589420f71c447ac9d2e3047cb8"/>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    )
  }
}

export default Demo
