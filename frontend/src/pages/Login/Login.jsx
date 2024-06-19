import React, { useContext, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import {Link, useNavigate} from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper'
import axiosInstance from "../../utils/axiosInstance"

const Login = ({setUserInfo}) => {

  const navigate = useNavigate();


    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
          setError("Please enter a valid email");
          return;
        }

        if (!password) {
          setError("Please enter a valid password");
          return;
        }

        setError("");


        try {


          const response = await axiosInstance.post("/auth/login",{
            email:email,
            password:password
          });


          // console.log(response)

          if(response.data && response.data.success) {
            // console.log(response.data);
            setUserInfo(response.data.user);
            navigate("/dashboard",{replace:true});
          }

          
        } catch (error) {
          console.log(`error occured in login.jsx ${error}`);
          if (error.response && error.response.data && error.response.data.message) {
            
            setError(error.response.data.message);
          }else{
            setError("an unexpected error occurred");
          }
          
        }

    };

  return (
<>
<Navbar/>

<div className="flex items-center justify-center mt-28">
<div className="w-96 border rounded bg-white px-7 py-10">
<form onSubmit={handleLogin}>
<h4 className="text-2xl mb-7">Login</h4>
<input type="text" placeholder="Email" className="input-box" 

value={email}
onChange={(e)=>setEmail(e.target.value)}

/>

    <PasswordInput
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      placeholder={"Password"}
    />

    {
      error && <p className=' text-red-500 text-xs pb-1'>{error}</p>
    }

<button type="submit" className="btn-primary">
Login
</button>
<p className="text-sm text-center mt-4">
Not registered yet?{" "}
<Link to="/signup" className="font-medium text-primary underline">
Create an Account
</Link>
</p>
</form>
</div>
</div>


</>
  )
}

export default Login