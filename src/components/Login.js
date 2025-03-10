import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {signInWithEmailAndPassword} from "firebase/auth"; 
import styles from "./Login.module.css";
 const Login=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState(null);
    const navigate=useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        try {
          await signInWithEmailAndPassword(auth, email, password);
          alert("successfully Login In!");
          navigate("/");
        } catch (err) {
          setError(err.message);
        }
      };
    return(
        <form className={styles.loginForm}onSubmit={handleLogin}>
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
          {error && <p className={styles.errorMessage}>{error}</p>}
          <button type="submit">Login</button>
        </form>
    );
 };
 export default Login;