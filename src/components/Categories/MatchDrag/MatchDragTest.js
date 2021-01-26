import React, {Component} from 'react';
import {Card, Button} from 'antd';
import classes from "./MatchDrag.module.css";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
class MatchDragTest extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            visible: false,
            mydata: [...this.props.data.rightoptions],
            answers: [...this.props.data.ans],
            leftoptions: [...this.props.data.leftoptions],
            dragdata: {
                1:{ id:"leftoptions",
                    data:[...this.props.data.leftoptions],
                },
                2:{id:"rightoptions",
                    data:[...this.props.data.rightoptions],
                }
            },
            arr: new Array(this.props.data.rightoptions.length),
            lrr: [...this.props.data.leftoptions],

          };
    }
    handleOnDragEnd = (result) =>{
        // console.log(result)
        if (!result.destination) return;
        const items = this.state.leftoptions
        const right = this.state.mydata
        // if(right.includes(result.destination.droppableId) && right.includes(result.source.droppableId)){
        //     const arr = this.state.arr
        //     // const [reorderedItem] = arr.splice(result.source.index, 1);
        //     // arr.splice(result.destination.index, 0, reorderedItem);
        //     let temp = arr[result.source.index]
        //     arr[result.source.index] = arr[result.destination.index]
        //     arr[result.destination.index] = temp
        //     this.setState({arr: arr})
        // }
        // // console.log(items.includes(result.source.droppableId))
        if(items.includes(result.source.droppableId) && right.includes(result.destination.droppableId)){
            const srcindex = items.indexOf(result.source.droppableId);
            
            
            const temp = right.indexOf(result.destination.droppableId)
            const arr = [...this.state.arr];
            const lrr = [...this.state.lrr]
            if(arr[temp]){
                return;
            }
            // if(arr[temp] !== null){return;}
            arr[temp] = result.draggableId
            lrr[srcindex] = ""
            // console.log("right",right)
            // console.log("items",items)
            console.log("arr",arr)
            this.setState({dragdata:{
                1:{
                    id:"leftoptions",
                    data:items
                },
                2:{
                    id:"rightoptions",
                    data:right
                }
            }, arr:arr, lrr:lrr})
        }
        else if(right.includes(result.source.droppableId) && items.includes(result.destination.droppableId)){
            const srcindex = right.indexOf(result.source.droppableId);
            const temp = items.indexOf(result.destination.droppableId)
            const arr = this.state.arr
            const lrr = this.state.lrr
            if(lrr[temp]){
                return;
            }
            arr[srcindex] = ""
            lrr[temp] = result.draggableId
            // console.log("right",right)
            // console.log("items",items)
            // console.log("arr",arr)
            this.setState({dragdata:{
                1:{
                    id:"leftoptions",
                    data:items
                },
                2:{
                    id:"rightoptions",
                    data:right
                }
            }, arr:arr, lrr:lrr})
        }
        else{
            return;
        }
        // console.log(result)
    }


    myanslist=(m,data)=>{
        // console.log(this.state.arr[m])
        let temp = this.state.arr[m]
        // console.log(isNaN(temp))
        if(!temp){
            // console.log(m)
            return(<div></div>)
        }
        else{
            // console.log("bllllllll")
            return(
                <div>
                        <Draggable key = {temp} draggableId={temp} index= {m}>
                        {(provided) => (
                           
                        <li className={classes.MyListDiv}
                         ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>{this.state.arr[m]}
                       </li>
                         )}
                         </Draggable>
                            </div>
            );
        }
    }

    myoptionlist = (m) =>{
        let temp = this.state.lrr[m]
        if(!temp){
            // console.log(m)
            return(<div></div>)
        }
        else{
            // console.log("bllllllll")
            return(
                <div>
                        <Draggable key = {temp} draggableId={temp} index= {m}>
                        {(provided) => (
                           
                        <li className={classes.MyListDiv}
                         ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>{this.state.lrr[m]}
                       </li>
                         )}
                         </Draggable>
                            </div>
            );
        }
    }
    onClickHandler = ()=>{
        const ansans = [...this.state.answers];
        const userans = [...this.state.arr]
        let yesorno = false
        for(var i = 0; i<ansans.length;i++){
            if(userans[i] === ansans[i]){
                yesorno = true;
            }
            else{
                yesorno = false;
                break;
            }
        }
      const data = {queNo: this.props.quesNo, userAns: userans, correctans:ansans, val:yesorno}
      this.props.userAnsList(data, this.props.score)
      this.props.nextQue()

    }

    render(){

        // console.log(this.state.dragdata)
        return(
            <div  className="col-12 col-sm-10 offset-sm-1">
                <Card style={{backgroundColor:this.props.color}}
                  >
        <p style={{ fontSize: 17}}>{this.props.quesNo}. {this.props.data.description}</p>

            
             <DragDropContext onDragEnd={this.handleOnDragEnd}>
             <div className={classes.DivinCol}>
                {Object.entries(this.state.dragdata).map((data)=>{
                    // console.log("kajhsdkahsdkajshd",data)
                    let x = data[1]
                    // // console.log(x.data)
                    if(x.id === "leftoptions"){
                        return(
                            <div >
                                 {x.data.map(index =>{
                                     let ma =x.data.indexOf(index)
                                     const renderdataa = this.myoptionlist(ma,index)
                                          return(
                                <Droppable droppableId={index} >
                                {(provided, snapshot) => (
                                    <ul  className = "characters" 
                                    style={{listStyleType:"none", background: snapshot.isDraggingOver ? "lightblue" : "lightgrey"}} 
                                    {...provided.droppableProps} ref={provided.innerRef}>
                                     
                                            <div className={classes.DivinCol2}>
                                            <div className={classes.MyListDrop}>
                                                <p  style={{textAlign:"center"}}>{}</p>
                                             </div>
                                             {renderdataa}
                                                {/* <Draggable key = {index} draggableId={index} index= {x.data.indexOf(index)}>
                                                {(provided) => (
                                                
                                                <li className={classes.MyListDiv2}
                                                ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>{index}
                            
                                                </li>
                                
                                                )}
                                                </Draggable> */}
                                            </div>
                                          
                                            
                                            {provided.placeholder}
                                    </ul>
                                    
                                )}
                                
                                </Droppable>
                                )})}
                            </div>
                        )
                    }
                    
                    else{
                        
                        return(
                            <div>
                                {x.data.map(index =>{
                                    // console.log("rightdrop", x.data)
                                    let m =x.data.indexOf(index)
                                    const renderdata = this.myanslist(m,index)
                                    return(
                                        <Droppable droppableId={index} >
                                    {(provided, snapshot) => (
                                <ul  className = "characters" 
                                style={{listStyleType:"none",padding:"0px", background: snapshot.isDraggingOver ? "lightblue" : "lightgrey"}} 
                                {...provided.droppableProps} ref={provided.innerRef}>
                                            <div className={classes.DivinCol2}>
                                            <div className={classes.MyListDrop}>
                                                <p  style={{textAlign:"center"}}>{index}</p>
                                             </div>
                                            {renderdata}
                                            </div>
                                            {provided.placeholder}
                                </ul>
                                 )}
                                </Droppable>
                                )})}
                            
                        </div>
                        )
                        
                    }

            // {/* })}
            // {provided.placeholder}
            // </ul>
            // )}
            // </Droppable>
                    // )
                        })} 
             </div>
            </DragDropContext>
            </Card>
            <Button type="primary" style={{float:"right"}} onClick={this.onClickHandler}>Next</Button>
            </div>
        )
    }
}


export default MatchDragTest;

