import React, { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import axiosInstance from "../../utils/axiosInstance";
import { FaHeart } from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";



const Navbar = ({
  userInfo,
  setAllNotes,
  setUserInfo,
  onSearchNote,
  handleClearSearch,
  setLoading,
  getLikedNotes,
  getAllNotes,
  openLiked,
}) => {


  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const onLogout = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/auth/logout");

      if (response && response.data.success) {
        setUserInfo(null);
        setAllNotes("");
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.log(`error: ${error}`);
    }
    setLoading(false);
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  const handleTryDemo = async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.get("/auth/demo");

      if (response.data && response.data.success) {
        setUserInfo(response.data.user);
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.log(`error occured in login.jsx ${error}`);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log(error.response.data.message);
      } else {
        console.log("an unexpected error occurred");
      }
    }

    setLoading(false);
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-semibold text-black py-2">Docket</h2>

      {userInfo ? (
        <>
          <SearchBar
            value={searchQuery}
            onChange={({ target }) => {
              setSearchQuery(target.value);
            }}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />

              <button className="flex  gap-2 items-center"
                onClick={()=>{
                  openLiked?getLikedNotes():getAllNotes();
                }}
              >
                {
                  openLiked?<>
liked notes
<FaHeart className={`text-xl text-red-500`}/>

                  </>
                
                  : <>
                 all notes
<FaNoteSticky className={`text-xl text-primary`}/>

                  </>
                }
              </button>

          <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
        </>
      ) : (
        <button onClick={handleTryDemo} className="btn-primary w-fit px-5">
          Try Demo
        </button>
      )}
    </div>
  );
};

export default Navbar;
