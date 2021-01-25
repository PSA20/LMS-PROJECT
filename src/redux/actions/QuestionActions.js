import * as ActionTypes from "../types/Questions";
import axios from "axios";
export const addQuestion = (question) => ({
  type: ActionTypes.ADD_QUESTION,
  payload: question,
});

export const deleteQuestion = (question) => ({
  type: ActionTypes.DELETE_QUESTION,
  payload: question,
});
export const changeColor = (color) => ({
  type: ActionTypes.CHANGE_COLOR,
  payload: color,
});

export const changeScore = (score) => ({
    type: ActionTypes.CHANGE_SCORE,
    payload: score,
  });
  export const changeTime = (time) => ({
    type: ActionTypes.CHANGE_TIME,
    payload: time,
  });

 export const updateQuestion = (question)=>({
     type: ActionTypes.UPDATE_QUESTION,
     payload: question,
 });

 export const initquestions = () =>{
   axios.get("https://ymstutor-lms-default-rtdb.firebaseio.com/questions.json")
   .then(res=>{
     console.log(res)
   })
   .catch(err=>{
     console.log(err)
   })
 }

 export const userAnsList = ( list )=>({
   type: ActionTypes.USER_ANS_LIST,
   payload: list
 })