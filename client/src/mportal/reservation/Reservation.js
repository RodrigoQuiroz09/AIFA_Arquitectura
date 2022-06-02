/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useLocation } from 'react-router-dom';
import HeaderReserve from './HeaderReserve';
import './Reservation.css'
import ImageData from './ImageData';
import {connect} from 'react-redux'
import {puertas_array} from '../../StaticArrays.js'
import {useHistory} from 'react-router-dom'

const Reservation =({door,session})=>{
    const history=useHistory()
    const location = useLocation();

    const inTer="La posición se encuentra con acceso directo al edificio terminal, mediante el uso de una pasarela de acceso (comúnmente conocido como gusano). Permite el embarque y desembarque de miembros de la tripulación, al igual que de pasajeros entrantes y salientes de manera directa a la terminal. En caso de que su aeronave lo requiera, se pone a su disposición una segunda pasarela de acceso -una para la puerta trasera y una para la delantera- de la aeronave."
    const outTer="La posición se encuentra en una posición separada del edificio terminal del aeropuerto. El embarque y desembarque tanto de los miembros de la tripulación, como de pasajeros, se realizará mediante el uso de vehículos de transporte proporcionados por el aeropuerto. Tomar en consideración que la reservación de este tipo de posiciones puede significar un mayor tiempo para los movimientos de pasajeros, tripulación y equipaje en general."

    const hora_menu=["00:00","00:30","01:00","01:30","02:00"]

    if(door.length === 0)
    {
        console.log("DEBUG");
        history.replace('/home')
        return(<></>)
    }
    else
    {
    return(
        <div className='main'>
            <main>
                <div className='header-reserve'>
                    <HeaderReserve hora={location.state.hora} fecha={location.state.fecha} indice={location.state.indice} />
                </div>
                <div className='container-reserve'>
                    <div className='header-reserve-card'>
                        Información de Reservación
                    </div>
                    <div className='text'>
                        <div>
                            <div className='subtitle'>
                                Puerta:
                            </div>
                            <div className='info'>
                                {puertas_array[location.state.indice]}
                            </div>
                        </div>

                        <div>
                            <div className='subtitle'>
                                Fecha:
                            </div>
                            <div className='info'>                  
                                {door[location.state.fecha].fecha}
                            </div>
                        </div>
                        
                        <div>
                            <div className='subtitle'>
                                Horario:
                            </div>
                            <div className='hora'>                  
                                {hora_menu[location.state.hora]}
                            </div>
                        </div>
                        
                        <div>
                            <div className='subtitle'>
                                Aereoliena:
                            </div>
                            <div className='info'>
                                {session.name}
                            </div>
                        </div>
                        
                    </div>
            
                </div>

                <div className='container-map'>
                    <div className='croquis'>
                        <div className='header-croquis'>
                            Ubicación dentro del Aereopuerto
                        </div>
                        {location.state.indice < 14 ? 
                        <img src={ImageData[location.state.indice]}
                        alt='Croquis' 
                        height={350} 
                        width={1000}/> :
                        <img src={ImageData[14]}
                        alt='Croquis' 
                        height={350} 
                        width={1000}/>
                        }
                                
                    </div>
                    <div className='info'>
                        <div className='header-info'>
                            Información de la Puerta
                        </div>
                        <div className='subtitle'>
                            Accesibilidad
                        </div>
                        <div className='desc' >
                            {location.state.indice < 14 ? inTer : outTer}
                        </div>
                    </div>

                </div>
     
            </main>
            
        </div>
    )
}
}

const mapStateToProps = state=>{
    return {
        door:state.door,
        session:state.session
    }
}
export default connect(mapStateToProps)(Reservation)
