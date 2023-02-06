import React, {useEffect, useState} from 'react';
import  "../styles/Navbar.css"
import {Link, Outlet} from "react-router-dom";
import {useAppSelector} from "../hooks/TypedSelectors";
import {useActions} from "../hooks/UseActions";
import { IoLogOut, IoInformationCircle, IoCart } from 'react-icons/io5';





const Navbar = () => {

    const {logout, check_login} = useActions();
    const  user_status = useAppSelector(state => state.user);
    const [checked,setChecked] = useState(false);

    useEffect(()=>{
        if (!checked){
        check_login();
        setChecked(true);
        }
    })

    return (
        <div className="Navbar">
                <div className="Navbar__logo__ellipse"></div>
            <Link to="shop"><h3 className="Navbar__logo_title">First web app</h3></Link>
            <div className="List">
                <Link to="shop">Shop</Link>
                {user_status.isAuthorized ?  <Link to="/admin-panel">Admin Panel</Link> : <></>}
                <Link to="about"><IoInformationCircle className="icon"></IoInformationCircle></Link>
                <Link to="cart"><IoCart className="icon"></IoCart></Link>
                {user_status.isAuthorized ?<IoLogOut className="icon_exit" onClick={()=>{logout()}}></IoLogOut> : <div className="primary_button"> <Link  to="registration">LogIn</Link> </div>}
                {/*<div className="List__primary"></div>*/}
            </div>
            <div id="detail">
                <Outlet />
            </div>
        </div>
    );
};

export default Navbar;
