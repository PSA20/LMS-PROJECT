import React, {useState} from 'react'
import { Modal, Card, Radio} from "antd";
// import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
// import EditTrueFalse from "./EditTrueFalse";
export default function TrueAndFalse(props) {
    // const [visible, toggleModal] = useState(false);
    const [value, setValue] = React.useState(1);
    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      };
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
      const onChange = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
        // if(){

        // }
        // write a if statement to check the ans and verify it and change the total score if possible or store the required 
        // data such as the correct ans and the submitted ans...
      };
      console.log(props)
    return (
        <div className="col-12 col-sm-10 offset-sm-1">
        <Card
          style={{ backgroundColor: props.color }}
          
        >
         
<div>
<p style={{ fontSize: 17 }}>
           
           {props.quesNo}. {props.data.description}
          
         </p>
         {/* <Radio.Group  value={props.data.ans[0]} onChange={onChange}> */}
         <Radio.Group  value={value} onChange={onChange}>
      <Radio style={radioStyle} value={true}>True</Radio>
      <Radio style={radioStyle} value={false}>False</Radio>
      
    </Radio.Group>
</div>

        </Card>
        {/* <Modal
          style={{ width: 1000 }}
          title="Edit Question"
          visible={visible}
          onCancel={() => props.handleCancel()}
          width={1200}
          footer={null}
        >
           <EditTrueFalse updateQuestion={props.updateQuestion} data={props.data} handleOk={handleOk} handleCancel={handleCancel}/> 
        </Modal> */}
      </div>
    )
}
