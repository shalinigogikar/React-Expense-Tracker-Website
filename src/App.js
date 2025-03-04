import React from "react";
import Navbar from "./components/Navbar";
import { Routes,Route } from "react-router-dom";
import SignUp from "./components/SignUp";
function App() {
  const Home = () => {
    return <h2>Welcome to Home Page</h2>;
  };
  const Signin = () => {
    return <h2>Welcome to signin Page</h2>;
  };
  const About= () => {
    return <h2>Welcome to About Page</h2>;
  };
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
      <SignUp/>
    </>
  );
}

export default App;
