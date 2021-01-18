import React, { Component } from "react";
import { connect } from "react-redux";
import {  withRouter } from "react-router-dom";
import { EditTwoTone,  DeleteTwoTone } from '@ant-design/icons';
import {  } from "reactstrap";
import Header from "./Header";
import {  Divider } from "antd";
import "./css/main.css";
// import Options from "./Options";
import MultipleChoice from "./Categories/Multiple Choice/MultipleChoiceTest";
// import AddQuestion from "./AddQuestion";
import {Blanks} from "./Categories/Blanks/BlanksTest";
import DropDownSelect from "./Categories/Select-From-dropdown/DropDownTest";
import TrueAndFalse from "./Categories/TrueAndFalse/TrueAndFalseTest";
import * as CategoryTypes from "../util/Categories"; 
// import {

// } from "../redux/actions/QuestionActions";


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
  }
  onChangeTime = (value) => {
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if (
      (!Number.isNaN(value) && reg.test(value)) ||
      value === "" ||
      value === "-"
    ) {
      this.props.changeTime(value);
      this.setState({ time: value, timeError: false });
    } else {
      this.setState({ timeError: true });
    }
  };
  onChangeScore = (value) => {
    //console.log("value: ", value)
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if (
      (!Number.isNaN(value) && reg.test(value)) ||
      value === "" ||
      value === "-"
    ) {
      this.setState({ score: value, scoreError: false });
      this.props.changeScore(value);
    } else {
      this.setState({ scoreError: true });
    }
  };
  onChangeColor = (color) => {
    this.props.changeColor(color);
    this.setState({ color: color });
  };
  btnClick = () => {};
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
          <MultipleChoice
            color={this.props.questions.color}
            actions={[
                    
              <EditTwoTone onClick={()=>{(new MultipleChoice()).showModal();}} twoToneColor="#52c41a"   key="edit" />,
              <DeleteTwoTone onClick={()=>{this.onDelete();}} twoToneColor="#eb2f96" key="del"/>,
            ]}
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
          <Blanks 
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
          <DropDownSelect
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
          <TrueAndFalse
            color={this.props.questions.color}
            quesNo={index}
            data={item}
          />
        </div>
      );
    }
    });
    return result;
  };

  render() {
    //console.log("questions:",this.props.questions);
    // console.log("questions:",this.props.questions);
    console.log("questions:",this.props.questions);
    return (
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
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
