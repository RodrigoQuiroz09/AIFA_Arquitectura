import React,{useState} from 'react'
import {connect} from 'react-redux'
import {
    blockGate,
    fetchPuertas
  } from '../../actions'
import './Disable.css'
import Button from '@mui/material/Button';
import Card from './Card'
import FilterHeader from './FilterHeader'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const Disable =({door,blockGate,fetchPuertas})=>{

    const [fecha, setFecha] = useState(0);
    const [hora, setHora] = useState(0);
    const [posPuerta, setPosFecha] = useState('');

    const [open, setOpen] = useState(false);



    const handleClickOpen = (posDoor) => {
        setPosFecha(posDoor)

        setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleCloseBlock = () => {
        const temp={horario:hora,fecha:door[fecha].fecha,door:posPuerta}
        blockGate(temp)
        setOpen(false);
        setTimeout(() => {fetchPuertas();}, 1000);
      };

    const handleChangeFecha = (event) => {
        setFecha(event.target.value);
      };
  
      const handleChangeHora = (event) => {
        setHora(event.target.value);
      };

    return(
        <div className='container-door' >
                <div>
                    <FilterHeader fecha={fecha} hora={hora} handleChangeFecha={handleChangeFecha} handleChangeHora={handleChangeHora}/>
                </div>
                <div className='spacer'/>
                    <div className='card-container'>
                        {
                            door[fecha].horario[hora].map((id,index)=>{
                                return(
                                    <div key={index}>
                                        <Card info={id} fecha={fecha} hora={hora} indice={index} handleClick={handleClickOpen}/>
                                    </div>
                                )
                            })
                        }
                </div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"¿Está seguro de bloquear la terminal?"}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Esta terminal se inhabilitará para todas las aereolineas
                        registradas en es sistema, favor de confirmar con el boton 
                        a continuación
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleCloseBlock} autoFocus>
                        Bloquear
                    </Button>
                    </DialogActions>
                </Dialog>
        </div>
    )
}

const mapStateToProps = state=>{
    return {door:state.door}
}
export default connect(mapStateToProps,{blockGate,fetchPuertas})(Disable)
