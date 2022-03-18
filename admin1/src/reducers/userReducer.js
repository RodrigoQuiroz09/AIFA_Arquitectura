/* eslint-disable import/no-anonymous-default-export */
export default (state={tipo:''},action)=>{
    if(action.type==='SIGN_IN'){
        return action.payload
    }else if(action.type==='SIGN_OUT'){
        localStorage.removeItem('token')
        window.location.href='/login'
        return action.payload
    }
    return state
}