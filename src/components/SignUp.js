import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {createUserWithEmailAndPassword} from "firebase/auth";
 const SignUp=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const [error,setError]=useState(null);
    const navigate=useNavigate();
    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null);
        try {
          await createUserWithEmailAndPassword(auth, email, password,confirmPassword);
          navigate("/");
        } catch (err) {
          setError(err.message);
        }
      };
    return(
        <form onSubmit={handleSignup}>
          <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>
           <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>
           <input
          type="confirmPassword"
          placeholder="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}/>
          <button>SignUp</button>
        </form>
    );
 }
 export default SignUp;