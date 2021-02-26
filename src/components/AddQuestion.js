import React, { Component } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Menu, Modal, Dropdown, Divider,} from "antd";
import "./css/main.css";
import MakeMultipleChoice from "./Categories/Multiple Choice/MakeMultipleChoice"
import {MakeFillInTheBlanks} from "./Categories/Blanks/MakeFillInTheBlanks";
import MakeMultipleCheckbox from "./Categories/MultipleCheckbox/MakeMultipleCheckbox";
import MakeDropDown from "./Categories/Select-From-dropdown/MakeDropDown";
import MakeTrueFalse from "./Categories/TrueAndFalse/MakeTrueFalse";
import MakeSequenceinorder from "./Categories/SequenceInOrder/MakeSequenceInOrder";
import MakeMatchingWords from "./Categories/MatchingWords/MakeMatchingWords";
import MakeMatchDrag from "./Categories/MatchDrag/MakeMatchDrag";
import MakeMatchDragImg from "./Categories/MatchDragImg/MakeMatchDragImg";
import MakeAudioMultipleChoice from './Categories/AudioMultipleChoice/MakeAudioMultipleChoice';
import AudioMakeSequence from './Categories/AudioSequenceInOrder/AudioMakeSequence';
import MakeVideoMultipleChoice from './Categories/VideoMultipleChoice/MakeVideoMultipleChoice';
import VideoMakeSequence from './Categories/VideoSequenceInOrder/VideoMakeSequence';
import MakeDragImageArea from './Categories/DragImageArea/MakeDragImageArea';
import * as CategoryTypes from "../util/Categories";

