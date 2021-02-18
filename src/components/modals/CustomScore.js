import { Modal, Button, InputNumber, Form } from 'antd';
import React from "react";


const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
    },
  };

export default class CustomScore extends React.Component {
 
  state = {
    score: this.props.score
  }
  onChangeAnsField = (val) => {
    console.log(val)
    this.setState({ score: val});
    // console.log(this.state.AnsValue)
  };
  

  render() {
    const { visible, loading } = this.props;
   // console.log("score: ", this.props.score)
    return (
      <>
        
        <Modal
          visible={visible}
          title="Custom Score"
          onOk={this.props.handleOk}
          onCancel={this.props.handleCancel}
          footer={[
            <Button key="back" onClick={this.props.handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={()=>{this.props.handleOk(this.state.score)}}>
              Submit
            </Button>,
          ]}
        >
          <Form {...formItemLayout}>
         
    <Form.Item  hasFeedback validateStatus="success">
      <InputNumber onChange={this.onChangeAnsField} value={this.props.score}  style={{ width: '100%' }} />
    </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}
