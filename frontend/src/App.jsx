import React, { Suspense, lazy, useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OpenRoute from "./Routes/OpenRoute.jsx";
import PrivateRoute from "./Routes/PrivateRoute.jsx";
import Landing from "./pages/Landing/Landing.jsx";
import { UserContext } from "./context/UserContext.jsx";
// import Home from "./pages/Home/Home.jsx"
import SignUp from "./pages/SignUp/SignUp.jsx"
import Login from "./pages/Login/Login.jsx"



const Home = lazy(() => import("./pages/Home/Home.jsx"));
// const Login = lazy(() => import("./pages/Login/Login.jsx"));
// const SignUp = lazy(() => import("./pages/SignUp/SignUp.jsx"));
// const Landing = lazy(() => import("./pages/Landing/Landing.jsx"));

const App = () => {

  const {userInfo,setUserInfo} = useContext(UserContext);

  
  return (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>

          <Routes>
            <Route
              path="/"
              exact
              element={
                <OpenRoute userInfo={userInfo}>
                  <Landing />
                </OpenRoute>
              }
            />
            <Route
              path="/dashboard"
              exact
              element={
                <PrivateRoute userInfo={userInfo}>
                  <Home userInfo={userInfo} setUserInfo={setUserInfo} />
                </PrivateRoute>
              }
            />

            <Route
              path="/login"
              exact
              element={
                <OpenRoute userInfo={userInfo}>
                  <Login setUserInfo={setUserInfo} />
                </OpenRoute>
              }
            />

            <Route
              path="/signup"
              exact
              element={
                <OpenRoute userInfo={userInfo}>
                  <SignUp setUserInfo={setUserInfo} />
                </OpenRoute>
              }
            />
          </Routes>

        </Suspense>
      </Router>
  );
};

export default App;