export default class AddQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, catergory: ""};
  }

  componentDidMount(){
   // this.props.addQuestion();
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

  onCatChange=(value)=>{
    this.setState({catergory: value});
    
  }

   menu = () =>{
       return (
        <Menu>
          <Menu.Item onClick={()=>{this.onCatChange(CategoryTypes.MULTIPLE_CHOICE);}}>
          
              Multiple Choice
         
          </Menu.Item>
          <Menu.Item onClick={()=>{this.onCatChange(CategoryTypes.FILL_IN_THE_BLANKS);}}>
           
              Fill in the Blanks
   
          </Menu.Item>
          <Menu.Item onClick={()=>{this.onCatChange(CategoryTypes.SELECT_FROM_DROPDOWN);}}>
          
              Select From Dropdown
     
          </Menu.Item>
          <Menu.Item onClick={()=>{this.onCatChange(CategoryTypes.TRUE_AND_FALSE);}}>
          
              True and False
     
          </Menu.Item>
          <Menu.Item onClick={()=>{this.onCatChange(CategoryTypes.MULTIPLE_CHECKBOX);}}>
          
              Multiple Response
     
          </Menu.Item>
          <Menu.Item onClick={()=>{this.onCatChange(CategoryTypes.SEQUENCE_IN_ORDER);}}>
          
              Sequence In Order
     
          </Menu.Item>
          <Menu.Item onClick={()=>{this.onCatChange(CategoryTypes.MATCHING_WORDS);}}>
          
              Matching Words
     
          </Menu.Item>
          <Menu.Item onClick={()=>{this.onCatChange(CategoryTypes.MATCH_DRAG);}}>
          
          Match Drag
 
      </Menu.Item>
      <Menu.Item onClick={()=>{this.onCatChange(CategoryTypes.MATCH_DRAG_IMG);}}>
          
          Match Drag Image
 
      </Menu.Item>
      <Menu.Item onClick={()=>{this.onCatChange(CategoryTypes.AUDIO_MULTIPLE_CHOICE);}}>
          
          Audio Multiple Choice
 
      </Menu.Item>
      <Menu.Item onClick={()=>{this.onCatChange(CategoryTypes.AUDIO_SEQUENCE_ORDER);}}>
          
          Audio Sequence Order
 
      </Menu.Item>
      <Menu.Item onClick={()=>{this.onCatChange(CategoryTypes.VIDEO_MULTIPLE_CHOICE);}}>
          
          Video Multiple Choice
 
      </Menu.Item>
      <Menu.Item onClick={()=>{this.onCatChange(CategoryTypes.VIDEO_SEQUENCE_ORDER);}}>
          
          Video Sequence Order
 
      </Menu.Item>
      <Menu.Item onClick={()=>{this.onCatChange(CategoryTypes.DRAG_IMAGE_AREA);}}>
          
          Drag Image Area
 
      </Menu.Item>
        </Menu>
      );
   }

 
   CategoryLoader=()=>{
      
       if(this.state.catergory === "Multiple Choice"){
        
           return (<MakeMultipleChoice addQuestion={this.props.addQuestion} description={NaN} handleOk={this.handleOk} handleCancel={this.handleCancel}/>);
       }else if (this.state.catergory === "Fill in the Blanks"){
        return (<MakeFillInTheBlanks addQuestion={this.props.addQuestion} description={""} handleOk={this.handleOk} handleCancel={this.handleCancel}/>);
       }else if (this.state.catergory === CategoryTypes.SELECT_FROM_DROPDOWN){
        return (<MakeDropDown addQuestion={this.props.addQuestion}  handleOk={this.handleOk} handleCancel={this.handleCancel}/>);
       }else if (this.state.catergory === CategoryTypes.TRUE_AND_FALSE){
        return (<MakeTrueFalse addQuestion={this.props.addQuestion}  handleOk={this.handleOk} handleCancel={this.handleCancel}/>);
       }
       else if (this.state.catergory === CategoryTypes.MULTIPLE_CHECKBOX){
        return (<MakeMultipleCheckbox addQuestion={this.props.addQuestion} description={NaN} handleOk={this.handleOk} handleCancel={this.handleCancel}/>);
       }
       else if (this.state.catergory === CategoryTypes.SEQUENCE_IN_ORDER){
        return (<MakeSequenceinorder addQuestion={this.props.addQuestion} description={NaN} handleOk={this.handleOk} handleCancel={this.handleCancel}/>);
       }
       else if (this.state.catergory === CategoryTypes.MATCHING_WORDS){
        return (<MakeMatchingWords addQuestion={this.props.addQuestion} description={NaN} handleOk={this.handleOk} handleCancel={this.handleCancel}/>);
       }
       else if (this.state.catergory === CategoryTypes.MATCH_DRAG){
        return (<MakeMatchDrag addQuestion={this.props.addQuestion} description={NaN} handleOk={this.handleOk} handleCancel={this.handleCancel}/>);
       }
       else if (this.state.catergory === CategoryTypes.MATCH_DRAG_IMG){
        return (<MakeMatchDragImg addQuestion={this.props.addQuestion} description={NaN} handleOk={this.handleOk} handleCancel={this.handleCancel}/>);
       }
       else if (this.state.catergory === CategoryTypes.AUDIO_MULTIPLE_CHOICE){
        return (<MakeAudioMultipleChoice addQuestion={this.props.addQuestion} description={NaN} handleOk={this.handleOk} handleCancel={this.handleCancel}/>);
       }
       else if (this.state.catergory === CategoryTypes.AUDIO_SEQUENCE_ORDER){
        return (<AudioMakeSequence addQuestion={this.props.addQuestion} description={NaN} handleOk={this.handleOk} handleCancel={this.handleCancel}/>);
       }
       else if (this.state.catergory === CategoryTypes.VIDEO_MULTIPLE_CHOICE){
        return (<MakeVideoMultipleChoice addQuestion={this.props.addQuestion} description={NaN} handleOk={this.handleOk} handleCancel={this.handleCancel}/>);
       }
       else if (this.state.catergory === CategoryTypes.VIDEO_SEQUENCE_ORDER){
        return (<VideoMakeSequence addQuestion={this.props.addQuestion} description={NaN} handleOk={this.handleOk} handleCancel={this.handleCancel}/>);
       }
       else if (this.state.catergory === CategoryTypes.DRAG_IMAGE_AREA){
        return (<MakeDragImageArea addQuestion={this.props.addQuestion} description={NaN} handleOk={this.handleOk} handleCancel={this.handleCancel}/>);
       }
       return null;
   }

  render() {
    return (
      <div className="col-lg-12">
        <div style={{ display: "flex" }} className="block">
          <hr />
          <div
            style={{
              justifyContent: "center",
              textAlign: "center",
              postion: "fixed",
            }}
            className="mx-auto"
          >
            <Button
              block
              type="primary"
              icon={
                <PlusOutlined
                  style={{
                    display: "inline-block",
                    verticalAlign: "baseline",
                  }}
                />
              }
              onClick={this.showModal}
            >
              Questions
            </Button>
            <Modal
              style={{ width: 1000 }}
              title="Create Question"
              visible={this.state.visible}
              onCancel={this.handleCancel}
              width={1200}
              footer={null}
            >
              <div>
                <div className="cat-choose">
                  <Dropdown overlay={this.menu} placement="bottomLeft" arrow>
            <Button>{this.state.catergory?this.state.catergory:<span>Click to Choose Catergory</span>}</Button>
                  </Dropdown>
                </div>

                {/* body */}
                <Divider />
                {this.CategoryLoader()}
              </div>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}
