import React, {Component} from 'react';
import { Card, Modal, List } from 'antd';
import { EditTwoTone,  DeleteTwoTone } from '@ant-design/icons';
// import  from './MakeSequenceInOrder';
import classes from '../MatchDragImg/MatchDrag.module.css';

import MakeMatchDragImg from './MakeMatchDragImg';
class MatchDragImg extends Component{
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
    render(){
        // const ListStyle = {
        //     display: 'block',
        //     height: '30px',
        //     lineHeight: '30px',
        //   };
        return(
            // <div>
                 <div  className="col-12 col-sm-10 offset-sm-1">
                <Card style={{backgroundColor:this.props.color}}
                  actions={[
                    
                    <EditTwoTone onClick={()=>{this.showModal();}} twoToneColor="#52c41a"   key="edit" />,
                    <DeleteTwoTone onClick={()=>{this.onDelete();}} twoToneColor="#eb2f96" key="del"/>,
                  ]}>
        <p style={{ fontSize: 17}}>{this.props.quesNo}. {this.props.data.description}</p>
            {/* </div> */}
            <div className={classes.DivinCol}>
                <div>
                    <h6>Image Names</h6>
                <List itemLayout="horizontal" >
            {this.props.data.leftoptions.map(index=>{
                // console.log(index)
                return(
                    <div className={classes.MyListDiv} key={"Mergeleft"+index}>
                        <List.Item>{index}</List.Item>
                    </div>
            )})}
            </List>
                </div>
                <div>
                    <h6>Images Options</h6>
                <List itemLayout="horizontal" >
            {this.props.data.leftoptionsurl.map(index=>{
                return(
                    <div className={classes.MyListDiv} key={"Mergeright"+index}>
                        <List.Item>
                            {/* {index} */}
                            <img className={classes.Img} src={index} alt={"img"}/>
                        </List.Item>
                    </div>
            )  })}
            </List>
                </div>
                <div>
                    <h6>Swapped/Correct Order</h6>
                <List itemLayout="horizontal" >
            {this.props.data.ans.map(index=>{
                return(
                    <div className={classes.MyListDiv} key={"Mergeans"+index}>
                        <List.Item>{index}</List.Item>
                    </div>
            )  })}
            </List>
                </div>
            </div>
            
            </Card>
            <Modal
              style={{ width: 1000 }}
              title="Edit Question"
              visible={this.state.visible}
              onCancel={this.handleCancel}
              width={1200}
              footer={null}
            >
            
            <MakeMatchDragImg updateQuestion={this.props.updateQuestion} description={this.props.data.description} question={this.props.data}  handleOk={this.handleOk} handleCancel={this.handleCancel}/>
            </Modal>
            </div>
            // </div>
        )
    }
}


export default MatchDragImg;