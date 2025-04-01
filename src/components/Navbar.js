import React from "react";
import {Link,useNavigate} from "react-router-dom";
import { getAuth,signOut } from "firebase/auth";
import classes from "./Navbar.module.css";
const Navbar=()=>{
    const auth=getAuth();
    const navigate=useNavigate();
    const handleLogout=async()=>{
        try{
            await signOut(auth);
            localStorage.removeItem('idToken');
            navigate("/login");
        }
        catch(error){
            console.log(error);
            alert("logout failed");
        }
    };
    return(
        <nav className={classes.navbar}>
            <h1 className={classes["navbar-h1"]}>Expense Tracker Website</h1>
            <Link className={classes["navbar-link"]}to="/">Home</Link>
            <Link className={classes["navbar-link"]}to="/products">Products</Link>
            <Link className={classes["navbar-link"]}to="/about">About Us</Link>
            <button className={classes["navbar-button"]} onClick={handleLogout}>Log out</button>   
        </nav>
    );
};
export default Navbar;