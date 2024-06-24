import React, { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import axiosInstance from "../../utils/axiosInstance";
import { FaHeart } from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";
import logo from "../../assets/reshot-icon-sticky-notes-MZFEWVHU7A.svg";

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
        navigate("/", { replace: true });
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
    <div className="bg-white flex items-center justify-between  px-5 sm:px-8  w-full py-2 ">
      <Link to={"/"}>
        <div className="-ml-2 sm:ml-0 flex items-center">
          <img className="h-16" src={logo} alt="" />
          <p className=" -ml-1 sm:ml-0 sm:text-xl text-lg font-bold ">DOCKET</p>
        </div>
      </Link>

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

          <button
            className="flex  gap-2 items-center"
            onClick={() => {
              openLiked ? getLikedNotes() : getAllNotes();
            }}
          >
            {openLiked ? (
              <>
                liked notes
                <FaHeart className={`text-xl text-red-500`} />
              </>
            ) : (
              <>
                all notes
                <FaNoteSticky className={`text-xl text-primary`} />
              </>
            )}
          </button>

          <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
        </>
      ) : (
        <button
          onClick={handleTryDemo}
          className="btn-primary px-5 rounded-lg w-fit"
        >
          Try Demo
        </button>
      )}
    </div>
  );
};

export default Navbar;
