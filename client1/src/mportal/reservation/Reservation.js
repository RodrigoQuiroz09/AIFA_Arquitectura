/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import HeaderReserve from './HeaderReserve';
import './Reservation.css'
import ImageData from './ImageData';
import {connect} from 'react-redux'
import {puertas_array} from '../../StaticArrays.js'


const Reservation =({door,session})=>{
    const location = useLocation();

    const inTer="Puerta conectada a la Terminal. Se accede dentro de la terminal a través de la puerta designada"

    //const description=[""]

    useEffect(()=>{

    },[])
    
    const hora_menu=["00:00","00:30","01:00","01:30","02:00"]
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
                            {inTer}
                        </div>
                    </div>

                </div>
     
            </main>
            
        </div>
    )
}

const mapStateToProps = state=>{
    return {
        door:state.door,
        session:state.session
    }
}
export default connect(mapStateToProps)(Reservation)
