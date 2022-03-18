/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import { DataGrid } from '@mui/x-data-grid';
import './Inventory.css'
import {fetchInventory} from '../../actions'
const Inventory =({hist,session})=>{
    useEffect(()=>{
        fetchInventory(session.name)
    },[])

    const columns = [
        { field: 'id', headerName: 'ID', minWidth: 90, flex:0.3 },
        {
          field: 'fecha',
          headerName: 'Fecha',
          minWidth: 150,
          flex:0.7, 
          editable: false,
        },
        {
          field: 'hora',
          headerName: 'Hora',
          minWidth: 150,
          flex:0.5, 
          editable: false,
        },
        {
          field: 'puerta',
          headerName: 'Puerta',
          minWidth: 110,
          flex:0.7, 
          editable: false,
        }, {
            field: 'createdAt',
            headerName: 'Fecha y Hora de Transacción',
            minWidth: 110,
            flex:1, 
            editable: false,
          }, {
            field: 'estatus', //0 Es en proceso de aceptación - 1 es Aceptado - 2 es denegado
            headerName: 'Estatus',
            minWidth: 110,
            flex:0.3, 
            editable: false,
          },
      ];
      

      const rows = hist.inv.map((item)=>{return item.estatus === 0 ? {...item, estatus:'En Evaluación'} : item.estatus === 1 ? {...item, estatus:'Aceptado'} : {...item, estatus:'Denegado'} })
   
    return(
      <div className='main'>

      
        <main>
            <div className='title-inventory'>
                Histórico de Reservaciones
            </div>
            <div className='container-inventory'>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={12}
                rowsPerPageOptions={[12]}
                disableSelectionOnClick
            />
            </div>
        </main>
        </div>
    )
}


const mapStateToProps = state=>{
    return {
        hist:state.hist,
        session:state.session
    }
}
export default connect(mapStateToProps,{fetchInventory})(Inventory)
