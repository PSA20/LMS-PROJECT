import React, { Component } from "react";
import { connect } from "react-redux";
import {  withRouter } from "react-router-dom";
import {  } from "reactstrap";
import Header from "./Header";
import {  Divider } from "antd";
import "./css/main.css";
import Options from "./Options";
import MultipleChoice from "./Categories/Multiple Choice/MultipleChoice";
import MultipleCheckbox from "./Categories/MultipleCheckbox/MultipleCheckbox";
import SequenceinOrder from "./Categories/SequenceInOrder/SequenceInOrder";
import AddQuestion from "./AddQuestion";
import {Blanks} from "./Categories/Blanks/Blanks";
import DropDownSelect from "./Categories/Select-From-dropdown/DropDown";
import TrueAndFalse from "./Categories/TrueAndFalse/TrueAndFalse";
import MatchingWords from "./Categories/MatchingWords/MatchingWords";
import MatchDrag from "./Categories/MatchDrag/MatchDrag";
import MatchDragImg from "./Categories/MatchDragImg/MatchDragImg";
import AudioMultipleChoice from "./Categories/AudioMultipleChoice/AudioMultipleChoice";
import AudioSequenceInOrder from './Categories/AudioSequenceInOrder/AudioSequenceInOrder';
import VideoMultipleChoice from './Categories/VideoMultipleChoice/VideoMultipleChoice';
import VideoSequenceInOrder from './Categories/VideoSequenceInOrder/VideoSequenceInOrder';
import DragImageArea from './Categories/DragImageArea/DragImageArea';
import * as CategoryTypes from "../util/Categories"; 
import { NavLink } from 'react-router-dom';
import {
  addQuestion,
  deleteQuestion,
  changeColor,
  changeScore,
  changeTime,
  updateQuestion,
  initquestions,
  initcolor, initscore, inittime, changetime, changecolor, changescore, addquestions, deletequestion, updatequestion
} from "../redux/actions/QuestionActions";


