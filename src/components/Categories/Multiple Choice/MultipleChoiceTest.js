import React, { Component } from 'react'
import { Radio,  Card, Button} from 'antd';
export default class MultipleChoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            visible: false,
            ans : this.props.data.ans[0]
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
        console.log('radio checked', e.target.value);
        console.log(this.props.data)
        //  the state.value holds the value that has been chosen by the user...
        // either we can compare them here and then store them as yes or no or else can store the real ans and user ans
        // then we can compare the list after clicking the submit button...
        this.setState({
          value: e.target.value,
        });
      };
    onClickHandler = ()=>{
      console.log("clicked")
      let yesorno = false
      const userans = this.state.value
      const ansans = this.state.ans
      console.log(userans, ansans)
      if(userans === ansans){
        yesorno = true
      }
      const data = {queNo: this.props.quesNo, userAns: userans, correctans:ansans, val:yesorno}
      this.props.userAnsList(data, this.props.testscore, this.props.score)
      this.props.nextQue()
      console.log("i an called nextque and updatelist");
      
    }


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
                  >
        <p style={{ fontSize: 17}}>{this.props.quesNo}. {this.props.data.description}</p>
                <Radio.Group onChange={this.onChange}>
                    {this.props.data.options.map(index=>{
                      
                        return(
                            <Radio key={index} style={radioStyle} value={index}>
                            {index}
                          </Radio>
                        );
                    })}
          </Radio.Group>
                </Card>
                <Button type="primary" style={{float:"right"}} onClick={this.onClickHandler}>Next</Button>
            </div>
       
        );
      }
    
}
