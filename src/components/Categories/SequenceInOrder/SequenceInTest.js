import React, {Component} from 'react';
import { Card,  List } from 'antd';
import classes from './SequenceInOrder.module.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
class SequenceInTest extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            visible: false,
            mydata: this.props.data.options,
          };
    }
    handleOnDragEnd = (result) =>{
        if (!result.destination) return;
        console.log(result)
        const items = Array.from(this.state.mydata);
        
        const [reorderedItem] = items.splice(result.source.index, 1);
        console.log(reorderedItem)
        items.splice(result.destination.index, 0, reorderedItem);
        console.log(items)
        this.setState({mydata: items})
        
        
    }

    render(){

        return(
            <div  className="col-12 col-sm-10 offset-sm-1">
                <Card style={{backgroundColor:this.props.color}}
                  >
        <p style={{ fontSize: 17}}>{this.props.quesNo}. {this.props.data.description}</p>
            {/* </div> */}
            <DragDropContext onDragEnd={this.handleOnDragEnd}>
            <Droppable droppableId="characters" >
    {(provided) => (
            <ol className = "characters" {...provided.droppableProps} ref={provided.innerRef}>
            {this.state.mydata.map(index=>{
                console.log(index.split(",,"))
                // let x = 123 
                // let lala = index.split(",,")
                // {this.props.data.options.indexOf(index)}
                return(
                    <Draggable key = {index} draggableId={index} index= {this.state.mydata.indexOf(index)}>
                    {(provided) => (
                    <li className={classes.MyListDiv} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>{index}
                   {/* </List.Item> */}
                   </li>
                    // </div>
                     )}
                     </Draggable>
                    
            )
                  
            })}
            {/* </List> */}
            {provided.placeholder}
            </ol>
            )}
            </Droppable>
            </DragDropContext>
            
            </Card>
            </div>
        )
    }
}
// <div className={classes.MyListDiv}>
// {/* <div > */}
// {/* <List.Item */}

export default SequenceInTest;

