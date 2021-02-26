import React, {useState} from 'react'
import {Input, Divider, Button, Radio} from "antd";
import {ERROR_COLOR} from "../../../util/colors";
import { TRUE_AND_FALSE} from "../../../util/Categories";
const { TextArea } = Input;

export default function EditTrueFalse(props) {
    const [question, setQuestion] = useState({
       
        category: TRUE_AND_FALSE,
        description: props.data.description,
        options: [],
        ans: props.data.ans,
        key: props.data.key,
        id: props.data.id,
        descriptionError: "",
       
    });
    const [value, setValue] = useState(props.data.ans[0]);


    const onAddQuestion = () => {
        if(question.description.length===0){
            setQuestion({ ...question,descriptionError: "Description Empty!!!"});
        }else{
            
        let ans=[];
        ans[0]=value;
             
        const data={category: "True and False", description: question.description, options: [], ans: ans};
        //console.log(data);
        props.updateQuestion(data, question.key, question.id)
        props.handleOk();
        }
      };



      const onChange = e => {
       // console.log('radio checked', e.target.value);
        setValue(e.target.value);
      };
      const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      };



    return (
        <>
       
        <div className="row">
          <div className="col-12 col-sm-10 offset-sm-1">
            <p style={{color:ERROR_COLOR}}>{question.descriptionError}</p>
          </div>
        </div>
        <br/>
         <div className="row">
          <div className="col-12 col-sm-10 offset-sm-1">
            <TextArea
              placeholder="Enter Your Question"
              value={question.description}
              onChange={(e)=>setQuestion({...question,description: e.target.value})}
              rows={4}
            />
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-12 col-sm-10 offset-sm-1">
          <Radio.Group onChange={onChange} value={value}>
      <Radio style={radioStyle} value={true}>True</Radio>
      <Radio style={radioStyle} value={false}>False</Radio>
      
    </Radio.Group>
          </div>
        </div>
        
        <Divider />
        <div className="row">
          <div className="col-12 col-sm-2 offset-sm-7">
            <Button block
              onClick={() => {
                props.handleCancel();
              }}
              style={{marginTop: 7}}
            >
              Cancel
            </Button>
          </div>
          <div className="col-12 col-sm-3 ">
            <Button block
              onClick={() => {
                onAddQuestion();
              }}
              type="primary"
              style={{marginTop: 7}}
            >
             Update
            </Button>
          </div>
        </div>
        </>
    )
}
