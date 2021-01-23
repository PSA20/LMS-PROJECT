import React, { Component } from "react";
import { connect } from "react-redux";
import {  withRouter } from "react-router-dom";
import Header from "../Header";
import Countdown from "react-countdown";
import {  Divider } from "antd";
import * as CategoryTypes from '../../util/Categories';
import MultipleChoiceTest from "../Categories/Multiple Choice/MultipleChoiceTest";
import BlanksTest from "../Categories/Blanks/BlanksTest";
import DropDownTest from "../Categories/Select-From-dropdown/DropDownTest";
import TrueAndFalseTest from "../Categories/TrueAndFalse/TrueAndFalseTest";
import MultipleCheckboxTest from "../Categories/MultipleCheckbox/MultipleCheckboxTest";
import SequenceInTest from "../Categories/SequenceInOrder/SequenceInTest";
import MatchingWordsTest from "../Categories/MatchingWords/MatchingWordsTest";
import MatchDragTest from "../Categories/MatchDrag/MatchDragTest";
// import MultipleC from "../Categories/Multip"

class MyTest extends Component{


  renderQuestionRows = () => {
    //<MultipleChoice quesNo={1} data={data} />
    //    const ques = this.props.questions;
    //console.log("ques.ques: ",this.props.questions.questions);

    const result = this.props.questions.questions.map((item, index) => {
      //console.log("item ",item);
      index++;
      //console.log("item: ", item.category)
      if(item.category === CategoryTypes.MULTIPLE_CHOICE){
      return (
        <div
          key={item.ans[0]}
          style={{ marginTop: 20 }}
          // key={item}
          className="row"
        >
          <MultipleChoiceTest
            color={this.props.questions.color}
            // actions={[
                    
            //   <EditTwoTone onClick={()=>{(new MultipleChoice()).showModal();}} twoToneColor="#52c41a"   key="edit" />,
            //   <DeleteTwoTone onClick={()=>{this.onDelete();}} twoToneColor="#eb2f96" key="del"/>,
            // ]}
            quesNo={index}
            data={item}
          />
        </div>
      );
    }else if(item.category === CategoryTypes.FILL_IN_THE_BLANKS){
     // console.log("sdfsd");
      return (
        <div
          key={item.ans[0]}
          style={{ marginTop: 20 }}
          // key={item}
          className="row"
        >
          <BlanksTest
            color={this.props.questions.color}
            quesNo={index}
            data={item}
          />
        </div>
      );
    }else if(item.category === CategoryTypes.SELECT_FROM_DROPDOWN){
      return (
        <div
          key={item.ans[0]}
          style={{ marginTop: 20 }}
          // key={item}
          className="row"
        >
          <DropDownTest
            color={this.props.questions.color}
            quesNo={index}
            data={item}
          />
        </div>
      );
    }else if(item.category === CategoryTypes.TRUE_AND_FALSE){
      return (
        <div
          key={item.ans[0]}
          style={{ marginTop: 20 }}
          // key={item}
          className="row"
        >
          <TrueAndFalseTest
            color={this.props.questions.color}
            quesNo={index}
            data={item}
          />
        </div>
      )
      ;
    }
    else if(item.category === CategoryTypes.MULTIPLE_CHECKBOX){
      return (
        <div
          key={item.ans[0]}
          style={{ marginTop: 20 }}
          // key={item}
          className="row"
        >
          <MultipleCheckboxTest
            color={this.props.questions.color}
            quesNo={index}
            data={item}
          />
        </div>
      );
    }
    else if(item.category === CategoryTypes.SEQUENCE_IN_ORDER){
      return (
        <div
          key={item.ans[0]}
          style={{ marginTop: 20 }}
          // key={item}
          className="row"
        >
          <SequenceInTest
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
          key={item.ans[0]}
          style={{ marginTop: 20 }}
          // key={item}
          className="row"
        >
          <MatchingWordsTest
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
          key={item.ans[0]}
          style={{ marginTop: 20 }}
          // key={item}
          className="row"
        >
          <MatchDragTest
            color={this.props.questions.color}
            quesNo={index}
            data={item}
          />
        </div>
      );
    }
    })
    ;
    return result;
  };


    render(){
        console.log(this.props.questions.time)
        return(
            // <div>
            //     <Countdown date={Date.now() + 30000}></Countdown>
            //     <Countdown date={Date.now() + (this.props.questions.time * 60 * 1000)}></Countdown>
            // </div>
            <div className="mainBody">
        {/* <h1>{this.props.user.username}</h1> */}
        <Header />
        <div style={{ position: "fixed" }} className="add">
          <div className="row">
            <br />
            <hr />
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
        </Divider>
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
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    // addQuestion: (data) => dispatch(addQuestion(data)),
    // updateQuestion: (data) => dispatch(updateQuestion(data)),
    // deleteQuestion: (data) => {
    //   dispatch(deleteQuestion(data));
    // },
    // changeColor: (color) => {
    //   dispatch(changeColor(color));
    // },
    // changeScore: (score) => {
    //   dispatch(changeScore(score));
    // },
    // changeTime: (time) => {
    //   dispatch(changeTime(time));
    // },
  });
  const mapStateToProps = (state) => {
    return {
      user: state.user,
      questions: state.question,
      option: state.option
    };
  };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyTest));