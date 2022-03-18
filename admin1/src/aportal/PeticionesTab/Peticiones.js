/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect} from 'react'
import './Peticiones.css'
import {connect} from 'react-redux'
import {
  fetchALLInventory,
  denyPetitionUnique, 
  denyPetition,
  acceptPetitionUnique,
  acceptPetition,
  fetchPuertas
} from '../../actions'
import { DataGrid } from '@mui/x-data-grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { styled } from '@mui/material/styles';
import { GridActionsCellItem, } from '@mui/x-data-grid-pro';

import {horarios_array,puertas_array} from '../../StaticArrays.js'
import emailjs from '@emailjs/browser';

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    fontWeight:'bold',
    border: 0,
    
    color:
      theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',
    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
      
    },
    '& .MuiDataGrid-iconSeparator': {
      display: 'none',
    },
    '& .MuiDataGrid-columnHeader':{
        fontSize:'1.1rem'
    },

    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
      borderRight: `1px solid ${
        theme.palette.mode === 'light' ? '#303030' : '#f0f0f0'
      }`,

    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
      borderBottom: `1px solid ${
        theme.palette.mode === 'light' ? '#303030' : '#f0f0f0'
      }`,
    },
    '& .MuiDataGrid-cell': {
      color:
        theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
    },
    '& .MuiPaginationItem-root': {
      borderRadius: 0,
    },
    fontSize:'1.05rem'
}));

const Peticiones =({table,session,fetchALLInventory,denyPetitionUnique,denyPetition,acceptPetitionUnique,acceptPetition,fetchPuertas})=>{
  
  const handleDeleteClick=(id)=>{
    var rows=table.filter((item)=>{if (item.estatus === 0) return {...item}})
    let aux = rows.filter((item)=>{
    return  item.id===id ? item : null
    })
    const search={...aux[0]}

    if(rows.filter((item)=>{ 
        if(item.id !== id) if(item.fecha===search.fecha && item.hora===search.hora && item.puerta===search.puerta) return item
        return false
      }).length>0
    ){
      denyPetition(id)
     
    }else{
      const temp={horario:horarios_array.indexOf(search.hora),fecha:search.fecha,door:puertas_array.indexOf(search.puerta)}
      denyPetitionUnique(id,temp)

    }

    setTimeout(() => {fetchALLInventory(); fetchPuertas();}, 1000);
    
  }

  const handleAcceptClick=(id)=>{
    var rows=table.filter((item)=>{if (item.estatus === 0) return {...item}})
    let aux = rows.filter((item)=>{
      return  item.id===id ? item : null
      })
      const search={...aux[0]}
      const temp={
        horario:horarios_array.indexOf(search.hora),
        fecha:search.fecha,
        door:puertas_array.indexOf(search.puerta),
        aereo:search.aereolinea}
      const auxId =rows.filter((item)=>{ 
        if(item.id !== id) if(item.fecha===search.fecha && item.hora===search.hora && item.puerta===search.puerta) return item
        return false
      }).map(item=>{return item.id})
    if(auxId.length>0){
      acceptPetition(id,temp,auxId)
    }else{
      acceptPetitionUnique(id,temp)
    }
    setTimeout(() => {fetchALLInventory(); fetchPuertas();}, 1000);
    console.log(search.email);
    const correo={
      name:search.aereolinea,
      email:search.email,
      fecha:search.fecha,
      hora:search.hora,
      puerta:search.puerta

    }
    //emailjs.send('service_aifa', 'template_5856e2m', correo, 'eZMxwT9HTMtKN-pXJ').then(response=>{})
  }

  const columns = [
      { field: 'id', headerName: 'ID', minWidth: 90, flex:0.1 },
      {
        field: 'fecha',
        headerName: 'Fecha Solicitada',
        minWidth: 150,
        flex:0.5, 
        editable: false,
      },
      {
        field: 'hora',
        headerName: 'Hora Solicitada',
        minWidth: 150,
        flex:0.4, 
        editable: false,
      },
      {
        field: 'puerta',
        headerName: 'Puerta',
        minWidth: 110,
        flex:0.5, 
        editable: false,
      }, 
      {
          field: 'createdAt',
          headerName: 'Fecha y Hora de Solicitud',
          minWidth: 110,
          flex:0.7, 
          editable: false,
      }, 
      {
          field: 'aereolinea', //0 Es en proceso de aceptación - 1 es Aceptado - 2 es denegado
          headerName: 'Aereolinea',
          minWidth: 110,
          flex:0.5, 
          editable: false,
      },
      {
          field: 'actions',
          type: 'actions',
          headerName: 'Acciones',
          flex:0.3, 
          minWidth: 110,
          cellClassName: 'actions',
          getActions: ({ id }) => {

              return [
                <GridActionsCellItem
                  icon={<CancelIcon />}
                  label="Edit"
                  className="textPrimary"
                  onClick={()=>{
                    handleDeleteClick(id)
                  }}
                  color="inherit"
                />,
                <GridActionsCellItem
                  icon={<CheckCircleIcon />}
                  label="Delete"
                  onClick={()=>{
                    handleAcceptClick(id)
                  }}
                  color="inherit"
                />,
              ];
            },
      }, 
  ];

    useEffect(()=>{

      fetchALLInventory();
      fetchPuertas();
      const interval = setInterval(() => {
        fetchALLInventory();
        fetchPuertas();
      
      }, 10000)
      return () => clearInterval(interval)
 
    },[])


    return(
        <div className='table-admin-container '>
            <div className='table'>
                <StyledDataGrid
                    rows={table.filter((item)=>{if (item.estatus === 0) return {...item}})}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    disableSelectionOnClick
                />
            </div>
 
        </div>
    )
    

}

const mapStateToProps = state=>{
    return {table:state.table,session:state.session}
}
export default connect(mapStateToProps,
  {fetchALLInventory,
    denyPetitionUnique,
    denyPetition,
    acceptPetitionUnique,
    acceptPetition,
    fetchPuertas
  })(Peticiones)