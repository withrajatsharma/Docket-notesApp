import React, { useContext, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import char1 from "/char1.png";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Login = ({ setUserInfo, setLoading }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

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

    setLoading(true);

    try {
      const response = await axiosInstance.post("/auth/login", {
        email: email,
        password: password,
      });

      // console.log(response)

      if (response.data && response.data.success) {
        // console.log(response.data);
        setUserInfo(response.data.user);
        navigate("/dashboard", { replace: true });
      }
      else if(response.data && !response.data.success) {
        toast.error(
          "incorrect password",
          {duration:3000,position:"top-right"}
        )
        // console.log("incorrect password");
        // setError("password is incorrect");
      }

    } catch (error) {
      console.log(`error occured in login.jsx ${error}`);
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

  return (
    <>
      <Navbar setLoading={setLoading} setUserInfo={setUserInfo} />
      <div className="flex items-center justify-center sm:justify-evenly flex-row-reverse mt-20 sm:mt-28 ">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: 0 }}
          className="md:w-96 w-[90vw] md:max-w-96 max-w-80  rounded bg-white px-7 py-10 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]"
        >
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Login</h4>
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
              Login
            </button>
            <p className="text-sm text-center mt-4">
              Not registered yet?{" "}
              <Link to="/signup" className="font-semibold text-black underline">
                Create an Account
              </Link>
            </p>
          </form>
        </motion.div>

        <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: 0 }}>
          <img className="opacity-75 hidden sm:block" src={char1} alt="" />
        </motion.div>
      </div>
    </>
  );
};

export default Login;
