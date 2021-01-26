import React, { Component } from 'react'
import { Card, Modal,Checkbox, Row } from 'antd';
import { EditTwoTone,  DeleteTwoTone } from '@ant-design/icons';
// import EditMultipleChoice from "./EditMultipleChoice";
import MakeMultipleCheckbox from "./MakeMultipleCheckbox"
export default class MultipleCheckbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            visible: false,
          };
    }
    showModal = () => {
      this.setState({ visible: true });
    };
  
    handleOk = () => {
      this.setState({ visible: false });
    };
  
    handleCancel = () => {
      this.setState({ visible: false });
    };

    onDelete=()=>{
      this.props.deleteQuestion(this.props.data.id);
    }
      onChange = e => {
        //console.log('radio checked', e.target.value);
        this.setState({
          value: e.target.value,
        });
      };
    render() {
        const radioStyle = {
          display: 'block',
          height: '30px',
          lineHeight: '30px',
        };
        
        // const { value } = this.state;
        return (
            <div  className="col-12 col-sm-10 offset-sm-1">
                <Card style={{backgroundColor:this.props.color}}
                  actions={[
                    
                    <EditTwoTone onClick={()=>{this.showModal();}} twoToneColor="#52c41a"   key="edit" />,
                    <DeleteTwoTone onClick={()=>{this.onDelete();}} twoToneColor="#eb2f96" key="del"/>,
                  ]}>
        <p style={{ fontSize: 17}}>{this.props.quesNo}. {this.props.data.description}</p>
                <Checkbox.Group value={this.props.data.ans}>
                <Row>
                    {this.props.data.options.map(index=>{
                      
                        return(
                            <Checkbox key={index} style={radioStyle} value={index}>
                            {index}
                          </Checkbox>
                        );
                        
                    })}
                </Row>
           
                      
          </Checkbox.Group>
                </Card>
            <Modal
              style={{ width: 1000 }}
              title="Edit Question"
              visible={this.state.visible}
              onCancel={this.handleCancel}
              width={1200}
              footer={null}
            >
            
            <MakeMultipleCheckbox updateQuestion={this.props.updateQuestion} question={this.props.data} description={this.props.data.description} handleOk={this.handleOk} handleCancel={this.handleCancel}/>
            </Modal>
            </div>
       
        );
      }
    
}
