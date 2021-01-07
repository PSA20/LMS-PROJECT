import React, {useState} from 'react'
import {Button, Divider, Input} from "antd";
import {DeleteTwoTone} from "@ant-design/icons";
import Joi from "joi-browser";
import "./Blanks.css";
import * as Schemas from "../../Schemas/BlanksSchema";
const errorStyleText = {
    color: "#eb2f96",
  };
  const { TextArea } = Input;
  const blankString="____";
export  const MakeFillInTheBlanks = (props) => {
    const [question, setQuestion] = useState({
       
        category: "Fill in the Blanks",
        description: "",
        options: [],
        ans: [],
        
        descriptionError: "",
        blankValue: "",
        bankValueError: "",
    });
    const deleteBlankInDescription=(index)=>{
      console.log("index: ", index)
      let desc=question.description;
      const arr = desc.split("");
      let newArr=[];
      let count=0;
      let dashcount=0;
      arr.forEach((item)=>{
     
        if(item === "_"){
          console.log("dash");
          if(index===count){
           

          }else{
            dashcount++;
            newArr.push(item);
           
          }
            

        }else{
          if(dashcount===4){
            count++;
            dashcount=0;
          }
        
          newArr.push(item);
        }
      });
     
    
      const newDesc= newArr.join("");
      return newDesc;
    };
   const onDelete = (option, i) => {
        let options = question.options;
        const index = options.indexOf(option);
        if (index > -1) {
          options.splice(index, 1);
        }
       const desc= deleteBlankInDescription(i);
       
        setQuestion({ ...question,options: options, description: desc });
      };
      const onBlankValueChange=(e,index)=>{
        const value = e.target.value;
        let questionOption = question.options;
        questionOption[index]= value;
        setQuestion({ ...question,options: questionOption});

    };
    const renderOptions = () => {
  
      const {options}= question;
        
        return options.map((item, index) => {
          return (
            <div style={{ marginTop: 7 }} id={item} className="row">
              <div className="col-5 col-sm-5 offset-sm-1">
               <Input onChange={(e)=>{onBlankValueChange(e,index);}} value={item}/>
              </div>
              <div className="col-2 col-sm-1 ">
                <Button onClick={() => onDelete(item, index)}>
                  {" "}
                  <span>
                    <DeleteTwoTone twoToneColor="#eb2f96" />
                  </span>
                </Button>
              </div>
              {/* <div className="col-2 col-sm-1 ">
           
             <Button> <span><EditTwoTone twoToneColor="#52c41a" /></span></Button>
         
            </div> */}
            </div>
          );
        });
      };
  
const         onAddBlank=()=>{
    if(question.blankValue){
        const found = question.options.some(
            (item) => item.toUpperCase() == question.blankValue.toUpperCase()
          );
          if (!found) {
              let updateDesc= question.description;
              
              updateDesc= updateDesc.concat(blankString);

            setQuestion({ ...question,options:question.options.concat(question.blankValue),blankValueError: "", description: updateDesc});

          } else {
              setQuestion({ ...question, blankValueError: "Already exists"})
            
          }
    }else{
        setQuestion({ ...question, blankValueError: "Please enter Value and then Press Button !"})
    }
};


const onAddQuestion = () => {
    if (question.options.length > 0) {
      // options are present
      const result = Joi.validate(
        { description: question.description },
        Schemas.description
      );
      if (result.error) {
        setQuestion({ ...question,
          descriptionError: result.error.details[0].message,
          optionsError: "",
        });
      } else {
        setQuestion({  ...question, descriptionError: "", optionsError: "" });
        
          //      ADD to DATABASE
          // Closing modal
          const ans=question.options;
         
          const data={category: "Fill in the Blanks", description: question.description, options: [], ans: ans};
          props.addQuestion(data);
          props.handleOk();
    

        
      }
    } else {
      // options error : no option present
      setQuestion({ ...question, optionsError: "Please add atleast one option" });
    }
  };
 
    return (
        <>
        <div className="row no-gutters">
          <div  className="col-12 col-sm-7 offset-sm-1 bankValueStyle">
            <Input
              placeholder="Enter Blank Value Here"
              value={question.blankValue}
              onChange={(e) => {
                setQuestion({ ...question,blankValue: e.target.value});
              }}
            />
          </div>
          <div className="col-12 col-sm-3 ">
            <Button
              className="add-blank"
              style={{ marginLeft: 0 }}
              block
              type="primary"
              success
              onClick={()=>{onAddBlank();}}
            >
              {" "}
              Add Blank
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-10 offset-sm-1">
            <p style={errorStyleText}>{question.blankValueError}</p>
          </div>
        </div>
        <br/>
         <div className="row">
          <div className="col-12 col-sm-10 offset-sm-1">
            <TextArea
              placeholder="Enter Your Question"
              value={question.description}
              onChange={(e)=>setQuestion({...question,description: e.target.value})}
              rows={4}
            />
          </div>
        </div>
        <br/>
        {renderOptions()}
        <div className="row">
          <div className="col-12 col-sm-10 offset-sm-1">
            <p style={errorStyleText}>{question.descriptionError}</p>
          </div>
        </div>
        <Divider />
        <div className="row">
          <div className="col-12 col-sm-2 offset-sm-7">
            <Button block
              onClick={() => {
                props.handleCancel();
              }}
              style={{marginTop: 7}}
            >
              Cancel
            </Button>
          </div>
          <div className="col-12 col-sm-3 ">
            <Button block
              onClick={() => {
                onAddQuestion();
              }}
              type="primary"
              style={{marginTop: 7}}
            >
              Add Question
            </Button>
          </div>
        </div>
        </>
    );
}
