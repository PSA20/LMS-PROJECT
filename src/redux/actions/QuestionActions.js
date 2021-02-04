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
 export const fetchQuestionsSuccess=(fetchedMedic)=>{
  return {
      type: ActionTypes.FETCH_QUESTIONS_SUCCESS,
      data: fetchedMedic
  }
}
export const fetchQuestionsFail =(error)=>{
  return {
    type: ActionTypes.FETCH_QUESTIONS_FAIL,
    error: error
};
}

 export const initquestions = () =>{
  console.log("res")
   return dispatch =>{
    // dispatch( FetchQuestionsStart() );
    axios.get("https://ymstutor-lms-default-rtdb.firebaseio.com/questions.json")
   .then(res=>{
     console.log(res)
     const fetchedMedic = [];
        for ( let key in res.data ) {
          fetchedMedic.push( {
            ...res.data[key],
            id: key
        } );
        }
        console.log(fetchedMedic)
        dispatch(fetchQuestionsSuccess(res.data));
      })
   .catch(err=>{
     console.log(err)
     dispatch( fetchQuestionsFail( err ) );
   })
   }
   
 }

 export const userAnsList = ( list )=>({
  
  type: ActionTypes.USER_ANS_LIST,
  payload: list
 })

//  export const updateAnsList = (list) =>({
//   type: ActionTypes.USER_ANS_LIST,
//   payload: list
//  })