import React, { useState } from "react";
import { Modal, Card } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import {EditFillInTheBlanks} from "./EditFillInTheBlanks";
const blankString = "____";


const myIncludes=(str)=>{
    if(str.includes(".")){
        return true;
    }else if(str.includes(",")){
        return true;
    }else if(str.includes("'")){
        return true;
    }else if(str.includes("\"")){
        return true;
    }
    return false;
};

export const BlanksTest = (props) => {
 // console.log("props: ",props.data);
  const [visible, toggleModal] = useState(false);

  const showModal = () => {
    toggleModal(true);
  };

  const handleOk = () => {
    toggleModal(false);
  };

  const handleCancel = () => {
    toggleModal(false);
  };
  const onDelete = () => {
    props.deleteQuestion(props.data.id);
  };
  var numOfBlanks;
  const makeNumberedBlanks = (sen) => {
    const words = sen.split('____');
    
    let mod = "";
    let c=1;
    for(let i=0;i<words.length;i++){
      if(words[i].length>0){
        
        mod+= "("+c+")____"+words[i];
        c++;
      }
      
    }
    numOfBlanks = c-1;
    return mod;
  };
  
  const makeDescription = (desc) => {
    //console.log("ans: ",props.data.ans[0]);
    const array = desc.split(" ");
    let count = 0;
    const result = array.map((item, index) => {
      // console.log(index);
      if((myIncludes(item)) &&  item.includes("____")){
        console.log("found: ", item);
        if (item[item.length - 1] === ".") {
            
            count=count+1
          return (
            <span style={{ color: "#1890ff", textDecoration: "underline" }}>
              {props.data.ans[count-1]}
              
              
            </span>
          );
        } else if (item[0] === ".") {
            console.log("found");
            count=count+1;
            return (
                <span style={{ color: "#1890ff", textDecoration: "underline" }}>.{" "} 
                  {props.data.ans[count-1]}
                  
                </span>
              );
        }else if (item[item.length - 1] === ",") {
            count=count+1;
            return (
              <span style={{ color: "#1890ff", textDecoration: "underline" }}>
                {props.data.ans[count-1]}
                {","}
                
              </span>
            );
          } else if (item[0] === ",") {
            count=count+1;
              return (
                  <span style={{ color: "#1890ff", textDecoration: "underline" }}>,{" "} 
                    {props.data.ans[count-1]}
                    
                  </span>
                );
          }
          
      }else{ 
      if (item === blankString) {
        count=count+1;
        return (
          <span style={{ color: "#1890ff", textDecoration: "underline" }}>
            {props.data.ans[count-1]}{" "}
           
          </span>
        );
      } else if (item !== blankString) {
        return <span>{item} </span>;
      }
    
    }if(item.includes(".")){
        count=count+1;
        const arr= item.split(".");
        if(arr[0]===blankString){
            return(<>
            <span style={{ color: "#1890ff", textDecoration: "underline" }}>
            {props.data.ans[count-1]}
            
          </span>. {arr[1]} {" "}</>);
        }else{
            return(
            <>{arr[0]}.
            <span style={{ color: "#1890ff", textDecoration: "underline" }}>
            {props.data.ans[count-1]} {" "}
            
          </span>
          </>);
        }
    }
    if(item.includes(",")){
        count=count+1;
        const arr= item.split(",");
        if(arr[0]===blankString){
            return(<>
            <span style={{ color: "#1890ff", textDecoration: "underline" }}>
            {props.data.ans[count-1]}
            
          </span>, {arr[1]} {" "}</>);
        }else{
            return(
            <>{arr[0]},
            <span style={{ color: "#1890ff", textDecoration: "underline" }}>
            {props.data.ans[count-1]} {" "}
            
          </span>
          </>);
        }
    }
     
    });


     //console.log("last result");
    return result;
  };
  return (
    <div className="col-12 col-sm-10 offset-sm-1">
      <Card
        style={{ backgroundColor: props.color }}
        
      >
        <p style={{ fontSize: 17 }}>
         
          {props.quesNo}. {makeNumberedBlanks(props.data.description)}
        </p>
        <div>
        {Array(numOfBlanks).fill(0).map((item, i) =>{
           return (<span>{i+1}<input style={{marginLeft:"5px",marginBottom:"2px"}}></input><br/></span>)
        })}
        </div>
      </Card>
      <Modal
        style={{ width: 1000 }}
        title="Edit Question"
        visible={visible}
        onCancel={() => handleCancel()}
        width={1200}
        footer={null}
      >
         <EditFillInTheBlanks updateQuestion={props.updateQuestion} data={props.data} handleOk={handleOk} handleCancel={handleCancel}/> 
      </Modal>
    </div>
  );
};


export default BlanksTest