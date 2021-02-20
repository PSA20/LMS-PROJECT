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
export const changetime = (time) =>{
  return dispatch=>{
    axios.put("https://ymstutor-lms-default-rtdb.firebaseio.com/time.json",time)
    .then(
      res =>{
        console.log("from change time in db",res)
        dispatch(changeTime(res.data))
      })
    .catch(err=>{console.log(err)})
  }
}
export const changescore = (score) =>{
  return dispatch=>{
    axios.put("https://ymstutor-lms-default-rtdb.firebaseio.com/score.json",score)
    .then(
      res =>{
        console.log("from change score in db",res)
        dispatch(changeScore(res.data))
      })
    .catch(err=>{console.log(err)})
  }
}
export const changecolor = (color) =>{
  console.log("from redux",color)
  return dispatch=>{
    axios.put("https://ymstutor-lms-default-rtdb.firebaseio.com/color.json",{color})
    .then(
      res =>{
        console.log("from change color in db",res)
        dispatch(changeColor(res.data.color))
      })
    .catch(err=>{console.log(err)})
  }
}
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

// continur from here add change in exam score to db



export const fetchQuestionsFail =(error)=>{
  return {
    type: ActionTypes.FETCH_QUESTIONS_FAIL,
    error: error
};
}
export const fetchcolorfail =(error)=>{
  return {
    type: ActionTypes.FETCH_COLOR_FAIL,
    error: error
};
}
export const fetchcolorsuccess = (color) =>{
  return{
    type: ActionTypes.FETCH_COLOR_SUCCESS,
    color: color
  }
}
export const fetchscorefail =(error)=>{
  return {
    type: ActionTypes.FETCH_SCORE_FAIL,
    error: error
};
}
export const fetchscoresuccess = (score) =>{
  return{
    type: ActionTypes.FETCH_SCORE_SUCCESS,
    score: score
  }
}
export const fetchtimefail =(error)=>{
  return {
    type: ActionTypes.FETCH_TIME_FAIL,
    error: error
};
}
export const fetchtimesuccess = (time) =>{
  return{
    type: ActionTypes.FETCH_TIME_SUCCESS,
    time: time
  }
}
export const deletequestion = (id,key) =>{
  console.log(id, key)
  return dispatch =>{
    axios.delete('https://ymstutor-lms-default-rtdb.firebaseio.com/questions/'+key+".json")
    .then(res =>{
      console.log(res)
      dispatch(deleteQuestion(id))
    })
  }
}
export const updatequestion = (data, key) =>{
  // console.log(data.id, data.key)
  return dispatch =>{
    axios.put('https://ymstutor-lms-default-rtdb.firebaseio.com/questions/'+key+".json",data)
    .then(res =>{
      console.log(res)
      dispatch(updateQuestion(data))
    })
    .catch( err =>{console.log(err)})
  }
}

export const addquestions = (data) =>{
  console.log(data)
  return dispatch =>{
    axios.post("https://ymstutor-lms-default-rtdb.firebaseio.com/questions.json",data)
    .then(res =>{
      console.log(res)
      dispatch(addQuestion(data))
    })
  }
}

 export const initquestions = () =>{
  console.log("res")
   return dispatch =>{
    // dispatch( FetchQuestionsStart() );
    axios.get("https://ymstutor-lms-default-rtdb.firebaseio.com/questions.json")
   .then(res=>{
     console.log(res)
     let x = 0
     const fetcheddata = [];
        for ( let key in res.data ) {
          x = x + 1
          fetcheddata.push( {
            ...res.data[key],
            id: x,
            key: key
        } );
        }
        console.log(fetcheddata)
        dispatch(fetchQuestionsSuccess(fetcheddata));
      })
   .catch(err=>{
     console.log(err)
     dispatch( fetchQuestionsFail( err ) );
   })
   }
   
 }
 export const changetestscore = (list, totsc, s) =>{
   return dispatch =>{
     const arr = list
     const acscore = totsc
     let score = 0
     if(arr.val){
      score = s + acscore
     }
     else{
       score = acscore
     }
    axios.put("https://ymstutor-lms-default-rtdb.firebaseio.com/testscore.json",score)
    .then(res =>{
      dispatch(userAnsList(list, score))
    })
   }
 }
 export const initcolor = () =>{
   return dispatch =>{
     axios.get("https://ymstutor-lms-default-rtdb.firebaseio.com/color.json")
     .then(res =>{
      console.log(res)
      dispatch(fetchcolorsuccess(res.data.color))
     })
     .catch(err =>{
      console.log(err)
      dispatch(fetchcolorfail(err))
     })
   }
 }
 export const initscore = () =>{
  return dispatch =>{
    axios.get("https://ymstutor-lms-default-rtdb.firebaseio.com/score.json")
    .then(res =>{
     console.log(res)
     dispatch(fetchscoresuccess(res.data))
    })
    .catch(err =>{
     console.log(err)
     dispatch(fetchscorefail(err))
    })
  }
}
export const inittime = () =>{
  return dispatch =>{
    axios.get("https://ymstutor-lms-default-rtdb.firebaseio.com/time.json")
    .then(res =>{
     console.log(res)
     dispatch(fetchtimesuccess(res.data))
    })
    .catch(err =>{
     console.log(err)
     dispatch(fetchtimefail(err))
    })
  }
}

 export const userAnsList = ( list, score )=>({
  
  type: ActionTypes.USER_ANS_LIST,
  payload: list,
  score: score
 })

//  export const updateAnsList = (list) =>({
//   type: ActionTypes.USER_ANS_LIST,
//   payload: list
//  })