import React, {Component} from 'react';
import {Card, Button} from 'antd';
import classes from "./MatchDrag.module.css";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
class DragImageAreaTest extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            visible: false,
            rightoptions: [...this.props.data.rightoptions],
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
            lrr: [...this.props.data.ans],
            leftans: new Array(this.props.data.leftoptions.length),
            rightans: new Array(this.props.data.rightoptions.length),
            soptions: [...this.props.data.ans]

            

          };
    }
    handleOnDragEnd = (result) =>{
        console.log(result)
        if (!result.destination) return;
        const leftans = this.state.leftoptions
        const rightans = this.state.rightoptions
        const sopt = this.state.answers
        const sourceid = result.source.droppableId.substring(3)
        const destid = result.destination.droppableId.substring(3)
        const sid = result.source.droppableId.substring(0,3)
        const did = result.destination.droppableId.substring(0,3)

        if(sid === "opt" && did === "lef"){
            console.log("entered")
            const srcindex = sopt.indexOf(sourceid)
            const temp = leftans.indexOf(destid)
            console.log(srcindex, temp)
            const opts = [...this.state.soptions]
            const lefts = [...this.state.leftans]
            if(lefts[temp]){
                return;
            }
            lefts[temp] = result.draggableId.substring(3)
            opts[srcindex] = ""
            console.log(lefts, opts)
            this.setState({soptions: opts, leftans: lefts})
        }
        if(sid === "opt" && did === "rig"){
            console.log("entered")
            const srcindex = sopt.indexOf(sourceid)
            const temp = rightans.indexOf(destid)
            console.log(srcindex, temp)
            const opts = [...this.state.soptions]
            const rights = [...this.state.rightans]
            if(rights[temp]){
                return;
            }
            rights[temp] = result.draggableId.substring(3)
            opts[srcindex] = ""
            console.log(rights, opts)
            this.setState({soptions: opts, rightans: rights})
        }
        if(sid === "rig" && did === "opt"){
            console.log("entered r to o")
            const srcindex = rightans.indexOf(sourceid)
            const temp = sopt.indexOf(destid)
            console.log(srcindex, temp)
            console.log(rightans, sopt)
            const opts = [...this.state.soptions]
            const rights = [...this.state.rightans]
            if(opts[temp]){
                return;
            }
            opts[temp] = result.draggableId.substring(3)
            rights[srcindex] = ""
            console.log(rights, opts)
            this.setState({soptions: opts, rightans: rights})
        }
        if(sid === "lef" && did === "opt"){
            console.log("entered")
            const srcindex = leftans.indexOf(sourceid)
            const temp = sopt.indexOf(destid)
            console.log(srcindex, temp)
            const opts = [...this.state.soptions]
            const lefts = [...this.state.leftans]
            if(opts[temp]){
                return;
            }
            opts[temp] = result.draggableId.substring(3)
            lefts[srcindex] = ""
            console.log(lefts, opts)
            this.setState({soptions: opts, leftans: lefts})
        }
        else{
            return;
        }
        console.log(result)
    }


    myleftanslist=(m,data)=>{
        // console.log(this.state.arr[m])
        let temp = this.state.leftans[m]
        // console.log(isNaN(temp))
        if(!temp){
            // console.log(m)
            return(<div></div>)
        }
        else{
            // console.log("bllllllll")
            return(
                <div>
                        <Draggable key = {temp} draggableId={"lef"+temp} index= {m}>
                        {(provided) => (
                           
                        <li className={classes.MyListDiv}
                         ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>{this.state.leftans[m]}
                       </li>
                         )}
                         </Draggable>
                            </div>
            );
        }
    }
    myrightanslist=(m,data)=>{
        // console.log(this.state.arr[m])
        let temp = this.state.rightans[m]
        // console.log(isNaN(temp))
        if(!temp){
            // console.log(m)
            return(<div></div>)
        }
        else{
            // console.log("bllllllll")
            return(
                <div>
                        <Draggable key = {temp} draggableId={"rig"+temp} index= {m}>
                        {(provided) => (
                           
                        <li className={classes.MyListDiv}
                         ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>{this.state.rightans[m]}
                       </li>
                         )}
                         </Draggable>
                            </div>
            );
        }
    }

    myoptionlist = (m) =>{
        let temp = this.state.soptions[m]
        if(!temp){
            // console.log(m)
            return(<div></div>)
        }
        else{
            // console.log("bllllllll")
            return(
                <div className={classes.MyListDivDown}>
                        <Draggable key = {temp} draggableId={"opt"+temp} index= {m}>
                        {(provided) => (
                           
                        <li className={classes.MyListDiv}
                         ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>{this.state.soptions[m]}
                       </li>
                         )}
                         </Draggable>
                            </div>
            );
        }
    }
    onClickHandler = ()=>{
        const userleftans = [...this.state.leftans];
        const userrightans = [...this.state.rightans];
        const leftans = [...this.state.leftoptions];
        const rightans = [...this.state.rightoptions];
        const userans = userleftans.concat(userrightans)
        const correct = leftans.concat(rightans)
        let yesorno = false
        for(var i = 0; i<correct.length;i++){
            if(userans[i] === correct[i]){
                yesorno = true;
            }
            else{
                yesorno = false;
                break;
            }
        }
      const data = {queNo: this.props.quesNo, userAns: userans ,correctans:correct, val:yesorno}
      this.props.userAnsList(data, this.props.testscore, this.props.score)
      this.props.nextQue()

    }

    render(){

        console.log(this.state.answers)
        console.log(this.props.data.imageurl)
        return(
            <div  className="col-12 col-sm-10 offset-sm-1">
                <Card style={{backgroundColor:this.props.color}}
                  >
        <p style={{ fontSize: 17}}>{this.props.quesNo}. {this.props.data.description}</p>

        <div className={classes.DivinRow}>

        
<DragDropContext onDragEnd={this.handleOnDragEnd}>
        <div className={classes.DivinCol}> 
        <div >
    {this.state.leftoptions.map(index =>{
    let ma =this.state.leftoptions.indexOf(index)
    const renderdataa = this.myleftanslist(ma,index)
        return(
        <Droppable droppableId={"lef"+index} >
        {(provided, snapshot) => (
        <ul  className = "characters" 
        style={{listStyleType:"none", background: snapshot.isDraggingOver ? "lightblue" : "lightgrey"}} 
        {...provided.droppableProps} ref={provided.innerRef}>
                                     
        <div className={classes.DivinCol2}>
            <div className={classes.MyListDrop}>
                <p  style={{textAlign:"center"}}>{}</p>
            </div>
            {renderdataa}
        </div>                                                            
        {provided.placeholder}
        </ul>                            
        )}                        
        </Droppable>
        )})}
    
</div>
</div>
{/* </DragDropContext> */}
<img className={classes.Img} src={this.props.data.imageurl} alt={"img"}/>

{/* <DragDropContext onDragEnd={this.handleOnDragEnd}> */}
<div className={classes.DivinCol}> 
<div >
    {this.state.rightoptions.map(index =>{
    let ma =this.state.rightoptions.indexOf(index)
    const renderdataa = this.myrightanslist(ma,index)
        return(
        <Droppable droppableId={"rig"+index} >
        {(provided, snapshot) => (
        <ul  className = "characters" 
        style={{listStyleType:"none", background: snapshot.isDraggingOver ? "lightblue" : "lightgrey"}} 
        {...provided.droppableProps} ref={provided.innerRef}>
                                     
        <div className={classes.DivinCol2}>
            <div className={classes.MyListDrop}>
                <p  style={{textAlign:"center"}}>{}</p>
            </div>
            {renderdataa}
        </div>                                                            
        {provided.placeholder}
        </ul>                            
        )}                        
        </Droppable>
        )})}
</div>
</div>
 {/* </DragDropContext> */}
{/* </div> */}
<p>Drag and drop the below options in suitable places</p>
{/* <DragDropContext onDragEnd={this.handleOnDragEnd}> */}
<div > 
<div className={classes.DivinRow} >
    {this.state.answers.map(index =>{
    let ma =this.state.answers.indexOf(index)
    const renderdataa = this.myoptionlist(ma,index)
        return(
        <Droppable droppableId={"opt"+index} >
        {(provided, snapshot) => (
        <ul  className = "characters" 
        style={{listStyleType:"none", background: snapshot.isDraggingOver ? "lightblue" : "lightgrey"}} 
        {...provided.droppableProps} ref={provided.innerRef}>
                                     
        <div className={classes.DivinCol2}>
            <div className={classes.MyListDrop}>
                <p  style={{textAlign:"center"}}>{}</p>
            </div>
            {renderdataa}
        </div>                                                            
        {provided.placeholder}
        </ul>                            
        )}                        
        </Droppable>
        )})}
</div>
</div>
</DragDropContext>
</div>

            </Card>
            <Button type="primary" style={{float:"right"}} onClick={this.onClickHandler}>Next</Button>
            </div>
        )
    }
}








export default DragImageAreaTest;

