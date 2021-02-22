import React, {Component} from 'react';
import { Card, Modal, List } from 'antd';
import { EditTwoTone,  DeleteTwoTone } from '@ant-design/icons';
import MakesequenceInOrder from './VideoMakeSequence';
import VideoPlayer from 'react-video-js-player';
// import ReactAudioPlayer from 'react-audio-player';
import classes from './SequenceInOrder.module.css';

// continue from here....


class VideoSequenceInOrder extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            visible: false,
            videourl:this.props.data.videourl
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

    onDelete=()=>{
      this.props.deleteQuestion(this.props.data.id);
    }
    render(){
        // const ListStyle = {
        //     display: 'block',
        //     height: '30px',
        //     lineHeight: '30px',
        //   };
        return(
            // <div>
                 <div  className="col-12 col-sm-10 offset-sm-1">
                <Card style={{backgroundColor:this.props.color}}
                  actions={[
                    
                    <EditTwoTone onClick={()=>{this.showModal();}} twoToneColor="#52c41a"   key="edit" />,
                    <DeleteTwoTone onClick={()=>{this.onDelete();}} twoToneColor="#eb2f96" key="del"/>,
                  ]}>
                    {/* <ReactAudioPlayer
                src={this.state.audiourl}
                autoPlay={false}
                controls
                /> */}
                {/* <VideoPlayer controls={true} src={this.props.data.videourl} width="720"
                    height="420" /> */}
                     <iframe src={this.props.data.videourl} title="Video" width="640" height="360" frameborder="0" style={{border: "1px solid black"}} 
              allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
        <p style={{ fontSize: 17}}>{this.props.quesNo}. {this.props.data.description}</p>
            {/* </div> */}
            <div className={classes.DivinCol}>
                <div>
                  <h6>Options</h6>
                <List itemLayout="horizontal" >
            {this.props.data.options.map(index=>{
                return(
                    <div className={classes.MyListDiv} key={"Seqoptions"+index}>
                        <List.Item>{index}</List.Item>
                    </div>
            )})}
            </List>
                </div>
                <div>
                  <h6>Answers</h6>
                <List itemLayout="horizontal" >
            {this.props.data.ans.map(index=>{
                return(
                    <div className={classes.MyListDiv} key={"Seqans"+index}>
                        <List.Item>{index}</List.Item>
                    </div>
            )  })}
            </List>
                </div>
            </div>
            </Card>
            <Modal
              style={{ width: 1000 }}
              title="Edit Question"
              visible={this.state.visible}
              onCancel={this.handleCancel}
              width={1200}
              footer={null}
            >
            
            <MakesequenceInOrder updateQuestion={this.props.updateQuestion} description={this.props.data.description} question={this.props.data}  handleOk={this.handleOk} handleCancel={this.handleCancel}/>
            </Modal>
            </div>
            // </div>
        )
    }
}


export default VideoSequenceInOrder;