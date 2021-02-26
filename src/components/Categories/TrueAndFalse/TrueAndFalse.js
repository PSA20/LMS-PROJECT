import React, {useState} from 'react'
import { Modal, Card, Radio} from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import EditTrueFalse from "./EditTrueFalse";
export default function TrueAndFalse(props) {
    const [visible, toggleModal] = useState(false);
    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      };
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
        props.deleteQuestion(props.data.id, props.data.key);
      };

    return (
        <div className="col-12 col-sm-10 offset-sm-1">
        <Card
          style={{ backgroundColor: props.color }}
          actions={[
            <EditTwoTone
              onClick={() => {
                showModal();
              }}
              twoToneColor="#52c41a"
              key="edit"
            />,
            <DeleteTwoTone
              onClick={() => {
                onDelete();
              }}
              twoToneColor="#eb2f96"
              key="del"
            />,
          ]}
        >
         
<div>
<p style={{ fontSize: 17 }}>
           
           {props.quesNo}. {props.data.description}
          
         </p>
         <Radio.Group  value={props.data.ans[0]}>
      <Radio style={radioStyle} value={true}>True</Radio>
      <Radio style={radioStyle} value={false}>False</Radio>
      
    </Radio.Group>
</div>

        </Card>
        <Modal
          style={{ width: 1000 }}
          title="Edit Question"
          visible={visible}
          onCancel={() => props.handleCancel()}
          width={1200}
          footer={null}
        >
           <EditTrueFalse updateQuestion={props.updateQuestion} data={props.data} handleOk={handleOk} handleCancel={handleCancel}/> 
        </Modal>
      </div>
    )
}
