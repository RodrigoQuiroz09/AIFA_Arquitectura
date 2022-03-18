import {Route} from "react-router-dom";
import React  from 'react'
import {connect} from 'react-redux'
import Login from "../Login/Login";
import Register from "../Login/TempRegister";
import Management from "../Management/Management";
import Auth from "../../Auth";

import HeaderAdmin from '../components/Header.js'
function Nav (props){

    if(props.session.tipo==="admin"){
        return(
            <div>
                <HeaderAdmin/>
                <Route path='/' component={Auth} />   
                <Route path='/management' component={Management} />
            </div>
        )
    } else{
        return(
            <div>
                <Route path="/login" >
                    <Login/>
                </Route>
                <Route path="/" >
                    <Auth />
                </Route>
                <Route path="/regis">
                    <Register />
                </Route>

            </div>
        )
    }


}

const mapStateToProps = state=>{
    return {session:state.session}
}
export default connect(mapStateToProps)(Nav)