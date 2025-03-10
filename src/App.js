import React from "react";
import Navbar from "./components/Navbar";
import { Routes,Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
function App() {
  const Home = () => {
    return <h2>Welcome to Home Page</h2>;
  };
  const About= () => {
    return <h2>Welcome to About Page</h2>;
  };
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Login/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
    </>
  );
}

export default App;
