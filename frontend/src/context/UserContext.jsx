import axiosInstance from "../utils/axiosInstance";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({children}) => {

    const [userInfo, setUserInfo] = useState(null);

    const getUserInfo = async () => {
        try {
          const response = await axiosInstance.get("/auth/get-user");
    
          if (response.data.user) {
            
            setUserInfo(response.data.user);
            
          }
        } catch (error) {
          setUserInfo(null);
          if(!error.response.data.success){
            console.log(`error: ${error.response.data.message}`);
          }
        }
      };


      useEffect(()=>{
        getUserInfo();
      },[])



    return (
        <UserContext.Provider value={{userInfo, setUserInfo}} >
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider