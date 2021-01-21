import React, { Component } from "react";
import { Input,  Button, Divider, List } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import Joi from "joi-browser";
import * as Schemas from "../../Schemas/Mcqs";
import "../Multiple Choice/MakeMultipleChoice.css";
import classes from './SequenceInOrder.module.css'
const { TextArea } = Input;

const errorStyleText = {
  color: "#eb2f96",
};
export default class MakeMultipleCheckbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      descriptionError: "",
      optionValue: "",
      optionValueError: "",
      AnsValueError: "",
      addorupdate : "Add Question",
      options: [],
      Answers:[],
      optionsError: "",
      AnsValue:"",
      value: [],
    };
  }
  componentDidMount() {
    if(this.props.description){
      console.log(this.props.question)
        this.setState({description: this.props.question.description,
            options: this.props.question.options,
            Answers: this.props.question.ans,
            addorupdate : "Update Question"})
    }
  }

  // onChangeC = (checkedValues) => {
  //   console.log('checked = ', checkedValues.target.value);
  //   console.log("valuee", this.state.value);
  //   let uncheck = checkedValues.target.value
  //   let myvalues = this.state.value
  //   if(myvalues.includes(uncheck)){
  //       const index = myvalues.indexOf(uncheck);
  //       if (index > -1) {
  //       myvalues.splice(index, 1);
  //       }
  //   this.setState({ value: myvalues });
  // }
  //   else{
  //       this.setState({
  //           value: this.state.value.concat(uncheck)
  //         });
  //   }
    
  // }
//   onChange = (e) => {
//     console.log("checked", this.state.value);
//     this.setState({
//         value: this.state.value.concat(e.target.value)
//       });
    
