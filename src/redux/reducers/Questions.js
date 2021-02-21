import * as types from "../types/Questions";
import {updateObject} from "../types/utility";

const initialState = {
  questions: [
      // {       id:123,
      //         category: "Multiple Choice",
      //         description: "How long one-one meeting with the subordinate last.",
      //         options: ["5 mins", "10 mins", "15 mins"],
      //         ans: ["5 mins"],
      //       }, {       id:126,
      //         category: "Fill in the Blanks",
      //         description: "____ of America is ____ .but ____ is the capital of Australia",
      //         options: [],
      //         ans: ["Capital","New York", "Sydney"],
      //       }, {       id:16,
      //         category: "Select From Dropdown",
      //         description: "Islamabad is the capital of  #1 Dropdown#. China is her  #2 Dropdown#",
      //         options: ["Pakistan,India","bestfriend,enemy"],
      //         ans: [0,0],
      //       },{       id:166,
      //         category: "True and False",
      //         description: "Is Trump President of America.",
      //         options: [],
      //         ans: [false],
      //       },{       id:"ale",
      //         category: "Multiple Checkbox",
      //         description: "From the below options select the states in INDIA",
      //         options: ["New York", "Telangana",  "Nepal","Kerala"],
      //         ans: ["Telangana", "Kerala"],
      //       },{       id:"ale",
      //       category: "Sequence In Order",
      //       description: "From the below options place them in alphabetical order ",
      //       options: ["Dino", "From",  "Apple","Cat"],
      //       ans: ["Apple", "Cat", "Dino", "From"],
      //     },{       id:"maaa",
      //     category: "Matching Words",
      //     description: "From the below options Match them correctly ",
      //     leftoptions: ["A","B","C","D"],
      //     rightoptions: ["Cat", "Dino", "Apple", "Banana"],
      //     ans: ["Apple", "Banana", "Cat", "Dino"],
      //   },{       id:"match",
      //   category: "Match Drag",
      //   description: "From the below options Drag and drop in correact positions ",
      //   leftoptions: ["A","B","C","D"],
      //   rightoptions: ["Cat", "Dino", "Apple", "Banana"],
      //   ans: ["C", "D", "A", "B"],
      // }
            
  ],
  color: "white",
  score:1,
  testscore:0,
  time:60,
  list:[]
}


const fetchQuestionsSuccess = (state, action)=>{
  return updateObject(state,{
    questions: action.data
  });
};
const fetchQuestionsFail = ( state, action ) => {
  return updateObject( state, { questions: [] } );
};


export const Questions = ( state = initialState, action) => {
  switch (action.type) {
    case types.ADD_QUESTION:
       action.payload.id= action.payload.ans[0];
      //  console.log(action.payload)
      //  console.log(state.questions)
       const newOrder = {
        ...action.payload
        // id:action.payload.ans[0]
    }
    const updateobj = {
      questions: state.questions.concat(newOrder)}
      // return { ...state, questions: state.questions.concat(action.payload) };
      // return {...state, questions: [...state.questions, action.payload]}
      return updateObject(state, updateobj)
    // case types.INIT_QUESTIONS:
    //   axios.

    case types.DELETE_QUESTION:
        const newArray= state.questions.filter(item=>{return item.id!==action.payload});
        return { ...state, questions: newArray};
    case types.CHANGE_COLOR:
         return { ...state, color: action.payload} 
    case types.CHANGE_SCORE:
            return { ...state, score: action.payload}
    case types.CHANGE_TIME:
            return { ...state, time: action.payload}  
    case types.USER_ANS_LIST:
       const arr = action.payload
      //  console.log(state.list)
      //  console.log(action)
      //  const actualscore = state.testscore
      //  console.log(arr.val)
      //  console.log(state.list)
      // //  let score = action.payload.score
      // let score = 0
      //  if(arr.val){
      //   score = action.score + actualscore
      //  }
      //  else{
      //    score = actualscore
      //  }
      // //  const score = action.payload.score + actualscore
      //  console.log(state)
      //  console.log(arr)
      //  console.log(score)
      //  console.log(action)
      //  console.log(state.list)
       return{...state, list:[...state.list, arr],testscore: action.score }
      // return state
    case types.UPDATE_QUESTION:
      console.log(action.payload)
            const question=action.payload;
           // console.log("question: ",question);
            const id= question.id;
          //  console.log("id: ",id);
            var foundIndex = state.questions.findIndex(x => x.id === id);
           // console.log("found index: ",foundIndex);
            state.questions[foundIndex]=question;
            console.log("state: ",state);
            return { ...state, questions: state.questions}    
    case types.FETCH_QUESTIONS_SUCCESS: return fetchQuestionsSuccess(state, action);
    case types.FETCH_QUESTIONS_FAIL: return fetchQuestionsFail(state,action)
    case types.FETCH_COLOR_SUCCESS: return updateObject(state,{color: action.color});
    case types.FETCH_COLOR_FAIL: return updateObject( state, { color: "white" } );
    case types.FETCH_SCORE_SUCCESS: return updateObject(state,{score: action.score});
    case types.FETCH_SCORE_FAIL: return updateObject( state, { score: 1 } );
    case types.FETCH_TIME_SUCCESS: return updateObject(state,{time: action.time});
    case types.FETCH_TIME_FAIL: return updateObject( state, { time: 60 } );


    default:
            return state;
  }
  // return state;
};

export default Questions;