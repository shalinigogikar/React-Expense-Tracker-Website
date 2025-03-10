import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {createUserWithEmailAndPassword} from "firebase/auth"; 
import styles from "./SignUp.module.css";
 const SignUp=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const [error,setError]=useState(null);
    const navigate=useNavigate();
    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null);
        if (password !== confirmPassword) {
          setError("Passwords do not match!");
          return;
        }
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          navigate("/");
        } catch (err) {
          setError(err.message);
        }
      };
    return(
        <form className={styles.signupForm}onSubmit={handleSignup}>
          <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} required/>
           <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} required/>
           <input
          type="password"
          placeholder="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)} required/>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <button>SignUp</button>
        </form>
    );
 }
 export default SignUp;