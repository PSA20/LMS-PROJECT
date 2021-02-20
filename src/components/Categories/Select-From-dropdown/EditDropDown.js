import React, { Component } from "react";
import AddQuestionFooter from "../../AddQuestionFooter";
import { Button, Input, Checkbox } from "antd";
import {
  CloseCircleTwoTone,
  PlusOutlined,
  DeleteTwoTone,
} from "@ant-design/icons";
import "./Styles.css";
import { ERROR_COLOR } from "../../../util/colors";
import * as CategoryTypes from "../../../util/Categories";
const { TextArea } = Input;
export default class EditDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: this.props.data.description,
      options: this.props.data.options,
      addOptionFields: [],
      addOptionFieldsError: [],

      ans: this.props.data.ans,

      ansError: "",
      descriptionError: "",
    };
  }

  onAddQuestion = () => {
    if(this.state.description.length === 0){
        this.setState({descriptionError: "Description cannot be Empty!"});
    }else{
      var temp = this.state.description;
      var dropdownCount = (temp.match(/Dropdown/g) || []).length;
      var optionCount= this.state.options.length;
      if(dropdownCount > optionCount){
          this.setState({descriptionError: "Count of Dropdown is not equal"});
      }else if(dropdownCount === optionCount){
        if(optionCount>0){
          const data={category: CategoryTypes.SELECT_FROM_DROPDOWN, description: this.state.description, options: this.state.options, ans: this.state.ans, id : this.props.data.id};
          //console.log("data: ", data);
          this.props.updateQuestion(data, this.props.question.key)
          this.props.handleOk();
        }else{
          this.setState({descriptionError: "Add atleast one Dropdown"});
        }
      }
      else{
          this.setState({descriptionError: "Count of Dropdown is not equal"});
      }
    }
}
_handleKeyDown = (e) => {
 
}
  onChangeDescription = (e) => {
    let value = e.target.value;
    if (e.key === 'Enter') {
     // console.log('do validate');
    
      value= value + "\n";
      //console.log("value: ",value);
      this.setState({ description: value });
    }
    console.log(value);
    this.setState({ description: value });
  };
  onEnterOptionValue = (index, e) => {
    const value = e.target.value;
    let newArr = this.state.addOptionFields.splice();
    newArr[index] = value;
    this.setState({ addOptionFields: newArr });
  };
  onOptionChangeValue = (e, index, optionIndex) => {
    const value = e.target.value;
    let optionArray = this.state.options[index].split(",");
    optionArray[optionIndex] = value;
    let newOptionArray = optionArray.join(",");
    optionArray = this.state.options;
    optionArray[index] = newOptionArray;
    this.setState({ options: optionArray });
  };
  onDeleteOptionValue = (index, optionIndex) => {
    let optionValue = this.state.options[index].split(",");
    // let del = optionValue.splice(optionIndex, 1);
    let options = this.state.options;
    if (optionIndex === this.state.ans[index]) {
      //if we remove checked then make ans 0 index
      let ans = this.state.ans;
      ans[index] = 0;
      this.setState({ ans });
    }

    if (optionIndex < this.state.ans[index]) {
      let ans = this.state.ans;
      let ansValue = this.state.ans[index];
      // console.log("ans value: ", ansValue);
      ans[index] = ansValue - 1;
      this.setState({ ans });
    }
    const newOptionValue = optionValue.join(",");
    options[index] = newOptionValue;
    this.setState({ options: options });
  };
  onChangeCheckedOptionValue = (index, optionIndex) => {
    let ans = this.state.ans;
    ans[index] = optionIndex;
    this.setState({ ans: ans });
  };
  onAddOptionValueBtn = (index) => {
    const value = this.state.addOptionFields[index];
    let addOptionFields = this.state.addOptionFields;
    //addOptionFields--->index

    //if emty display errors

    if (value.length === 0) {
      let err = "Please Enter Value and then Add";
      let addOptionFieldsError = this.state.addOptionFieldsError;
      addOptionFieldsError[index] = err;
      this.setState({ addOptionFieldsError });
      setTimeout(() => {
        addOptionFieldsError = this.state.addOptionFieldsError;
        addOptionFieldsError[index] = "";
        this.setState({ addOptionFieldsError });
      }, 2000);
    } else {
      //check if same exists
      let optionsValue = this.state.options[index].split(",");
      if (optionsValue.includes(value)) {
        let err = "Already Exists";
        let addOptionFieldsError = this.state.addOptionFieldsError;
        addOptionFieldsError[index] = err;
        this.setState({ addOptionFieldsError });
        setTimeout(() => {
          addOptionFieldsError = this.state.addOptionFieldsError;
          addOptionFieldsError[index] = "";
          this.setState({ addOptionFieldsError });
        }, 2000);
      } else {
          if(optionsValue[0]===""){
              optionsValue[0]=value;
              const newOptionsValue = optionsValue.join(",");
        const options = this.state.options;
        options[index] = newOptionsValue;

        addOptionFields[index]="";
        this.setState({ options, addOptionFields });
          }else{
        optionsValue.push(value);
        const newOptionsValue = optionsValue.join(",");
        const options = this.state.options;
        options[index] = newOptionsValue;

        addOptionFields[index]="";
        this.setState({ options, addOptionFields });
        // adding to options //
          }
      }
    }
  };

  onDeleteDropDown = (index) => {
    let { ans, options, addOptionFields, addOptionFieldsError, description} = this.state;
    ans.splice(index,1);
   
    options.splice(index,1);
    addOptionFields.splice(index,1);
    addOptionFieldsError.splice(index,1);
    const str= "#"+(index+1)+" Dropdown#";
    const newDesc=description.split(str).join("");
    let count=1; 
    // let first=true; let skip=false;
    let finalDesc=newDesc.split("Dropdown#");
    let Desc=[];
  //  console.log("newDesc: ", newDesc);
    //console.log("finaldescBefore: ", finalDesc);//
    finalDesc.forEach((item,index)=>{
      
         const length= item.length;
       
         if(item.length>1){
             let n=length-3;
            
             if(item[n]==="#"){
                 n++;
                 let str=item.split("");
                 str[n]=count+"";
                 let newStr=str.join("");
                 count++;
                // console.log("str: ", newStr);
                 Desc.push(newStr);
            
             }else{
               // console.log("item: ", item);
                Desc.push(item);
             }

         }else{
          //  console.log("item: ", item);
            Desc.push(item);
         }
  
    });
 
    let finaldescription= Desc.join("Dropdown#");
    if(Desc.length===1){
        var c = (finaldescription.match(/Dropdown/g) || []).length;
        var f = (finaldescription.match(/#/g) || []).length;
        if(c===0 && f===1){
        finaldescription=finaldescription+"Dropdown#";}
    }
  
    this.setState({ans, options, addOptionFields, addOptionFieldsError, description: finaldescription});
  }

  onAddDropdown = () => {
        let {description, ans, options, addOptionFields, addOptionFieldsError} = this.state;
        let length = this.state.options.length;
        description = description + " #"+(length+1)+" Dropdown#";
        ans[length]=0;
        options[length]="";
        addOptionFields[length]="";
        addOptionFieldsError[length]="";
        this.setState({description, ans, options, addOptionFields, addOptionFieldsError});
  }

  renderAddDropdownSection = (item, index) => {
    const optionArray = item.split(","); //1,2,3
    return (
      <div style={{textAlign: "center"}} className="col-11 col-sm-4 offset-sm-1 dropdown-container-style">
        <div id="box">
          <Button onClick={()=>{this.onDeleteDropDown(index);}} type="text" id="icon-delete-dropdown">
            <span>
              <CloseCircleTwoTone
                style={{ fontSize: 20 }}
                twoToneColor="#eb2f96"
              />
            </span>
          </Button>
        </div>
        {/* input field and add button */}
        <h5 style={{margin : 7}}>Dropdown #{index+1}</h5>
        <div
          style={{ marginTop: 10 }}
          className="row no-gutters enter-option-value-container"
        >
          <div className="enter-option-value-input">
            <Input
              value={this.state.addOptionFields[index]}
              onChange={(e) => this.onEnterOptionValue(index, e)}
              placeholder="Enter Option Value to Add"
            />
          </div>
          <div className="enter-option-value-add-btn">
            <Button
              onClick={() => {
                this.onAddOptionValueBtn(index);
              }}
              type="primary"
            >
              <span>
                <PlusOutlined
                  style={{
                    color: "white",
                    verticalAlign: "baseline",
                    fontSize: 18,
                  }}
                />
              </span>
            </Button>
          </div>
        </div>
        {/* error row */}
        <div className="row no-gutters">
          <p style={{ color: ERROR_COLOR }}>
            {this.state.addOptionFieldsError[index]}
          </p>
        </div>
        {/* List of options */}

        {this.state.options[index] !== ""
          ? optionArray.map((item, optionIndex) => {
              let checked = false;
              if (optionIndex === this.state.ans[0]) {
                checked = true;
              }
              return (
                <div className="row ">
                  <div className="checkbox-div">
                    <Button type="text">
                      <Checkbox
                        checked={checked}
                        onChange={(e) => {
                          this.onChangeCheckedOptionValue(index, optionIndex);
                        }}
                      />
                    </Button>
                  </div>
                  <div className="option-value-div">
                    <Input
                      value={item}
                      onChange={(e) => {
                        this.onOptionChangeValue(e, index, optionIndex);
                      }}
                      placeholder="Option Value"
                    />
                  </div>
                  <div className="option-value-delete-div">
                    <Button
                      onClick={() => {
                        this.onDeleteOptionValue(index, optionIndex);
                      }}
                    >
                      <span>
                        <DeleteTwoTone
                          twoToneColor="#eb2f96"
                          style={{ verticalAlign: "baseline" }}
                        />{" "}
                      </span>
                    </Button>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    );
  };
  render() {
    // console.log(this.state.ans);
    return (
      <>
        <div>
          {/* <h1>Select from Dropdown</h1> */}
        </div>

        <div className="row">
          <div className="col-12 col-sm-10 offset-sm-1">
            <TextArea
              placeholder="Enter Your Question"
              value={this.state.description}
              onChange={this.onChangeDescription}
              rows={4}
              onKeyDown={this._handleKeyDown}
            />
          </div>
          <div className="col-12 col-sm-10 offset-sm-1">
            <p style={{ color: ERROR_COLOR }}>
                {this.state.descriptionError}
            </p>
          </div>
        </div>
        <div className="row">
            <div  className="col-12 col-sm-10 offset-sm-1">
                <div >
                <Button onClick={()=>this.onAddDropdown()} type="primary" style={{position: "absolute", right :13}}>Add Dropdown</Button>
                </div>
                
            </div>
        </div>
        <br/><br/>
        <div className="row">
          {this.state.options.map((item, index) => {
            return <>{this.renderAddDropdownSection(item, index)}</>;
          })}
        </div>
        <AddQuestionFooter
            type="Update"
          handleCancel={this.props.handleCancel}
          handleOk={this.onAddQuestion}
        />
      </>
    );
  }
}
