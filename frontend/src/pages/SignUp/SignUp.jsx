import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.jsx";
import PasswordInput from "../../components/Input/PasswordInput.jsx";
import { validateEmail } from "../../utils/helper.js";
import axioxInstance from "../../utils/axiosInstance.js";

const SignUp = ({setUserInfo}) => {
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

    try {
      const response = await axioxInstance.post("/auth/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      if (response&&response.data.success) {
        // console.log(response.data);
        setUserInfo(response.data.user);
        navigate("/dashboard",{replace:true});
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
  };

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
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
              <Link to="/login" className="font-medium text-primary underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
