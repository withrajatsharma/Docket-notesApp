import React, { useState } from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';
import axiosInstance from "../../utils/axiosInstance"

const Navbar = ({userInfo,setAllNotes,setUserInfo,onSearchNote, handleClearSearch}) => {

  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const onLogout = async () => {

    try {

      const response  = await axiosInstance.get("/auth/logout");

      
      if(response&&response.data.success) {

        setUserInfo(null);
        setAllNotes("");
        navigate("/login",{replace:true});
      }
      
    } catch (error) {
      console.log(`error: ${error}`);
    }
    
  }

  const handleSearch = () => {

    if(searchQuery) {
      onSearchNote(searchQuery);
    }

  }

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  }

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
<h2 className="text-xl font-medium text-black py-2">Notes</h2>


{
  userInfo&&(<><SearchBar
  value={searchQuery}
  onChange={({target})=>{
    setSearchQuery(target.value)}}
    handleSearch={handleSearch}
    onClearSearch={onClearSearch}
  />
  <ProfileInfo userInfo={userInfo} onLogout={onLogout} /></>)
}




</div>
  )
}

export default Navbar


