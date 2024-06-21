import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';

const OpenRoute = ({children,userInfo}) => {


    if (userInfo === null) {
        return children
    } else {
     return <Navigate to="/dashboard" replace={true} />
  
    }
}

export default OpenRoute