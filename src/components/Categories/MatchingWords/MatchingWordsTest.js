import React, {Component} from 'react';
import { Card,  List, Button } from 'antd';
import classes from "./MatchingWords.module.css";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
class MatchingWordsTest extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            visible: false,
            mydata: [...this.props.data.rightoptions],
            answers: [...this.props.data.ans],
            leftoptions: [...this.props.data.leftoptions]

          };
    }
    handleOnDragEnd = (result) =>{
        if (!result.destination) return;
        // console.log(result)
        const items = Array.from(this.state.mydata);
        
        const [reorderedItem] = items.splice(result.source.index, 1);
        // console.log(reorderedItem)
        items.splice(result.destination.index, 0, reorderedItem);
        // console.log(items)
        this.setState({mydata: items})
        
        
    }
    onClickHandler = ()=>{
        const userans = [...this.state.mydata];
        const ansans = [...this.props.data.ans];
        let yesorno = false;
        for(var i = 0; i<userans.length;i++){
            if(userans[i] === ansans[i]){
                yesorno = true
            }
            else{
                yesorno = false
                break;
            }
        }
      const data = {queNo: this.props.quesNo, userAns: userans, correctans:ansans, val:yesorno}
      this.props.userAnsList(data, this.props.testscore, this.props.score)
      this.props.nextQue()

    }


    render(){

        return(
            <div  className="col-12 col-sm-10 offset-sm-1">
                <Card style={{backgroundColor:this.props.color}}
                  >
        <p style={{ fontSize: 17}}>{this.props.quesNo}. {this.props.data.description}</p>


        <div className={classes.DivinCol}>
        <div>
        <List itemLayout="horizontal" >
            {this.props.data.leftoptions.map(index=>{
                return(
                    <div className={classes.DivinCol} key={"MDT"+index}>
                        <div className={classes.MyListDiv}>
                        <List.Item>{index}</List.Item>  
                    </div>
                    <h6 style={{paddingTop:"20px"}}>-----</h6>
                    </div>
                    
            )})}
            </List>

        </div>
            {/* </div> */}
            
            <DragDropContext onDragEnd={this.handleOnDragEnd}>
            <Droppable droppableId="characters" key={"MWT"}>
    {(provided) => (
            <ul  className = "characters" style={{listStyleType:"none"}} {...provided.droppableProps} ref={provided.innerRef}>
            {this.state.mydata.map(index=>{
                // console.log(index.split(",,"))
                // let x = 123 
                // let lala = index.split(",,")
                // {this.props.data.options.indexOf(index)}
                return(
                    <div className={classes.DivinCol} key={"MDT12"+index}>
                    <Draggable key = {index} draggableId={index} index= {this.state.mydata.indexOf(index)}>
                    {(provided) => (
                    <li className={classes.MyListDiv2}
                     ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>{index}
                   {/* </List.Item> */}
                   </li>
                    // </div>
                     )}
                     </Draggable>
                     </div>
                    
            )
                  
            })}
            {/* </List> */}
            {provided.placeholder}
            </ul>
            )}
            </Droppable>
            </DragDropContext>
            
        </div>
        
            
            </Card>
            <Button type="primary" style={{float:"right"}} onClick={this.onClickHandler}>Next</Button>
            </div>
        )
    }
}
// <div className={classes.MyListDiv}>
// {/* <div > */}
// {/* <List.Item */}

export default MatchingWordsTest;

