import React,{useState} from "react";
import { useNavigate,Link } from "react-router-dom";
import { auth } from "../firebase";
import {createUserWithEmailAndPassword} from "firebase/auth"; 
import classes from "./SignUp.module.css";
 const SignUp=()=>{
  const [form,setForm]=useState({
    email:"",
    password:"",
    confirmPassword:"",
});
    const [error,setError]=useState(null);
    const navigate=useNavigate();
    const handleChange=(e)=>{
      setForm({
        ...form,
        [e.target.name]:e.target.value,
      });;
  }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (form.password !== form.confirmPassword) {
          setError("Passwords do not match!");
          return;
        }
        try {
          await createUserWithEmailAndPassword(auth, form.email, form.password);
          alert("successfully  signUp now please Login In!");
          navigate("/login");
        } catch (err) {
          setError(err.message);
        }
      };
    return(
      <>
        <form className={classes["form-container"]}onSubmit={handleSubmit}>
        <h2 className={classes["form-header"]}>Sign Up</h2>
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
          className={classes["form-input"]}
          placeholder="password"
          value={form.password}
          onChange={handleChange} required/></label>
          <label htmlFor="password">Confirm Password:
           <input
          type="password"
          name="confirmPassword"
          placeholder="confirmPassword"
          className={classes["form-input"]}
          value={form.confirmPassword}
          onChange={handleChange} required/></label>
          <button type="submit" className={classes["form_button"]}>Sign Up</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <p>Already have an account?
            <Link to="/login">please Login </Link></p>
        </form>
        </>
    );
 };
 export default SignUp;