/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import {Button, Menu, Dropdown } from "antd";
import CustomTime from "./modals/CustomTime";
import CustomScore from "./modals/CustomScore";
import * as colors from "../util/colors";

export default class Options extends Component {
    constructor(props){
        super(props);
        this.state={ 
            ModalTimeVisible: false,
            ModalTimeLoading: false,
            ModalScoreVisible: false,
            ModalScoreLoading: false, 
          
            scoreError: false,
            timeError: false,
          
        }
    }
  componentDidMount() {}
  
  showModalTime = () => {
    this.setState({
        ModalTimeVisible: true,
    });
  };

  handleOk = () => {
    this.setState({ ModalTimeLoading: true });
    setTimeout(() => {
      this.setState({ ModalTimeLoading: false, ModalTimeVisible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ ModalTimeVisible: false });
  };

  
  showModalScore = () => {
    this.setState({
        ModalScoreVisible: true,
    });
  };

  handleOkScore = () => {
    this.setState({ ModalScoreLoading: true });
    setTimeout(() => {
      this.setState({ ModalScoreLoading: false, ModalScoreVisible: false });
    }, 3000);
  };

  handleCancelScore = () => {
    this.setState({ ModalScoreVisible: false });
  };

    ColorMenu =()=> {
        return(
          <Menu>
               <Menu.Item onClick={()=>{this.props.onChangeColor("white");}}>
            <a target="_blank"  rel="noopener noreferrer">
              Default
            </a>
          </Menu.Item>
          <Menu.Item onClick={()=>{this.props.onChangeColor(colors.LIGHTBLUE);}}>
            <a target="_blank" rel="noopener noreferrer" >
              Light Blue
            </a>
          </Menu.Item>
          <Menu.Item onClick={()=>{this.props.onChangeColor(colors.LIGHTYELLOW);}}>
            <a target="_blank" rel="noopener noreferrer">
              Light Yellow
            </a>
          </Menu.Item>
          <Menu.Item onClick={()=>{this.props.onChangeColor(colors.LIGHTGREEN);}}>
            <a target="_blank" rel="noopener noreferrer">
              Light Green
            </a>
          </Menu.Item>
         
        </Menu>
    );}
    ScoreMenu =()=> {
      return(
        <Menu>
             <Menu.Item onClick={()=>{this.props.onChangeScore(1);}}>
          <a target="_blank"  rel="noopener noreferrer">
            1pt
          </a>
        </Menu.Item>
        <Menu.Item onClick={()=>{this.props.onChangeScore(2);}}>
          <a target="_blank" rel="noopener noreferrer" >
            2pt
          </a>
        </Menu.Item>
        <Menu.Item onClick={()=>{this.props.onChangeScore(5);}}>
          <a target="_blank" rel="noopener noreferrer">
            5pt
          </a>
        </Menu.Item>
        <Menu.Item onClick={this.showModalScore}>
          <a target="_blank" rel="noopener noreferrer">
            custom
          </a>
        </Menu.Item>
       
      </Menu>
  );}
  TimeMenu =()=> {
      return(
        <Menu>
             <Menu.Item onClick={()=>{this.props.onChangeTime(10);}}>
          <a target="_blank"  rel="noopener noreferrer">
            10 mins
          </a>
        </Menu.Item>
        <Menu.Item onClick={()=>{this.props.onChangeTime(15);}}>
          <a target="_blank" rel="noopener noreferrer" >
            15 mins
          </a>
        </Menu.Item>
        <Menu.Item onClick={()=>{this.props.onChangeTime(30);}}>
          <a target="_blank" rel="noopener noreferrer">
            30mins
          </a>
        </Menu.Item>
        <Menu.Item onClick={()=>{this.props.onChangeTime(60);}}>
          <a target="_blank" rel="noopener noreferrer">
            60 mins
          </a>
        </Menu.Item>
        <Menu.Item onClick={()=> {this.showModalTime();}}>
        <a target="_blank"  rel="noopener noreferrer">
            custom
          </a>
        </Menu.Item>
      </Menu>
  );}

  renderColorName=(color)=>{
    if(color===colors.LIGHTYELLOW){
      return "Light Yellow";
    }else if(color===colors.LIGHTGREEN){
      return "Light Green";
    }else if(color===colors.LIGHTBLUE){
      return "Light Blue";
    }else{
      return "White";
    }
  }
    render() {
        return (
            <div className="row">
            <div style={{marginTop: 10}} className="col-md-3 offset-md-1  offset-sm-1 col-sm-10 offset-1 col-10">
            <Dropdown overlay={this.ColorMenu} placement="bottomLeft" arrow>
        <Button block className="">Choose Color : {this.renderColorName(this.props.color)}</Button>
    </Dropdown>
            </div>

            <div style={{marginTop: 10}} className="col-md-3 offset-md-1 offset-sm-1  col-sm-10 offset-1 col-10">
            <Dropdown overlay={this.ScoreMenu} placement="bottomLeft" arrow>
        <Button  block className="">Choose Score : {this.props.score} pts</Button>
    </Dropdown>
    <CustomScore onChange={this.props.onChangeScore} score={this.props.score} visible={this.state.ModalScoreVisible} loading={this.state.ModalScoreLoading} handleCancel={this.handleCancelScore} handleOk={this.handleOkScore}  />
            </div>
            <div style={{marginTop: 10}} className="offset-1 col-10  col-md-3 offset-md-1 offset-sm-1  col-sm-10  ">
            <Dropdown overlay={this.TimeMenu} placement="bottomLeft" arrow>
        <Button  block className="">Choose Time : {this.props.time}</Button>
      
    </Dropdown>
    <CustomTime onChange={this.props.onChangeTime} time={this.props.time} visible={this.state.ModalTimeVisible} loading={this.state.ModalTimeLoading} handleCancel={this.handleCancel} handleOk={this.handleOk}  />
            </div>
        </div>
        );
    }
}
