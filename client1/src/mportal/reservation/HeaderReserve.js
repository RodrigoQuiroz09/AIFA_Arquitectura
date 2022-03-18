import React from 'react'
import './HeaderReserve.css'
import {  Button } from '@mui/material';
import {connect} from 'react-redux'
import { reservarPuerta,addInventory } from '../../actions';
import {useHistory} from 'react-router-dom'
import {puertas_array,horarios_array} from '../../StaticArrays.js'

const HeaderReserve =({reservarPuerta,addInventory,fecha,indice,hora,door,session})=>{
    const history=useHistory()
    return(
        <>
            <div className='text'>
            Confirmación de Reservación
            </div>
            <div className='button-reserve'>
                <Button 
               
                    variant="contained" 
                    onClick={()=>{
                        reservarPuerta(door[fecha].fecha,{hora,indice,fecha})
                        addInventory(door[fecha].fecha,horarios_array[hora],session.name,puertas_array[indice],session.email)
                        history.push('/home',{hora,fecha,success:true})
                    }}
                >
                    Apartar
                </Button>
            </div>
        </>
    )
}
const mapStateToProps = state=>{
    return {
        door:state.door,
        session:state.session
    }
}
export default connect(mapStateToProps,{reservarPuerta,addInventory})(HeaderReserve)
