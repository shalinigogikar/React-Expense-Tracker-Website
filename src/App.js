import React,{createContext,useState,useEffect} from "react";
import Navbar from "./components/Navbar";
import { Routes,Route,useNavigate } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import UpdateProfile from "./components/UpdateProfile";
import { auth } from "./firebase";
export const ProfileContext = createContext();
const App=()=> {
  const [profileCompleted, setProfileCompleted] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/signup"); 
      }
    });
    const contactNumber = localStorage.getItem("contactNumber");
    setProfileCompleted(!!contactNumber);
  }, [navigate]);
  const About= () => {
    return <h2>Welcome to About Page</h2>;
  };
  return (
    <ProfileContext.Provider value={{ profileCompleted, setProfileCompleted }}>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Login/>}/>
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/about" element={<About/>}/>
      </Routes>
    </ProfileContext.Provider>
  );
};

export default App;
