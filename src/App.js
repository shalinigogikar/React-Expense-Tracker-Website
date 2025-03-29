import React from "react";
import Navbar from "./components/Navbar";
import { Routes,Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Profile from "./components/Profile";
import UpdateProfile from "./components/UpdateProfile";
const App=()=> {
  return (
<>
      <Navbar/>
      <Routes>
        <Route path="/" element={<SignUp/>}/>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/updateprofile" element={<UpdateProfile/>}/>
      </Routes>
    </>
  );
};
export default App;
