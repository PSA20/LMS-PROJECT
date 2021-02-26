import React, { Component } from 'react'
import { Radio,  Card, Button} from 'antd';
import VideoPlayer from 'react-video-js-player';
// import ReactAudioPlayer from 'react-audio-player';
// import Myaudio from '../../../assets/Audio/TestAudio.m4a'
export default class VideoMultipleChoiceTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            visible: false,
            ans : this.props.data.ans[0],
            videourl : this.props.data.videourl
          };
    }
    showModal = () => {
      this.setState({ visible: true });
    };
  
    handleOk = () => {
      this.setState({ visible: false });
    };
  
    handleCancel = () => {
      this.setState({ visible: false });
    };

    onChange = e => {
        this.setState({
          value: e.target.value,
        });
      };
    onClickHandler = ()=>{
      let yesorno = false
      const userans = this.state.value
      const ansans = this.state.ans
      if(userans === ansans){
        yesorno = true
      }
      const data = {queNo: this.props.quesNo, userAns: userans, correctans:ansans, val:yesorno}
      this.props.userAnsList(data, this.props.testscore, this.props.score)
      this.props.nextQue()
      
    }


    render() {
        const radioStyle = {
          display: 'block',
          height: '30px',
          lineHeight: '30px',
        };
        // const { value } = this.state;
        return (
            <div  className="col-12 col-sm-10 offset-sm-1">
                <Card style={{backgroundColor:this.props.color}}>
                {/* <ReactAudioPlayer
                src={this.state.audiourl}
                autoPlay
                controls
                /> */}
                {/* <VideoPlayer controls={true} src={this.props.data.videourl} width="720"
                    height="420" /> */}
                     <iframe src={this.props.data.videourl} title="Video" width="640" height="360" frameborder="0" style={{border: "1px solid black"}} 
              allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
        <p style={{ fontSize: 17}}>{this.props.quesNo}. {this.props.data.description}</p>
                <Radio.Group onChange={this.onChange}>
                    {this.props.data.options.map(index=>{
                      
                        return(
                            <Radio key={index} style={radioStyle} value={index}>
                            {index}
                          </Radio>
                        );
                    })}
          </Radio.Group>
                </Card>
                <Button type="primary" style={{float:"right"}} onClick={this.onClickHandler}>Next</Button>
            </div>
       
        );
      }
    
}
