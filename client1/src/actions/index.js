
export const setSession = (token)=>{
    return{
        type:'SIGN_IN',
        payload:token
    }
}

export const logOut = (tipo)=>{
    
    return{
        type:'SIGN_OUT',
        payload:tipo
    }
}

export const fetchPuertas= () => async dispatch =>{
       
        const response = await fetch('http://localhost:1337/api/door',{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
            })

        const data = await response.json()
        
        dispatch({ type:'FETCH_PUERTAS', payload:data})
}

export const reservarPuerta = (fecha,horario) => async dispatch =>{

    await fetch('http://localhost:1337/api/reserve',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },    
        body:JSON.stringify({
            fecha,
            horario
            })
        })
        dispatch({ type:'RESERVAR_PUERTAS', payload:horario})
}

export const addInventory = (fecha,horario,aereolinea,puerta,email) => async dispatch =>{

    await fetch('http://localhost:1337/api/saveres',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },    
        body:JSON.stringify({
            fecha,
            horario,
            aereolinea,
            puerta,email
            })
        })
        dispatch({ type:'ADD_HIST',payload:{}})
} 

export const fetchInventory = (aereolinea) => async dispatch =>{
    console.log("aa");
    const response = await fetch('http://localhost:1337/api/getinv',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },    
        body:JSON.stringify({
            aereolinea
            })
        })
        const data = await response.json()
        dispatch({ type:'FETCH_HIST',payload:data})
} 

export const fetchALLInventory = () => async dispatch =>{
    const response = await fetch('http://localhost:1337/api/getAll',{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }})
        const data = await response.json()
        dispatch({ type:'FETCH_HIST_ALL',payload:data.inv})
} 
