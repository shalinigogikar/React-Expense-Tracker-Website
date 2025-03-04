import React from "react";
import {Link} from "react-router-dom";
const Navbar=()=>{
    return(
        <nav>
            <h1>Expense Tracker Website</h1>
            <div>
                <Link to="/">Home</Link>
                <Link to="/Signin">Signin</Link>
                <Link to="/about">About</Link>
            </div>
        </nav>
    );
};
export default Navbar;