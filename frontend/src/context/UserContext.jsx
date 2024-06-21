import axiosInstance from "../utils/axiosInstance";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({children}) => {

    const [userInfo, setUserInfo] = useState(null);
    const [loading,setLoading] = useState(true);

    const getUserInfo = async () => {

        try {
          const response = await axiosInstance.get("/auth/get-user");
    
          if (response.data.user) {
            // setLoading(false);            
            setUserInfo(response.data.user);
          }
        } catch (error) {
          // setLoading(false);
          setUserInfo(null);
          if(!error.response.data.success){
            console.log(`error: ${error.response.data.message}`);
          }
        }
        setLoading(false);
      };


      useEffect(()=>{

          getUserInfo();

      },[])



    return (
        <UserContext.Provider value={{userInfo, setUserInfo,loading,setLoading}} >
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider