import React, { Component } from "react";
import { connect } from "react-redux";
import {  withRouter } from "react-router-dom";
import Header from "../Header";
import Countdown from "react-countdown";
import {  Divider } from "antd";

class MyTest extends Component{
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