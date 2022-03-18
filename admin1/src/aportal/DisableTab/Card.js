import React from 'react'

import './Card.css'
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import AirplanemodeInactiveIcon from '@mui/icons-material/AirplanemodeInactive';
import {puertas_array , } from '../../StaticArrays.js'
import {connect} from 'react-redux'
import Tooltip from '@mui/material/Tooltip';

const Card =({info,fecha,hora,indice,door,handleClick})=>{



    if(info.disponible===2){

        return(
            <Tooltip title={door[fecha].horario[hora][indice].aereo ? door[fecha].horario[hora][indice].aereo : "Bloqueado por admin"} placement="top">
            <div className='card'style={{background:'rgba(249,49,84,255)',color:'whitesmoke'}}  >
                {puertas_array[indice]}
                <AirplanemodeInactiveIcon/>
            </div>
            </Tooltip>

        )
    }
    else if(info.disponible===1){
        return(
            <div 
                className='card' 
                style={{background:'rgba(255,169,0,255)'}}
  
            >
                {puertas_array[indice]}
                    <AirplanemodeActiveIcon/>
            </div>
        )
    }else{
        return(
            <div 
                className='card' 
                style={{background:'rgba(0,183,74,255)',cursor:'pointer',color:'whitesmoke'} }
                onClick={()=>{
                    handleClick(indice)
                }
                }
            >
                {puertas_array[indice]}
                    <AirplanemodeActiveIcon/>
            </div>
        )
    }

}
const mapStateToProps = state=>{
    return {
        door:state.door,
    }
}

export default connect(mapStateToProps)(Card)