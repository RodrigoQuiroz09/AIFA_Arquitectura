/* eslint-disable import/no-anonymous-default-export */
export default (state=[],action)=>{
    if(action.type==='FETCH_PUERTAS'){
        return action.payload
    }
    else if(action.type==='RESERVAR_PUERTAS'){
        state[action.payload.fecha].horario[action.payload.hora][action.payload.indice].disponible = 1
        return [...state]
    }
    return state
}