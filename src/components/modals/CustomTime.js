import { Modal, Button, InputNumber, Form } from 'antd';
import React from "react";
// const formItemLayout = {
//     labelCol: {
//       xs: { span: 24 },
//       sm: { span: 5 },
//     },
//     wrapperCol: {
//       xs: { span: 24 },
//       sm: { span: 12 },
//     },
//   };
export default class CustomTime extends React.Component {
 

  

  render() {
    const { visible, loading } = this.props;
    return (
      <>
        
        <Modal
          visible={visible}
          title="Custom Time"
          onOk={this.props.handleOk}
          onCancel={this.props.handleCancel}
          footer={[
            <Button key="back" onClick={this.props.handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.props.handleOk}>
              Submit
            </Button>,
          ]}
        >
          {/* <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p> */}
          <Form {...this.formItemLayout}>
         
         <Form.Item  hasFeedback validateStatus="success">
           <InputNumber onChange={(val)=> {this.props.onChange(val)}} value={this.props.time}  style={{ width: '100%' }} />
         </Form.Item>
               </Form>
             
        </Modal>
      </>
    );
  }
}
