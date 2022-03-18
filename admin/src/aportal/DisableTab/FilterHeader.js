import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {connect} from 'react-redux'
import {horarios_array} from '../../StaticArrays.js'
import './Filter.css'

const FilterHeader =({handleChangeHora,handleChangeFecha,fecha,hora,door})=>{


  return (
      <div className='filter-container'>

        <div className='title'>
            Mapa de Disponibilidad
        </div>

        <div className='filters'>
          <div className='box'>
              <FormControl >
                <InputLabel >Fecha</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={fecha}
                  label="Fecha"
                  onChange={handleChangeFecha}
                  MenuProps={{
                    style:{
                      maxHeight:200
                    }
                  }}
                >
                  {door.map((id,index)=>{
                    return(
                        <MenuItem key={id.fecha} value={index}>{id.fecha}</MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </div>

            <div className='box'>
              <FormControl >
                <InputLabel>Horario</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={hora}
                  label="Horario"
                  onChange={handleChangeHora}
                  MenuProps={{
                    style:{
                      maxHeight:200
                    }
                  }}
                >
                  {horarios_array.map((id,index)=>{
                    return(
                        <MenuItem key={index} value={index}>{id}</MenuItem>
                    )
                  })}

                </Select>
              </FormControl>
            </div>
        </div>
      </div>
    );

}

const mapStateToProps = state=>{
  return {
      door:state.door,
  }
}
export default connect(mapStateToProps)(FilterHeader)