const mapDispatchToProps = (dispatch) => ({
  addQuestion: (data) => dispatch(addQuestion(data)),
  addquestions: (data) => dispatch(addquestions(data)),
  deletequestion: (id, key) => dispatch(deletequestion(id, key)),
  updatequestion: (data, key) => dispatch(updatequestion(data, key)),
  updateQuestion: (data) => dispatch(updateQuestion(data)),
  deleteQuestion: (data) => {
    dispatch(deleteQuestion(data));
  },
  changeColor: (color) => {
    dispatch(changeColor(color));
  },
  changeScore: (score) => {
    dispatch(changeScore(score));
  },
  changeTime: (time) => {
    dispatch(changeTime(time));
  },
  changetime:(time =>{ dispatch(changetime(time))}),
  changescore:(score =>{ dispatch(changescore(score))}),
  changecolor:(color =>{ dispatch(changecolor(color))}),
  initquestions:()=>{ dispatch(initquestions())},
  initcolor:()=>{dispatch(initcolor())},
  inittime:()=>{dispatch(inittime())},
  initscore:()=>{dispatch(initscore())}
});
const mapStateToProps = (state) => {
  return {
    user: state.user,
    questions: state.question,
    xyz : state
  };
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      time: 0,
      color: "white",
    };
  }
  componentDidMount() {
    // this.props.addQuestion();
    this.props.initquestions()
    this.props.initcolor()
    this.props.initscore()
    this.props.inittime()
  }
  onChangeTime = (value) => {
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if (
      (!Number.isNaN(value) && reg.test(value)) ||
      value === "" ||
      value === "-"
    ) {
      // this.props.changeTime(value);
      this.props.changetime(value)
      this.setState({ time: value, timeError: false });
    } else {
      this.setState({ timeError: true });
    }
  };
  onChangeScore = (value) => {
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if (
      (!Number.isNaN(value) && reg.test(value)) ||
      value === "" ||
      value === "-"
    ) {
      this.setState({ score: value, scoreError: false });
      this.props.changescore(value);
    } else {
      this.setState({ scoreError: true });
    }
  };
  onChangeColor = (color) => {
    this.props.changecolor(color);
    this.setState({ color: color });
  };
  btnClick = () => {};
  renderQuestionRows = () => {
    //<MultipleChoice quesNo={1} data={data} />
    //    const ques = this.props.questions;
    const result = this.props.questions.questions.map((item, index) => {
      // console.log("item ",item);
      index++;
      //console.log("item: ", item.category)
      if(item.category === CategoryTypes.MULTIPLE_CHOICE){
      return (
        <div
          key={"MultipleCM"+index}
          style={{ marginTop: 20 }}
          // key={item}
          className="row"
        >
          <MultipleChoice
            deleteQuestion={this.props.deletequestion}
            updateQuestion={this.props.updatequestion}
            color={this.props.questions.color}
            quesNo={index}
            data={item}
          />
        </div>
      );
    }else if(item.category === CategoryTypes.FILL_IN_THE_BLANKS){
     // console.log("sdfsd");
      return (
        <div
          key={"BlanksM"+index}
          style={{ marginTop: 20 }}
          // key={item}
          className="row"
        >
          <Blanks
            deleteQuestion={this.props.deleteQuestion}
            updateQuestion={this.props.updateQuestion}
            color={this.props.questions.color}
            quesNo={index}
            data={item}
          />
        </div>
      );
    }else if(item.category=== CategoryTypes.SELECT_FROM_DROPDOWN){
      return (
        <div
          key={"DropDownM"+index}
          style={{ marginTop: 20 }}
          // key={item}
          className="row"
        >
          <DropDownSelect
            deleteQuestion={this.props.deleteQuestion}
            updateQuestion={this.props.updateQuestion}
            color={this.props.questions.color}
            quesNo={index}
            data={item}
          />
        </div>
      );
    }else if(item.category=== CategoryTypes.TRUE_AND_FALSE){
      return (
        <div
          key={"TandFM"+index}
          style={{ marginTop: 20 }}
          // key={item}
          className="row"
        >
          <TrueAndFalse
            deleteQuestion={this.props.deleteQuestion}
            updateQuestion={this.props.updateQuestion}
            color={this.props.questions.color}
            quesNo={index}
            data={item}
          />
        </div>
      );
    }else if(item.category === CategoryTypes.MULTIPLE_CHECKBOX){
      return (
        <div
          key={"MCheckboxM"+index}
          style={{ marginTop: 20 }}
          // key={item}
          className="row"
        >
          <MultipleCheckbox
            deleteQuestion={this.props.deleteQuestion}
            updateQuestion={this.props.updateQuestion}
            color={this.props.questions.color}
            quesNo={index}
            data={item}
          />
        </div>
      );
    }else if(item.category === CategoryTypes.SEQUENCE_IN_ORDER){
      return (
        <div
          key={"SeqinOM"+index}
          style={{ marginTop: 20 }}
          // key={item}
          className="row"
        >
          <SequenceinOrder
            deleteQuestion={this.props.deleteQuestion}
            updateQuestion={this.props.updateQuestion}
            color={this.props.questions.color}
            quesNo={index}
            data={item}
          />
        </div>
      );
    }
    else if(item.category === CategoryTypes.MATCHING_WORDS){
      return (
        <div
          key={"MatchWM"+index}
          style={{ marginTop: 20 }}
          // key={item}
          className="row"
        >
          <MatchingWords
            deleteQuestion={this.props.deleteQuestion}
            updateQuestion={this.props.updateQuestion}
            color={this.props.questions.color}
            quesNo={index}
            data={item}
          />
        </div>
      );
    }
    else if(item.category === CategoryTypes.MATCH_DRAG_IMG){
      return (
        <div
          key={"MatchWM"+index}
          style={{ marginTop: 20 }}
          // key={item}
          className="row"
        >
          <MatchDragImg
            deleteQuestion={this.props.deleteQuestion}
            updateQuestion={this.props.updateQuestion}
            color={this.props.questions.color}
            quesNo={index}
            data={item}
          />
        </div>
      );
    }
    else if(item.category === CategoryTypes.AUDIO_MULTIPLE_CHOICE){
      return (
        <div
          key={"AudioMC"+index}
          style={{ marginTop: 20 }}
          // key={item}
          className="row"
        >
          <AudioMultipleChoice
            deleteQuestion={this.props.deleteQuestion}
            updateQuestion={this.props.updateQuestion}
            color={this.props.questions.color}
            quesNo={index}
            data={item}
          />
        </div>
      );
    }
    else if(item.category === CategoryTypes.VIDEO_MULTIPLE_CHOICE){
      return (
        <div
          key={"VideoMC"+index}
          style={{ marginTop: 20 }}
          // key={item}
          className="row"
        >
          <VideoMultipleChoice
            deleteQuestion={this.props.deleteQuestion}
            updateQuestion={this.props.updateQuestion}
            color={this.props.questions.color}
            quesNo={index}
            data={item}
          />
        </div>
      );
    }
    else if(item.category === CategoryTypes.AUDIO_SEQUENCE_ORDER){
      return (
        <div
          key={"AudioSO"+index}
          style={{ marginTop: 20 }}
          // key={item}
          className="row"
        >
          <AudioSequenceInOrder
            deleteQuestion={this.props.deleteQuestion}
            updateQuestion={this.props.updateQuestion}
            color={this.props.questions.color}
            quesNo={index}
            data={item}
          />
        </div>
      );
    }
    else if(item.category === CategoryTypes.VIDEO_SEQUENCE_ORDER){
      return (
        <div
          key={"VideoSO"+index}
          style={{ marginTop: 20 }}
          // key={item}
          className="row"
        >
          <VideoSequenceInOrder
            deleteQuestion={this.props.deleteQuestion}
            updateQuestion={this.props.updateQuestion}
            color={this.props.questions.color}
            quesNo={index}
            data={item}
          />
        </div>
      );
    }
    else if(item.category === CategoryTypes.DRAG_IMAGE_AREA){
      return (
        <div
          key={"VideoSO"+index}
          style={{ marginTop: 20 }}
          // key={item}
          className="row"
        >
          <DragImageArea
            deleteQuestion={this.props.deleteQuestion}
            updateQuestion={this.props.updateQuestion}
            color={this.props.questions.color}
            quesNo={index}
            data={item}
          />
        </div>
      );
    }
    else if(item.category === CategoryTypes.MATCH_DRAG){
      return (
        <div
          key={"MDragM"+index}
          style={{ marginTop: 20 }}
          // key={item}
          className="row"
        >
          <MatchDrag
            deleteQuestion={this.props.deleteQuestion}
            updateQuestion={this.props.updateQuestion}
            color={this.props.questions.color}
            quesNo={index}
            data={item}
          />
        </div>
      );
    }
    return result;
    })
    ;
    return result;
  };

  render() {
    return (
      <div className="mainBody">
        {/* <h1>{this.props.user.username}</h1> */}
        <Header />
        <div style={{ position: "fixed" }} className="add">
          <div className="row">
            
            {/* <AddQuestion addQuestion={this.props.addQuestion} /> */}
            <AddQuestion addQuestion={this.props.addquestions} />
            
            <br />
            
            <br />
          </div>
          
        </div>
        {/* Options */}
        <div style={{ height: 10 }} />
        <div style={{ height: 10 }} />
        <div style={{ height: 10 }} />
        <div />
        <Divider style={{ marginTop: 20 }} orientation="left">
          Options
          <NavLink to={"/test123"}>TEST PAGE</NavLink>
        </Divider>
        <Options
          onChangeColor={this.onChangeColor}
          onChangeScore={this.onChangeScore}
          onChangeTime={this.onChangeTime}
          time={this.props.questions.time}
          score={this.props.questions.score}
          color={this.props.questions.color}
        />
        <Divider style={{ marginTop: 20 }} orientation="left" />
        <div style={{flex:1, flexDirection: "row-reverse", justifyContent: "center", alignItems: "center", textAlign: "center"}}>
          <p>Questions :{" "}
          {this.props.questions.questions.length
            ? this.props.questions.questions.length
            : "0"}</p>
        
        </div>
      
        <br />
        {this.props.questions ? (
          this.renderQuestionRows()
        ) : (
          <p>No Questions Added yet</p>
        )}
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
