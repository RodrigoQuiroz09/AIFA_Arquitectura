import React from 'react';
import { useState } from 'react';
import {useHistory} from 'react-router-dom'
import Grid from '@mui/material/Grid';
import logo from '../../images/aifa_logo.png'
import {  Button,  TextField } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import { wt_decode } from '../../utils';

import {setSession} from '../../actions'
import {connect} from 'react-redux'
//http://localhost:5000

import './Login.css'

const Login =(props)=>{
    const [pass,setPass]=useState('')
    const [email,setEmail]=useState('')
    const history=useHistory()

    async function loginUser(event){
        event.preventDefault()
        const response = await fetch('http://localhost:5000/api/login',{
            method:'POST',
 
        headers:{
            'Content-Type':'application/json'
        },    
        body:JSON.stringify({
                email,
                pass
            })
        })

        const data = await response.json()

        if(data.user ===true){
            if (data.token){
                localStorage.setItem('token',data.token)
                const session=wt_decode(data.token)
                props.setSession(wt_decode(data.token))
                alert('Login successful')
                if(session.tipo==="airline"){
                    history.replace('/home')
                    }
                else if (session.tipo==="admin"){
                    history.replace('/management')
                }
            }

        } else{
            alert('Please check your email or password')
        }
        
    }

    return(
        <div>

            <Grid container style={{maxHeight:'100vh',overflow:'hidden'}}>
                <div className='image-login'> 
                    <img
                    src="https://sinne.com.mx/wp-content/uploads/2020/06/1.2-CD-AERO-AIFA.png"
                    style={{width:'100%', height:'100vh', objectFit:'cover'}}
                    alt='Aereopuerto'
                    />
                </div>
                <Grid 
                    item 
                    container 
                    xs={12} sm={6} 
                    alignItems="center" 
                    direction="column" 
                    justifyContent="center" 
                    style={{padding:10}} 
                >
               
                    <div className='container-no-img'>
                        <div className='login_form'>
                            <Grid container justifyContent={"center"} >
                                <img src={logo} alt="logo" width={200}/>
                            </Grid>
                            <div className='spacer'/>
    
                            <div className='text-input-icon'>
                                <AccountCircle  sx={{ color: 'action.active', mr: 1, my: 1.1 }}/>
                                <TextField 
                                    value={email}   
                                    onChange={(e)=>{setEmail(e.target.value)}}
                                    id="input-with-sx" 
                                    label="Usuario" 
                                    variant="standard" 
                                    margin ="normal" 
                                    style={{flexGrow:10}}
                                />
                            </div>        
                            
                            <div className='text-input-icon'>
                                <PasswordIcon  sx={{ color: 'action.active', mr: 1, my: 1.1 }}/>
                                <TextField 
                                    value={pass} 
                                    onChange={(e)=>{setPass(e.target.value)}}
                                    id="input-with-sx" 
                                    label="Contraseña" 
                                    variant="standard" 
                                    margin ="normal" 
                                    type={'password'}
                                    style={{flexGrow:10}}
                                />
                            </div>

                            <div className='spacer'/>
                            <div className='spacer'/>

                            <Button color="primary" variant="contained" onClick={loginUser}>
                                Login
                            </Button>
                        </div>
                    </div>


                </Grid>
              
            </Grid>
  

        </div>
    )
}

const mapStateToProps = state=>{
    return {session:state.session}
}

export default connect(mapStateToProps,{setSession})(Login)