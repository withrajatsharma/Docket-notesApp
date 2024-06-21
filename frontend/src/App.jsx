import React, { Suspense, lazy, useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OpenRoute from "./Routes/OpenRoute.jsx";
import PrivateRoute from "./Routes/PrivateRoute.jsx";
import Landing from "./pages/Landing/Landing.jsx";
import { UserContext } from "./context/UserContext.jsx";
// import Home from "./pages/Home/Home.jsx"
import SignUp from "./pages/SignUp/SignUp.jsx"
import Login from "./pages/Login/Login.jsx"
import Loading from "./components/Loading/Loading.jsx";


const Home = lazy(() => import("./pages/Home/Home.jsx"));
// const Login = lazy(() => import("./pages/Login/Login.jsx"));
// const SignUp = lazy(() => import("./pages/SignUp/SignUp.jsx"));
// const Landing = lazy(() => import("./pages/Landing/Landing.jsx"));

const App = () => {

  const {userInfo,setUserInfo,loading,setLoading} = useContext(UserContext);

  
  return (
      <Router>
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
                  <Home userInfo={userInfo} setUserInfo={setUserInfo} loading={loading} setLoading={setLoading} />
                </PrivateRoute>
              }
            />

            <Route
              path="/login"
              exact
              element={
                <OpenRoute userInfo={userInfo}>
                 { loading?<Loading/>:<Login setUserInfo={setUserInfo} setLoading={setLoading} />}
                </OpenRoute>
              }
            />

            <Route
              path="/signup"
              exact
              element={
                <OpenRoute userInfo={userInfo}>
                  { loading?<Loading/>:<SignUp setUserInfo={setUserInfo} setLoading={setLoading} />}
                </OpenRoute>
              }
            />
          </Routes>

      </Router>
  );
};

export default App;
