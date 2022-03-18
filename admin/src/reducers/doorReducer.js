/* eslint-disable import/no-anonymous-default-export */
export default (state=[],action)=>{
    if(action.type==='FETCH_PUERTAS'){
        return action.payload
    }
    else if(action.type==='BLOCK_GATE'){
        return state
    }
    return state
}