import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth,sendEmailVerification,onAuthStateChanged } from "firebase/auth";
import {doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import ExpenseForm from "./ExpenseForm";
const Profile=()=>{
    const[profile,setProfile]=useState({});
    const[completion,setCompletion]=useState(0);
    const[emailVerified,setEmailVerified]=useState(false);
    const[verificationMessage,setVerificationMessage]=useState("");
    const auth=getAuth();
   // const user=auth.currentUser;
   //const db=getFirestore();
    useEffect(()=>{
        const fetchProfile=async(user)=>{
           // const user=auth.currentUser;
            if(user){
                try{
                    setEmailVerified(user.emailVerified);
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
        const unsubscribe=onAuthStateChanged(auth,(user)=>{
            if(user){
                fetchProfile(user);   
            }
        });
        return()=>unsubscribe();
    },[auth]);
    const handleSendVerification = async (user) => {
        if (user) {
            try {
                await sendEmailVerification(user);
                setVerificationMessage("Verification email sent! Please check your inbox.");
            } catch (error) {
                setVerificationMessage(`Error: ${error.message}`);
            }
        }
    };
    return(
        <>
        <h2>welcome to Expense Tracker!!</h2>
        <div>
            <p>Your profile is {completion}% complete</p>
            {completion<100&&(
            <p>your profile is incomplete. <Link to="/updateprofile">Complete Profile</Link></p>
            )}
        </div>
        {!emailVerified && (
                <div>
                    <p>Your email is not verified!</p>
                    <button onClick={handleSendVerification}>Verify Email</button>
                    {verificationMessage && <p>{verificationMessage}</p>}
                </div>
            )}
            <ExpenseForm/>
        </>
    );
};
export default Profile;