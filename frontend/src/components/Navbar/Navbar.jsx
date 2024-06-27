import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import axiosInstance from "../../utils/axiosInstance";
import logo from "../../assets/reshot-icon-sticky-notes-MZFEWVHU7A.svg";

const Navbar = ({
  userInfo,
  setUserInfo,
  onSearchNote,
  handleClearSearch,
  setLoading,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

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

  return userInfo ? (
    <div className=" items-center flex  justify-center w-screen pt-5 ">
      <SearchBar
        value={searchQuery}
        onChange={({ target }) => {
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />
      
    </div>
  ) : (
    <div className="bg-white flex items-center justify-between  px-5 sm:px-8  w-full py-2 ">
      <Link to={"/"}>
        <div className="-ml-2 sm:ml-0 flex items-center">
          <img className="h-16" src={logo} alt="" />
          <p className=" -ml-1 sm:ml-0 sm:text-xl text-lg font-bold ">DOCKET</p>
        </div>
      </Link>
      <button
        onClick={handleTryDemo}
        className="btn-primary px-5 rounded-lg w-fit"
      >
        Try Demo
      </button>
    </div>
  );
};

export default Navbar;
