import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.jsx";
import PasswordInput from "../../components/Input/PasswordInput.jsx";
import { validateEmail } from "../../utils/helper.js";
import axioxInstance from "../../utils/axiosInstance.js";
import char1 from "/char2.png";

import { motion } from "framer-motion";

const SignUp = ({ setUserInfo, setLoading }) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter a valid password");
      return;
    }

    setError("");

    setLoading(true);

    try {
      const response = await axioxInstance.post("/auth/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      if (response && response.data.success) {
        // console.log(response.data);
        setUserInfo(response.data.user);
        navigate("/dashboard", { replace: true });
      } else if (response.data.success == false) {
        setError(response.data.message);
      }
    } catch (error) {
      console.log(`error occured in signup.jsx ${error}`);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("an unexpected error occurred");
      }
    }

    setLoading(false);
  };

  // const isMobile = window.matchMedia("(max-width: 639px)").matches

  return (
    <>
      <Navbar setLoading={setLoading} setUserInfo={setUserInfo} />

      <div className="flex items-center justify-center sm:justify-evenly mt-20 sm:mt-28">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: 0 }}
          className="md:w-96 w-[90vw] md:max-w-96 max-w-80  rounded bg-white px-7 py-10 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]"
        >
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">SignUp</h4>

            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={"Password"}
            />

            {error && <p className=" text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary">
              Create Account
            </button>
            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className=" text-black font-semibold underline">
                Login
              </Link>
            </p>
          </form>
        </motion.div>

        <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: 0 }}>
          <img className="opacity-75 hidden sm:block" src={char1} alt="" />
        </motion.div>
      </div>
    </>
  );
};

export default SignUp;
