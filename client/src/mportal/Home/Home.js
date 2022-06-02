/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect} from 'react'
import {connect} from 'react-redux'
import {logOut,fetchPuertas,fetchInventory} from '../../actions'
import FilterHeader from './FilterHeader'
import './Home.css'
import Card from './Card'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useLocation } from 'react-router-dom';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const Home =(props)=>{

    const location = useLocation();
    var f
    var h
    const [open2, setOpen2] = React.useState(false);
    if(location.state){
         h=location.state.hora
         f=location.state.fecha
    }else{
         h=0
         f=0
    }
    const [open, setOpen] = React.useState(false);
    const [advertencia,setAdvertencia]= React.useState(false);
    const [fecha, setFecha] = React.useState(f);
    const [hora, setHora] = React.useState(h);

    const handleClick = (text) => {
        setAdvertencia(text)
        setOpen(true);
      };
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
        setOpen2(false)
      };
    const handleChangeFecha = (event) => {
      setFecha(event.target.value);
    };

    const handleChangeHora = (event) => {
      setHora(event.target.value);
    };
    //
    useEffect(()=>{
        props.fetchInventory(props.session.name);
        if(location.state){
            setOpen2(location.state.success)
            setTimeout(() => {props.fetchPuertas();props.fetchInventory(props.session.name);}, 1000);
        }else{
            setTimeout(() => {props.fetchPuertas();props.fetchInventory(props.session.name);}, 1000);
        }
        const interval = setInterval(() => {
            props.fetchPuertas();
        }, 10000)
        return () => clearInterval(interval)
    }, []);

    
    if( props.door.length > 0){
    return(
        <div className='main'>
            <main>
                <div className='container_door'>
                    <div>
                        <FilterHeader fecha={fecha} hora={hora} handleChangeFecha={handleChangeFecha} handleChangeHora={handleChangeHora}/>
                    </div>
                    <div className='spacer'/>
                    <div className='card_container'>
                        {
                            props.door[fecha].horario[hora].map((id,index)=>{
                                return(
                                    <div key={index}>
                                        <Card info={id} fecha={fecha} hora={hora} indice={index} handleClick={handleClick}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                        {advertencia}
                    </Alert>
                </Snackbar>
                <Snackbar open={open2} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Reservación aceptada. Favor de esperar aprobación del Administrador
                    </Alert>
                </Snackbar>
            </main>

        </div>
    )}
    else{
        return(
            <div>Saludos</div>
        )
    }
}

const mapStateToProps = state=>{
    return {
        door:state.door,
        session:state.session,
    }
}
export default connect(mapStateToProps,{logOut,fetchPuertas,fetchInventory})(Home)