import React, {Component} from 'react'
import {connect} from 'dva'
import {Row, Col} from 'antd'
import LzEditor from 'react-lz-editor'

class LzEditorPage extends Component {

  state = {
    content: `<h1>一级标题 Head level 1</h1>
              <h2>HTML 格式</h2>
              <p style='text-align:center;'><span style="color:#ED5565">红色文字</span>，居中对齐，<strong>加粗</strong>，<em>斜体</em></p>
              <blockquote style='text-align:left;'><span style="color:#ffce54">其</span><span style="color:#a0d468">他</span><span style="color:#38afda">颜</span><span style="color:#967adc">色</span> <span style="color:#a0d468">C</span><span style="color:#48cfad">OL</span><span style="color:#4a89dc">O</span><span style="color:#967adc">R</span><span style="color:#434a54">S</span></blockquote>
              <p><br></p>
              <ul>
                <li><span style="color:#434a54">list 1</span></li>
                <li><span style="color:#434a54">list 2</span></li>
                <li><span style="color:#434a54">list 3</span></li>
              </ul>
              <pre><code>Block here.Block here.Block here.Block here.</code></pre>
              <pre><code>Block here.Block here.Block here.Block here.Block here.</code></pre>
              <pre><code>Block here.Block here.Block here.Block here.Block here.</code></pre>
              <p><img src="https://image.qiluyidian.mobi/43053508139910678747.jpg"/></p>
              <p><br></p>
              <h2>正文示例：</h2>
              <h3>乐视金融传将收购数码视讯子公司，拿下互联网、数字电视两张支付牌照</h3>
              <p>用场景化的方式表达就是，用户可以在观看电视购物频道的时候，直接从电视上进行支付购买商品，不用再通过银行汇款或者货到付款；可以选择对电视上的点播内容进行付费，还可能在电视上对水电煤等公用事业费用进行缴费。</p>
              <p>一度金融的消息称，乐视金融同数码视讯的接触尚处在高层范围内进行，因此对于收购价格，暂时还不能确定。</p>
              <p>如果乐视金融拿下数码视讯的两张金融牌照，并且在到期后能够获得央行审核顺利延期，意味着乐视可以通过移动设备和电视两个终端来链接用户的银行卡。</p>
              <p>乐视金融在去年11月份首度公开亮相的时候，缺少银行和支付两张关键牌照就一直是外界关注的问题。</p>`
  }

  handleReceiver(content) {
    console.log(content);
  }

  render() {
    return (
      <Row>
        <Col span={16} offset={4}>
          <LzEditor
            active={true}
            cbReceiver={::this.handleReceiver}
            ImportContent={this.state.content}
            Image={false}
            Video={false}
            Audio={false}
          />
      </Col>
    </Row>
    )
  }
}

export default connect()(LzEditorPage)
