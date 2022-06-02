import React,{useState} from 'react'

const Register =()=>{
    const [name,setName]=useState('')
    const [pass,setPass]=useState('')
    const [email,setEmail]=useState('')
    const [tipo,setTipo]=useState('')

    async function registerUser(event){
        event.preventDefault()
        const response=await fetch('http://localhost:5000/api/register',{
            method:'POST',
        headers:{
            'Content-Type':'application/json'
        },    
        body:JSON.stringify({
                name,
                email,
                pass,
                tipo
            })
        })

        const data = await response.json()
        console.log(data)
    }

    return(
        <div>
            <h1>Register</h1>
            <form onSubmit={registerUser}>
                <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder='Name'/>
                <br/>
                <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder='email'/>
                <br/>
                <input value={pass} onChange={(e)=>{setPass(e.target.value)}} type="password" placeholder='Password'/>
                <br/>
                <input value={tipo} onChange={(e)=>{setTipo(e.target.value)}} type="text" placeholder='tipo'/>
                <br/>
                <input type ="submit" value="Register"/>
            </form>
        </div>
    )
}

export default Register