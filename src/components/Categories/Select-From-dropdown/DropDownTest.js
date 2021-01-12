import React, { Component } from 'react'
import {Modal, Card, Menu, Dropdown} from "antd";
import { EditTwoTone, DeleteTwoTone} from "@ant-design/icons";
import EditDropDown from "./EditDropDown";
export default class DropDownSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
         
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
     isNumeric(str) {
        if (typeof str != "string") return false // we only process strings!  
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
               !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
      }

    onRenderDropdownQuestion=(quesNo, data)=> {
        const dataArray = data.description.split("Dropdown#");
        let ansIndex=0;
        return(<p style={{ fontSize: 17}}>{quesNo}. {"  "}
            {dataArray.map((item, index)=>{
               // console.log("item: ", item);
                if(item.includes("#")){
                    const deepItem=item.split("#");
                    // console.log("deepItem: ", deepItem);
                     return deepItem.map((item2)=>{
                        if(this.isNumeric(item2[0])){
                            ansIndex++;
                            let count=ansIndex-1;
                        return(<Dropdown overlay={this.menu(data.options[count], data.ans[count])}>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                              -Select- 
                            </a>
                          </Dropdown>);    
                        }
                        if(item2.includes("\n")){
                            const item3 = item2.split("\n");
                            return item3.map((i)=>{
                                return(<><br/> {i}</>);
                            })
                        }
                        return item2;
                     })

                }else{
                    return item;
                }
            })}
        </p>);
    }
     menu =(options, ans)=> {
         const optionsArr = options.split(",");
            return <Menu>  {optionsArr.map((item,index)=>{
                if(index === ans){
                    return   <Menu.Item key={index} danger>{item}</Menu.Item>;
                }else{
                    return(

                          <Menu.Item key={index}>
                          
                              {item}
                          
                          </Menu.Item>
                        
                        
                      );
                }
            }
            )}</Menu>;
     };
    render() {
        return (
            <div className="col-12 col-sm-10 offset-sm-1">
      <Card
        style={{ backgroundColor: this.props.color }}

      >
       {this.onRenderDropdownQuestion(this.props.quesNo, this.props.data)}
      </Card>
      <Modal
        style={{ width: 1000 }}
        title="Edit Question"
        visible={this.state.visible}
        onCancel={() => this.handleCancel()}
        width={1200}
        footer={null}
      >
         <EditDropDown updateQuestion={this.props.updateQuestion} data={this.props.data} handleOk={this.handleOk} handleCancel={this.handleCancel}/> 
      </Modal>
    </div>
        )
    }
}
