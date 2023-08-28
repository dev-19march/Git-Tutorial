import React from "react";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
    const user= localStorage.getItem('user');
    if(!user){
        return <>
         <Navigate to="/login" replace/>
        </>
    }else{
        return children;
    }
}

export default Protected;