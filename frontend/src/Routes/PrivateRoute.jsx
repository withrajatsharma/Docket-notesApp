import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext';

const PrivateRoute = ({children,userInfo}) => {


  if(userInfo!==null){
    return children
  } else {
   return <Navigate to="/login" replace={true} />
}
}

export default PrivateRoute