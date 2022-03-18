import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Peticiones from '../PeticionesTab/Peticiones';
import Disable from '../DisableTab/Disable';
import {connect} from 'react-redux'
import {logOut,fetchPuertas} from '../../actions'
import './Management.css'

const Management =(props)=>{
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return(
        <div className='admin'>
            <main>
                <div className='tabs'>
                
                    <Tabs variant="scrollable" scrollButtons="auto"value={value} onChange={handleChange}>
                        <Tab value="1" label="Peticiones" />
                        <Tab value="2" label="Bloquear Terminales" />
                    </Tabs>
                
                </div>

            {
                value ==='1' ?
                <div>
                    <Peticiones/>
                </div> :
                <div>
                    <Disable/>
                </div>
            }
            </main>

        </div>
    )
}
const mapStateToProps = state=>{
    return {session:state.session}
}
export default connect(mapStateToProps,{logOut,fetchPuertas})(Management)