import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import {getFirestore, doc, getDoc } from "firebase/firestore";
//import { db } from "../firebase";
const Profile=()=>{
    const[profile,setProfile]=useState({});
    const[completion,setCompletion]=useState(0);
    const auth=getAuth();
   const db=getFirestore();
    useEffect(()=>{
        const fetchProfile=async()=>{
            const user=auth.currentUser;
            if(user){
                try{
                    const idToken = await user.getIdToken();
                    console.log("User ID Token:", idToken);
                const userDocRef=doc(db,"users",user.uid);
                const userDoc=await getDoc(userDocRef);
                if(userDoc.exists()){
                    const data=userDoc.data();
                    console.log("Fetched Data:", data);
                    setProfile(data);
                    const reqFields=["fullName","phoneNumber"];
                    const filledFields=reqFields.filter(field=>data[field]);
                    console.log("Filled Fields:", filledFields);
                    const percentage=Math.round((filledFields.length/reqFields.length)*100);
                    console.log("Profile Completion Percentage:", percentage); 
                    setCompletion(percentage);
                }
            }
            catch (error) {
                console.error("Error fetching profile:", error);
            }
        }
        };
        fetchProfile();
    },[auth,db]);
    return(
        <>
        <h2>welcome to Expense Tracker!!</h2>
        <div>
            <p>Your profile is {completion}% complete</p>
            {completion<100&&(
            <p>your profile is incomplete. <Link to="/updateprofile">Complete Profile</Link></p>
            )}
        </div>
        </>
    );
};
export default Profile;