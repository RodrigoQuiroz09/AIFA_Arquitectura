/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import {setSession} from './actions'
import { wt_decode } from './utils';

const Auth =(props)=>{
    const history=useHistory()
   
    useEffect(()=>{
        const token=localStorage.getItem('token')
        if(token){
            const session = wt_decode(token)
            if(!session){
                localStorage.removeItem('token')
                history.replace('/login')
            }else{
              props.setSession(session)
              if(session.tipo==="airline"){
                //history.replace('/home')
                }
              else if (session.tipo==="admin"){
                //history.replace('/management')
                }
            }
        }else{
            localStorage.removeItem('token')
            history.replace('/login')
        }
  
    },[])

    return(
        <div>
            
        </div>
    )
}
const mapStateToProps = state=>{
    return {session:state.session}
}
export default connect(mapStateToProps,{setSession})(Auth)