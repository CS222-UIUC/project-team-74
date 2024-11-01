import React from 'react';
import LoginComp from "../components/Hero_Login";
import Navbar from "../components/Navbar"


function Login()
{

    return(
        <>
        <Navbar></Navbar>
        <LoginComp></LoginComp>
        </>
    );

}

export default Login