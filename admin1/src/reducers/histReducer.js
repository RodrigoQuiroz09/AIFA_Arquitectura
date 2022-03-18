/* eslint-disable import/no-anonymous-default-export */
export default (state=[],action)=>{
    if(action.type==='ADD_HIST'){
        return state
    }else if(action.type==='FETCH_HIST'){
        return action.payload
    }
    return state
}