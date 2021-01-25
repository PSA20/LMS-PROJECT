import React, { Component } from 'react'
import {Card, Menu, Dropdown, Button} from "antd";
// import { EditTwoTone, DeleteTwoTone} from "@ant-design/icons";
// import EditDropDown from "./EditDropDown";
export default class DropDownSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            val: [],
            ans: [...this.props.data.ans],
            userans: new Array(this.props.data.options.length),
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
    onClickHandler = (count, e) =>{
      console.log(this.state.val)
      let ca = this.props.data.options[count].split(",")
      let ansa = []
      ansa= ca[e.key]
      // if(this.state.val[count]){
      let myans = this.state.userans
      myans[count] = ansa
      // }
      console.log( ca[e.key], e)
      console.log(ansa)
      console.log(myans)
      this.setState({val:this.state.val.concat({count, ansa}), userans:myans})
      
      console.log(this.state.val)
    }
    // onClickHandler = ({key}) =>{
    //   let ca = this.props.data.options[key]
    //   // this.setState({val:""})
    //   console.log( key,ca)
    //   // console.log(e.target)
    // }



      menu =(options, ans, count)=> {
        const optionsArr = options.split(",");
           return <Menu onClick={(e)=>{this.onClickHandler(count, e)}}>  {optionsArr.map((item,index)=>{
               // if(index === ans){
               //     return   <Menu.Item key={index} danger>{item}</Menu.Item>;
               // }else{
                   return(

                         <Menu.Item key={index} >
                         
                             {item}
                         
                         </Menu.Item>
                       
                       
                     );
               }
           // }
           )}</Menu>;
    };
    onRenderDropdownQuestion=(quesNo, data)=> {
        const dataArray = data.description.split("Dropdown#");
        let ansIndex=0;
        return(<p style={{ fontSize: 17}}>{quesNo}. {"  "}
            {dataArray.map((item, index)=>{
               // console.log("item: ", item);
                if(item.includes("#")){
                    const deepItem=item.split("#");
                    console.log("deepItem: ", deepItem);
                     return deepItem.map((item2)=>{
                        if(this.isNumeric(item2[0])){
                            ansIndex++;
                            let count=ansIndex-1;
                            let x = "-Select"
                            if(this.state.userans[count]){
                              x = this.state.userans[count]
                            }
                        return(<Dropdown overlay={this.menu(data.options[count], data.ans[count], count)}>
                            {/* <a className="ant-dropdown-link"  onClick={e => e.preventDefault()}>
                              -Select- 
                            </a> */}
                            <Button className="ant-dropdown-link"  onClick={e => e.preventDefault()}>
                              {/* -Select-  */}
                              {x}
                            </Button>
                            {/* on click event should have to save the value and the index of the dropdown and the
                            name -SELECT- have to be changed according to the options... */}
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
    onClickNextHandler = ()=>{
      console.log("clicked")
      let yesorno = false
      const userans = [...this.state.userans]
      const ansans = [...this.props.data.ans]
      console.log(ansans)
      console.log(userans)
      const options = [...this.props.data.options];
      const myans = new Array(ansans.length)
      
      for(var j = 0; j<options.length;j++){
        let x = options[j].split(",")
        console.log(x)
        myans[j] = x[ansans[j]]
        console.log(myans)
      }
      if(userans.length !== myans.length){
        yesorno = false
      }  
      else{ 
  // comapring each element of array 
        for(var i=0;i<userans.length;i++)
        if(userans[i] === myans[i]){
        yesorno = true
      }
   else{
    yesorno = false
  } }
      // if(userans === ansans){
      //   yesorno = true
      // }
      const data = {queNo: this.props.quesNo, userAns: userans, correctans:myans, val:yesorno}
      console.log(data)
      this.props.userAnsList(data)
      this.props.nextQue()
      // console.log("i an called nextque and updatelist");
      
    };

    render() {
      console.log(this)
      console.log(this.props.data.options.length)
        return (
            <div className="col-12 col-sm-10 offset-sm-1">
      <Card
        style={{ backgroundColor: this.props.color }}

      >
       {this.onRenderDropdownQuestion(this.props.quesNo, this.props.data)}
      </Card>
      <Button type="primary" style={{float:"right"}} onClick={this.onClickNextHandler}>Next</Button>

    </div>
        )
    }
}