//   };
  onFinish = (values) => {
    console.log("Success:", values);
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  onChangeOptionField = (val) => {
    console.log(val.target.value);
    
    const value = val.target.value;
    this.setState({ optionValue: value });
    console.log(this.state.optionValue)
    //  const result=Joi.validate({description: value}, schema, { abortEarly: false } )
    // if(result.error)
    //  console.log(result.error.details[0].message);

    //const errors = {};
    //for (let item of result.error.details) errors[item.path[0]] = item.message; //in details array, there are 2 properties,path and message.path is the name of the input, message is the error message for that input.
    // console.log("errors: ", errors);
  };
  onChangeAnsField = (val) => {
    // console.log(val.target.value);
    
    const value = val.target.value;
    this.setState({ AnsValue: value });
    // console.log(this.state.AnsValue)
  };

  onChangeDescription = (e) => {
    const value = e.target.value;
    this.setState({ description: value });
  };
  onAddOption = () => {
    const result = Joi.validate(
      { option: this.state.optionValue },
      Schemas.option
    );
    if (result.error) {
      this.setState({ optionValueError: result.error.details[0].message });
    } 
    else {
      const found = this.state.options.some(
        (item) => item.toUpperCase() === this.state.optionValue.toUpperCase()
      );
      if (!found) {
        this.setState({
          options: this.state.options.concat(this.state.optionValue),
          optionValueError: "",
        });
      } else {
        this.setState({ optionValueError: "Already exists" });
      }
    }
  };
  onAddAnswer = () => {
    const result = Joi.validate(
      { option: this.state.AnsValue },
      Schemas.option
    );
    if(this.state.options.includes(this.state.AnsValue)){
      if (result.error) {
        this.setState({ AnsValueError: result.error.details[0].message });
      } 
      else {
        const found = this.state.Answers.some(
          (item) => item.toUpperCase() === this.state.AnsValue.toUpperCase()
        );
        if (!found) {
          this.setState({
            Answers: this.state.Answers.concat(this.state.AnsValue),
            AnsValueError: "",
          });
        } else {
          this.setState({ AnsValueError: "Already exists" });
        }
      }
    }
    else{
      this.setState({ AnsValueError: "Answer value is not present in Options" });
    }
    
  };

  onAddorUpdate = (ans)=>{
    if(this.state.addorupdate === "Update Question"){
      console.log("Update function is called")
      // this.setState({ descriptionError: "", optionsError: "" });
      const data={category: "Sequence In Order", description: this.state.description, options: this.state.options, ans: ans,id:this.props.question.id};
      this.props.updateQuestion(data)
    }
    else{
      console.log("ADD QUESTION function is called")
      const data={category: "Sequence In Order", description: this.state.description, options: this.state.options, ans: ans};
      this.props.addQuestion(data)
    }
  }


  onDelete = (optionsorans,option) => {
    let options = optionsorans;
    let ansans = this.state.Answers
    console.log(options, this.state)
    const index = options.indexOf(option);
    const indexans = ansans.indexOf(option);
    // if(ansans.includes(option)){
      // console.log("indexans  "+indexans)
    if (indexans > -1) {
      // console.log("ASDFASDFADFADFDFS")
        ansans.splice(indexans, 1);
    }
    
    if (index > -1) {
      options.splice(index, 1);
    }
    // console.log(this.state.value)
    // console.log("aksjhdbfallealleallealle"+ansans)
    this.setState({ options: options, Answers:ansans });
    // console.log(this.state.value)
  };
  

  renderOptions = (optionsorans) => {
    return optionsorans.map((item) => {
      return (
        <div style={{ marginTop: 7 }} id={item} className="row">
          <div className="col-5 col-sm-5 offset-sm-1">
            <div className={classes.MyListDiv}>
                        <List.Item
                        id={item}
                    title="HEYY"
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                   >{item}</List.Item>
                    </div>
          </div>
          <div className="col-2 col-sm-1 ">
            <Button onClick={() => this.onDelete(optionsorans,item)}>
              {" "}
              <span>
                <DeleteTwoTone twoToneColor="#eb2f96" />
              </span>
            </Button>
          </div>
        </div>
      );
    });
  };
  renderAnswers = () => {
    return this.state.Answers.map((item) => {
      return (
        <div style={{ marginTop: 7 }} id={item} className="row">
          <div className="col-5 col-sm-5 offset-sm-1">
            <div className={classes.MyListDiv}>
                        <List.Item
                        id={item}
                   >{item}</List.Item>
                    </div>
          </div>
          <div className="col-2 col-sm-1 ">
            <Button onClick={() => this.onDelete(this.state.Answers,item)}>
              {" "}
              <span>
                <DeleteTwoTone twoToneColor="#eb2f96" />
              </span>
            </Button>
          </div>
        </div>
      );
    });
  };
  onAddQuestion = () => {
    if (this.state.options.length > 0) {
      // options are present
      const result = Joi.validate(
        { description: this.state.description },
        Schemas.description
      );
      if (result.error) {
        this.setState({
          descriptionError: result.error.details[0].message,
          optionsError: "",
        });
      } else {
        this.setState({ descriptionError: "", optionsError: "" });
        // if (this.state.value[0]) {
          if (this.state.Answers[0]) {
          //      ADD to DATABASE
          // Closing modal
          console.log(this.state.value)
          let ans=[];
          ans = this.state.Answers
          this.onAddorUpdate(ans)
          this.props.handleOk();
        } else {
          this.setState({ optionsError: "Please Select Atleast One Option." });
        }

        
      }
    } else {
      this.setState({ optionsError: "Please add atleast one option" });
    }
  };
  render() { 
    return (
      <>
        <div className="row">
          <div className="col-12 col-sm-10 offset-sm-1">
            <TextArea
              placeholder="Enter Your Question"
              value={this.state.description}
              onChange={this.onChangeDescription}
              rows={4}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-10 offset-sm-1">
            <p style={errorStyleText}>{this.state.descriptionError}</p>
          </div>
        </div>
        <br />
        <div className={classes.BoxOrderDiv}>
        <div className="row">
          <div className="col-12 col-sm-7 offset-sm-1">
          {/* <div> */}
            <Input
            style ={{width:"250px"}}
              placeholder="Enter Option Here"
              value={this.state.optionValue}
              onChange={(val) => {
                this.onChangeOptionField(val);
              }}
            />
          </div>
          <div className="col-12 col-sm-3">
            <Button
              className="add-option"
              style={{ marginLeft: 0, width:"100px" }}
              block
              type="primary"
              success
              onClick={this.onAddOption}
            >
              {" "}
              Add Option
            </Button>
          </div>
        </div>
        <br />
        <p style={errorStyleText}>{this.state.optionValueError}</p>
        <br />
        <div className="row">
          <div className="col-12 col-sm-7 offset-sm-1">
            <Input
              style ={{width:"250px"}}
              placeholder="Enter Answer Here"
              value={this.state.AnsValue}
              onChange={(val) => {
                this.onChangeAnsField(val);
              }}
            />
          </div>
          <div className="col-12 col-sm-3">
            <Button
              className="add-option"
              style={{ marginLeft: 0, width:"105px" }}
              block
              type="primary"
              success
              onClick={this.onAddAnswer}
            >
              {" "}
              Add Answers
            </Button>
          </div>
        </div>
        </div>
        
        <div className="row">
          <div className="col-12 col-sm-10 offset-sm-1">
            
            <p style={errorStyleText}>{this.state.AnsValueError}</p>
            <br />
            <p>** Please Enter the Answers in correct sequence **</p>
          </div>
        </div>

        <br />
        <div className={classes.DivinCol}>
          <div>
          <h2>Options</h2>
        {this.renderOptions(this.state.options)}
          </div>
        <div>
        <h2>Answers in order</h2>
        {this.renderAnswers()}
        </div>
        
        </div>
        
        
        <div className="row">
          <div className="col-12 col-sm-12 offset-sm-1">
            <p style={errorStyleText}> {this.state.optionsError} </p>
          </div>
        </div>
        <Divider />
        <div className="row">
          <div className="col-12 col-sm-2 offset-sm-7">
            <Button block
              onClick={() => {
                this.props.handleCancel();
              }}
              style={{marginTop: 7}}
            >
              Cancel
            </Button>
          </div>
          <div className="col-12 col-sm-3 ">
            <Button block
              onClick={() => {
                this.onAddQuestion();
              }}
              type="primary"
              style={{marginTop: 7}}
            >
              {/* Add Question */}
              {this.state.addorupdate}
            </Button>
          </div>
        </div>
      </>
    );
  }
}