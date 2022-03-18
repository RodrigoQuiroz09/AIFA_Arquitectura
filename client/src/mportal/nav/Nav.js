import {Route} from "react-router-dom";
import React  from 'react'
import {connect} from 'react-redux'
import Login from "../Login/Login";
import Register from "../Login/TempRegister";
import Home from "../Home/Home";
import Inventory from "../inventory/Inventory";
import Reservation from "../reservation/Reservation";
import Auth from "../../Auth";
import Header from '../components/Header';

function Nav (props){


        if(props.session.tipo==="airline"){
            return(
                <div>
                    <Header/>
                    <Route path='/' component={Auth} />   
                    <Route path='/home' component={Home} /> 
                    <Route path='/reservation' component={Reservation} />   
                    <Route path='/inventory' component={Inventory} /> 
                    
                </div>
            )
        }
        else{
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