import React, { Component} from "react";
import { Card, Button} from "antd";
// import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
// import {EditFillInTheBlanks} from "./EditFillInTheBlanks";
// const blankString = "____";


// const myIncludes=(str)=>{
//     if(str.includes(".")){
//         return true;
//     }else if(str.includes(",")){
//         return true;
//     }else if(str.includes("'")){
//         return true;
//     }else if(str.includes("\"")){
//         return true;
//     }
//     return false;
// };

// export const BlanksTest = (props) => {
class BlanksTest extends Component{

    state = {
      description:this.props.data.description,
      ans: this.props.data.ans,
      userans:new Array(this.props.data.ans.length),
      numOfBlanks:0,
      mod:""
    }
    
  
  componentDidMount(){
    this.makeNumberedBlanks(this.state.description)
  }
    // console.log(props)
    makeNumberedBlanks = (sen) => {
      const words = sen.split('____');
      let na = 0
      let mod = "";
      let c=1;
      for(let i=0;i<words.length;i++){
        if(words[i].length>0){
          
          mod+= "("+c+")____"+words[i];
          c++;
        }
        
      }
      na = c-1;
      this.setState({numOfBlanks:na, mod:mod})
      console.log(mod)
      // return mod;
      
    };
    
   
    onChangeHandler=(val)=>{
      // console.log(val.target)
      const m = val.target.value
      const name = Number(val.target.name)
      let ansans = this.state.userans
      ansans[name-1] = m
      this.setState({userans:ansans})
      console.log(this.state.userans)
    };

    onClickHandler = ()=>{
      console.log("clicked")
      let yesorno = false
      const userans = this.state.userans
      const ansans = this.state.ans
      if(userans.length !== ansans.length){
        yesorno = false
      }  
      else{ 
  // comapring each element of array 
   for(var i=0;i<userans.length;i++){
     if(!userans[i]){
      yesorno = false;
      break;
     }
    if(userans[i].toLowerCase() === ansans[i].toLowerCase()){
    yesorno = true
   }
    else{
    yesorno = false;
    break;
  } }}
      // if(userans === ansans){
      //   yesorno = true
      // }
      const data = {queNo: this.props.quesNo, userAns: userans, correctans:ansans, val:yesorno}
      console.log(data)
      this.props.userAnsList(data)
      this.props.nextQue()
      console.log("i an called nextque and updatelist");
      
    };

    render(){
      return(
        <div className="col-12 col-sm-10 offset-sm-1">
      <Card
        style={{ backgroundColor: this.props.color }}
        
      >
        <p style={{ fontSize: 17 }}>
         
          {this.props.quesNo}. {this.state.mod}
        </p>
        <div>
        {Array(this.state.numOfBlanks).fill(0).map((item, i) =>{
          let m = i+1
           return (
            <form>
            <label>{m}
           <input style={{marginLeft:"5px",marginBottom:"2px"}} 
           type="text"
           name={m}
           key={m} onChange={(val)=>{this.onChangeHandler(val)}}>
             </input>
             <br/>
             </label>
             </form>)
        })}
        </div>
      </Card>
      <Button type="primary" style={{float:"right"}} onClick={this.onClickHandler}>Next</Button>
     
    </div>
      )
    }
  }
 // console.log("props: ",props.data);
  // const [visible, toggleModal] = useState(false);

  // const showModal = () => {
  //   toggleModal(true);
  // };

  // const handleOk = () => {
  //   toggleModal(false);
  // };

  // const handleCancel = () => {
  //   toggleModal(false);
  // };
  // const onDelete = () => {
  //   props.deleteQuestion(props.data.id);
  // };


export default BlanksTest

 // const makeDescription = (desc) => {
  //   //console.log("ans: ",props.data.ans[0]);
  //   const array = desc.split(" ");
  //   let count = 0;
  //   const result = array.map((item, index) => {
  //     // console.log(index);
  //     if((myIncludes(item)) &&  item.includes("____")){
  //       console.log("found: ", item);
  //       if (item[item.length - 1] === ".") {
            
  //           count=count+1
  //         return (
  //           <span style={{ color: "#1890ff", textDecoration: "underline" }}>
  //             {props.data.ans[count-1]}
              
              
  //           </span>
  //         );
  //       } else if (item[0] === ".") {
  //           console.log("found");
  //           count=count+1;
  //           return (
  //               <span style={{ color: "#1890ff", textDecoration: "underline" }}>.{" "} 
  //                 {props.data.ans[count-1]}
                  
  //               </span>
  //             );
  //       }else if (item[item.length - 1] === ",") {
  //           count=count+1;
  //           return (
  //             <span style={{ color: "#1890ff", textDecoration: "underline" }}>
  //               {props.data.ans[count-1]}
  //               {","}
                
  //             </span>
  //           );
  //         } else if (item[0] === ",") {
  //           count=count+1;
  //             return (
  //                 <span style={{ color: "#1890ff", textDecoration: "underline" }}>,{" "} 
  //                   {props.data.ans[count-1]}
                    
  //                 </span>
  //               );
  //         }
          
  //     }else{ 
  //     if (item === blankString) {
  //       count=count+1;
  //       return (
  //         <span style={{ color: "#1890ff", textDecoration: "underline" }}>
  //           {props.data.ans[count-1]}{" "}
           
  //         </span>
  //       );
  //     } else if (item !== blankString) {
  //       return <span>{item} </span>;
  //     }
    
  //   }if(item.includes(".")){
  //       count=count+1;
  //       const arr= item.split(".");
  //       if(arr[0]===blankString){
  //           return(<>
  //           <span style={{ color: "#1890ff", textDecoration: "underline" }}>
  //           {props.data.ans[count-1]}
            
  //         </span>. {arr[1]} {" "}</>);
  //       }else{
  //           return(
  //           <>{arr[0]}.
  //           <span style={{ color: "#1890ff", textDecoration: "underline" }}>
  //           {props.data.ans[count-1]} {" "}
            
  //         </span>
  //         </>);
  //       }
  //   }
  //   if(item.includes(",")){
  //       count=count+1;
  //       const arr= item.split(",");
  //       if(arr[0]===blankString){
  //           return(<>
  //           <span style={{ color: "#1890ff", textDecoration: "underline" }}>
  //           {props.data.ans[count-1]}
            
  //         </span>, {arr[1]} {" "}</>);
  //       }else{
  //           return(
  //           <>{arr[0]},
  //           <span style={{ color: "#1890ff", textDecoration: "underline" }}>
  //           {props.data.ans[count-1]} {" "}
            
  //         </span>
  //         </>);
  //       }
  //   }
     
  //   });


  //    //console.log("last result");
  //   return result;
  // };