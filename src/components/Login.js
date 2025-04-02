import React,{useState} from "react";
import { useNavigate,Link } from "react-router-dom";
import {auth} from "../firebase";
import {signInWithEmailAndPassword} from "firebase/auth"; 
import classes from "./Login.module.css";
 const Login=()=>{
  const [form,setForm]=useState({
    email:"",
    password:"",
});
const [error,setError]=useState(null);
    const navigate=useNavigate();
    const handleChange=(e)=>{
      setForm({
        ...form,
        [e.target.name]:e.target.value,
      });
  }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (!form.password|| !form.email) {
          setError("Invalid Credientials");
          return;
      }
        try {
          await signInWithEmailAndPassword(auth, form.email, form.password);
          alert("successfully Login In!");
          navigate("/profile");
        } catch (err) {
          setError(err.message);
        }
      };
    return(
      <>
        <form className={classes["form-container"]}onSubmit={handleSubmit}>
          <h1 className={classes["form-header"]}>Login</h1>
          <label htmlFor="email">Email:
          <input
          type="email"
           name="email"
          placeholder="Email"
          value={form.email}
          className={classes["form-input"]}
          onChange={handleChange} required/></label>
          <label htmlFor="password">Password:
           <input
          type="password"
          name="password"
          placeholder="password"
          className={classes["form-input"]}
          value={form.password}
          onChange={handleChange} required/></label>
          <button type="submit" className={classes["form_button"]}>Login</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <p>Forgot password? <Link to="/forgot-password">Reset Password</Link></p>
            <p> don't have account?
            <Link to="/signup">please SignUp</Link></p>
        </form>
        </>
    );
 };
 export default Login;