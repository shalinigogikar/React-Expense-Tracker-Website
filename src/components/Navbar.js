import React from "react";
import {Link} from "react-router-dom";
import classes from "./Navbar.module.css";
const Navbar=()=>{
    return(
        <nav className={classes.navbar}>
            <h1 className={classes["navbar-h1"]}>Expense Tracker Website</h1>
            <Link className={classes["navbar-link"]}to="/">Home</Link>
            <Link className={classes["navbar-link"]}to="/products">Products</Link>
            <Link className={classes["navbar-link"]}to="/about">About Us</Link>   
        </nav>
    );
};
export default Navbar;