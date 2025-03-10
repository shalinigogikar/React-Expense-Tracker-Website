import React from "react";
import {Link} from "react-router-dom";
import styles from "./Navbar.module.css";
const Navbar=()=>{
    return(
        <nav className={styles.navbar}>
            <h1>Expense Tracker Website</h1>
            <div className={styles.navLinks}>
                <Link to="/">Home</Link>
                <Link to="/Signin">Signin</Link>
                <Link to="/about">About</Link>
            </div>
        </nav>
    );
};
export default Navbar;