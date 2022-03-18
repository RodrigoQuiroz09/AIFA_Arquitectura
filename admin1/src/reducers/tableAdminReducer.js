/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-anonymous-default-export */
export default (state=[],action)=>{
    if(action.type==='FETCH_HIST_ALL'){
        return action.payload
    }else if(action.type==='DENY_UNIQUE'){  
        var index=state.map((item)=>{
            if(item.id===action.payload.id){
                item.estatus=2
            }
            return item
        })
        return [...index]
    }
    else if(action.type==='ACCEPT_UNIQUE'){  
        var index=state.map((item)=>{
            if(item.id===action.payload.id){
                item.estatus=1
            }
            return item
        })
        return [...index]
    }else if(action.type==='ACCEPT_PETITION'){  
        var index=state.map((item)=>{
            if(item.id===action.payload.id){
                item.estatus=1
            }
            return item
        })

        var auxIndex=index.map((x)=>{
            action.payload.auxId.map((y)=>{
                if(y===x.id){
                    x.estatus = 2
                }
            })
            return x
        })
        return [...auxIndex]
    }
    return state
}