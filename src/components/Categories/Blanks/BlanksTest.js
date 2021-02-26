import React, { Component} from "react";
import { Card, Button} from "antd";

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
      // console.log(mod)
      // return mod;
      
    };
    
   
    onChangeHandler=(val)=>{
      // console.log(val.target)
      const m = val.target.value
      const name = Number(val.target.name)
      let ansans = this.state.userans
      ansans[name-1] = m
      this.setState({userans:ansans})
      // console.log(this.state.userans)
    };

    onClickHandler = ()=>{
      // console.log("clicked")
      let yesorno = false
      const userans = [...this.state.userans];
      const ansans = [...this.state.ans];
      if(userans.length !== ansans.length){
        yesorno = false
        // console.log("first if")
      }  
      else{ 
  // comapring each element of array 
   for(var i=0;i<userans.length;i++){
    if(userans[i] && (userans[i].toLowerCase() === ansans[i].toLowerCase())){
      yesorno = true;
      // console.log("second if")
    }

    else{
    yesorno = false;
    // console.log("else")
    break;
  } }}
      // if(userans === ansans){
      //   yesorno = true
      // }
      const data = {queNo: this.props.quesNo, userAns: userans, correctans:ansans, val:yesorno}
      // console.log(data)
      this.props.userAnsList(data, this.props.testscore, this.props.score)
      this.props.nextQue()
      // console.log("i an called nextque and updatelist");
      
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
            <form key={"BT"+m}>
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


export default BlanksTest