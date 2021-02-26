import React, { Component } from 'react'
import { Radio,  Card, Modal } from 'antd';
import { EditTwoTone,  DeleteTwoTone } from '@ant-design/icons';
import MakeAudioMultipleChoice from "./MakeAudioMultipleChoice";
import ReactAudioPlayer from 'react-audio-player';
export default class AudioMultipleChoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            visible: false,
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
      this.props.deleteQuestion(this.props.data.id, this.props.data.key);
    }
      onChange = e => {
        //console.log('radio checked', e.target.value);
        this.setState({
          value: e.target.value,
        });
      };
    render() {
        const radioStyle = {
          display: 'block',
          height: '30px',
          lineHeight: '30px',
        };
        
        // const { value } = this.state;
        return (
            <div  className="col-12 col-sm-10 offset-sm-1">
                <Card style={{backgroundColor:this.props.color}}
                  actions={[
                    
                    <EditTwoTone onClick={()=>{this.showModal();}} twoToneColor="#52c41a"   key="edit" />,
                    <DeleteTwoTone onClick={()=>{this.onDelete();}} twoToneColor="#eb2f96" key="del"/>,
                  ]}>
                    <ReactAudioPlayer
                src={this.props.data.audiourl}
                autoPlay={false}
                controls
                muted
                />
        <p style={{ fontSize: 17}}>{this.props.quesNo}. {this.props.data.description}</p>
                <Radio.Group value={this.props.data.ans[0]}>
                    {this.props.data.options.map(index=>{
                      
                        return(
                            <Radio key={index} style={radioStyle} value={index}>
                            {index}
                          </Radio>
                        );
                    })}
           
                      
          </Radio.Group>
                </Card>
            <Modal
              style={{ width: 1000 }}
              title="Edit Question"
              visible={this.state.visible}
              onCancel={this.handleCancel}
              width={1200}
              footer={null}
            >
            
            <MakeAudioMultipleChoice updateQuestion={this.props.updateQuestion} description={this.props.data.description} question={this.props.data}  handleOk={this.handleOk} handleCancel={this.handleCancel}/>
            </Modal>
            </div>
       
        );
      }
    
}
