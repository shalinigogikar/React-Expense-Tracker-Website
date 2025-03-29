import React,{useState,useEffect} from "react";
import { getAuth } from "firebase/auth";
import {  doc,getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
const UpdateProfile=()=>{
    const[details,setDetails]=useState({fullName: "", phoneNumber: ""});
    const auth = getAuth();
   // const db = getFirestore();
   useEffect(() => {
    const fetchProfile = async () => {
        const user = auth.currentUser;
        if (user) {
            try {
                // Fetch user's profile from Firestore
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const data = userDoc.data();
                    console.log("Pre-filled Data:", data);
                    setDetails(data);
                } else {
                    console.log("No profile data found!");
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        }
    };

    fetchProfile();
}, [auth]);
    const handleChange=(e)=>{
        setDetails({
            ...details,
            [e.target.name]:e.target.value  
        });
    };
    const handleSubmit=async(e)=>{
      e.preventDefault();
      try{
        const user = auth.currentUser; 
            if (!user) {
                alert("No user is logged in!");
                return;
            }
            const userDocRef = doc(db, "users", user.uid); 
            await setDoc(userDocRef, { fullName: details.fullName,phoneNumber: details.phoneNumber }, { merge: true });
            console.log("profile is updated");
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Error updating profile. Check console for more details.");
        }
        };
    return(
        <>
        <h2>Winners never quit,Quitters never win</h2>
        <div>
            <p>your profile is complete.</p>
        </div>
        <form onSubmit={handleSubmit}>
            <h1> Contact Details</h1>
            <label>Full Name:
            <input type="text"
            name="fullName"
            value={details.fullName} 
             onChange={handleChange}/></label>
            <label>Phone Number:
            <input type="tel"
            name="phoneNumber"
             value={details.phoneNumber}
              onChange={handleChange}/></label>
            <button type="submit">Update Profile</button>
        </form>
        </>
    );
};
export default UpdateProfile;