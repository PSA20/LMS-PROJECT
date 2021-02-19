import React, {Component} from "react";
import {  Divider } from "antd";
import Header from "../Header";
import { connect } from "react-redux";
import {  withRouter } from "react-router-dom";


class SubmitTest extends Component{
    render(){
        console.log(this.props)
        return(
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
            <Divider style={{ marginTop: 20 }} orientation="center">
              Completed Test Succusfully
            </Divider>
            <br />
            <div style={{textAlign:"center"}}>
            <h1>Your Score: {this.props.testscore}</h1>
            {this.props.list.map(id =>{
                // console.log(id)
                return(
                    <div>
                        <p>QueNo:{id.queNo}, userAns:{id.userAns}, CorrectAns:{id.correctans}</p>
                    </div>
                )
                
            })}
            </div>
            
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      user: state.user,
      questions: state.question,
      option: state.option,
      list: state.question.list,
      testscore: state.question.testscore
    };
  };

export default withRouter(connect(mapStateToProps,)(SubmitTest))