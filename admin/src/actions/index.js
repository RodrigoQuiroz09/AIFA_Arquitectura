
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
       
        const response = await fetch('http://100.26.41.90:5000/api/door',{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
            })

        const data = await response.json()
        
        dispatch({ type:'FETCH_PUERTAS', payload:data})
}


export const fetchALLInventory = () => async dispatch =>{
    const response = await fetch('http://100.26.41.90:5000/api/getAll',{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }})
        const data = await response.json()
        dispatch({ type:'FETCH_HIST_ALL',payload:data.inv})
} 


export const denyPetitionUnique = (id,search) => async dispatch =>{
    await fetch('http://100.26.41.90:5000/api/denyUnique',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            id,
            search
            })
    })

    dispatch({ type:'DENY_UNIQUE',payload:{id}})
}
export const denyPetition = (id) => async dispatch =>{
    await fetch('http://100.26.41.90:5000/api/deny',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            id,
            })
    })
    dispatch({ type:'DENY_UNIQUE',payload:{id}})
}

export const acceptPetitionUnique = (id,search) => async dispatch =>{

    await fetch('http://100.26.41.90:5000/api/acceptUnique',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            id,
            search
            })
    })
    dispatch({ type:'ACCEPT_UNIQUE',payload:{id}})
}

export const acceptPetition = (id,search,auxId) => async dispatch =>{
    await fetch('http://100.26.41.90:5000/api/accept',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            id,
            search,
            auxId
            })
    })
    dispatch({ type:'ACCEPT_PETITION',payload:{id,auxId}})
}

export const blockGate = (search) => async dispatch =>{
    await fetch('http://100.26.41.90:5000/api/blocks',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
         
            search,
            
            })
    })
    dispatch({ type:'BLOCK_GATE',payload:{}})
}