import React from 'react'
import {useHistory} from 'react-router-dom'
import './Card.css'
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import AirplanemodeInactiveIcon from '@mui/icons-material/AirplanemodeInactive';
import {puertas_array , horarios_array} from '../../StaticArrays.js'
import {connect} from 'react-redux'

const Card =({info,fecha,hora,indice,door,hist,handleClick,handleClick2})=>{

    const history=useHistory()

    if(info.disponible===2){
        return(
            <div 
                className='card' 
                style={{background:'rgba(249,49,84,255)',color:'whitesmoke'}} 
               
            >
                {puertas_array[indice]}
                <AirplanemodeInactiveIcon/>
            </div>
        )
    }
    else{
        return(
            <div 
                className='card' 
                style={info.disponible === 0 ? 
                    {background:'rgba(0,183,74,255)',cursor:'pointer',color:'whitesmoke'} :
                    {background:'rgba(255,169,0,255)',cursor:'pointer'}} 
                onClick={()=>{
                    if(
                        hist.inv.filter(item=>item.estatus===0).length>10
                        ){
                            handleClick("No se puede realizar más peticiones")
                    } else if(
                        hist.inv.filter(item=>item.puerta===puertas_array[indice] && item.hora===horarios_array[hora] && item.fecha===door[fecha].fecha && item.estatus===0).length>0
                    ){
                        handleClick("No se puede realizar petición a la misma puerta")
                    }
                    else{
                        
                        history.push('/reservation',
                        {fecha,hora,indice} )
                    }
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
        hist:state.hist
    }
}

export default connect(mapStateToProps)(Card)