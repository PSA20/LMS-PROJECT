import React, {useState} from 'react'
import {  Card, Radio, Button} from "antd";
// import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
// import EditTrueFalse from "./EditTrueFalse";
export default function TrueAndFalse(props) {
    // const [visible, toggleModal] = useState(false);
    const [value, setValue] = useState(1);
    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      };
     
      const onChange = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
        // if(){

        // }
        // write a if statement to check the ans and verify it and change the total score if possible or store the required 
        // data such as the correct ans and the submitted ans...
      };
      const onClickHandler=()=>{
        let yesorno = false
        if(value === props.data.ans[0]){
          yesorno = true
        }
      const data = {queNo: props.quesNo, userAns: value, correctans: props.data.ans[0], val:yesorno}
      console.log(data)
      props.userAnsList(data)
      props.nextQue()
      console.log("i an called nextque and updatelist");
      }
      // console.log(props)
    return (
        <div className="col-12 col-sm-10 offset-sm-1">
        <Card
          style={{ backgroundColor: props.color }}
          
        >
         
<div>
<p style={{ fontSize: 17 }}>
           
           {props.quesNo}. {props.data.description}
          
         </p>

         <Radio.Group  value={value} onChange={onChange}>
      <Radio style={radioStyle} value={true}>True</Radio>
      <Radio style={radioStyle} value={false}>False</Radio>
      
    </Radio.Group>
</div>

        </Card>
        <Button type="primary" style={{float:"right"}} onClick={onClickHandler}>Next</Button>
    
      </div>
    )
}
