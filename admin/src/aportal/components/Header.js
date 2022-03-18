import React,{useState} from "react";
import './Header.css'
import logo from '../../images/admin_logo.png'
import Logout from '@mui/icons-material/Logout';

import {connect} from 'react-redux'
import {logOut} from '../../actions'
const HeaderAdmin =({logOut})=>{
    return(
        <div className="header-admin">
            <header>
            <div className="imagen">
                <img 
                    src={logo} 
                    alt="logo" 

                    
                />
            </div>
            <div className="logout">
                <Logout sx={{ fontSize: 30 }} onClick={logOut}/>
            </div>
            
         
      
            </header>
            
        </div>
    )
}
export default connect(null,{logOut})(HeaderAdmin)
