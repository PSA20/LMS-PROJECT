import React, { Component } from 'react';
import {Card,Checkbox, Row, Button } from 'antd';
class MultipleCheckboxTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: [],
            visible: false,
          };
    }

    onChangeC = (checkedValues) => {
        console.log('checked = ', checkedValues.target.value);
       
        let uncheck = checkedValues.target.value
        let myvalues = this.state.value
        if(myvalues.includes(uncheck)){
            const index = myvalues.indexOf(uncheck);
            if (index > -1) {
            myvalues.splice(index, 1);
            }
        this.setState({ value: myvalues });
      }
        else{
            this.setState({
                value: this.state.value.concat(uncheck)
              });
        }
        console.log("valuee", this.state.value);
    }    
    onClickHandler = ()=>{
        const userans = this.state.value.sort();
        const ansans = this.props.data.ans.sort();
        let yesorno = false
        if(userans.length !== ansans.length){
            yesorno = false
        }
        else{
            for(var i = 0; i<userans.length;i++){
                if(userans[i] === ansans[i]){
                    yesorno = true
                }
                else{
                    yesorno = false
                    break;
                }
            }
        }
      const data = {queNo: this.props.quesNo, userAns: userans, correctans:ansans, val:yesorno}
      this.props.userAnsList(data)
      this.props.nextQue()

    }

    render(){
        console.log("heuu im form render")
        console.log(this.state.value)
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
          };
        return(
            <div  className="col-12 col-sm-10 offset-sm-1">
                <Card style={{backgroundColor:this.props.color}}
                 >
        <p style={{ fontSize: 17}}>{this.props.quesNo}. {this.props.data.description}</p>
                {/* <Checkbox.Group value={this.props.data.ans}> */}
                <Checkbox.Group value={this.state.value}>
                <Row>
                    {this.props.data.options.map(index=>{
                      
                        return(
                            <Checkbox key={index} style={radioStyle} value={index} onChange={this.onChangeC}>
                            {index}
                          </Checkbox>
                        );
                        
                    })}
                </Row>
           
                      
          </Checkbox.Group>
                </Card>
                <Button type="primary" style={{float:"right"}} onClick={this.onClickHandler}>Next</Button>
            </div>
        )
    }
}


export default MultipleCheckboxTest