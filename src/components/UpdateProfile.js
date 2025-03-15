import React, { useState, useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth,db} from "../firebase";
import { ProfileContext } from "../App";
import {ref,set,get} from "firebase/database";
const UpdateProfile = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  //const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setProfileCompleted } = useContext(ProfileContext);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          return;
        }
        const idToken = await user.getIdToken(); 
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAS7yovVAkvhFAs9czYfJc4ZqzDYKeLTVE`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken }),
          }
        );
        const data = await response.json();
        if (data.users && data.users.length > 0) {
          const userData = data.users[0];
          setFullName(userData.displayName || "");
        }
        const phoneRef = ref(db, `users/${user.uid}/phone`);
        const phoneSnapshot = await get(phoneRef);
        if (phoneSnapshot.exists()) {
          setPhone(phoneSnapshot.val());
        }
      } catch (err) {
        setError(`Failed to fetch profile details.",${err.message}`);
      } 
    };

    fetchProfile();
  }, [auth]);
  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const user = auth.currentUser;
      if (!user){
        setError("User not found!");
        return;
      }
      const idToken = await user.getIdToken(); 
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAS7yovVAkvhFAs9czYfJc4ZqzDYKeLTVE`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idToken,
            displayName: fullName,
            returnSecureToken: true,
          }),
        }
      );
      const result = await response.json();
      if (result.error) {
        setError(result.error.message);
        return;
      }
      await set(ref(db, `users/${user.uid}/phone`), phone);
      let fieldsCompleted = 0;
      if (fullName) fieldsCompleted += 50;
      if (phone) fieldsCompleted += 50;
      setProfileCompleted(fieldsCompleted===100); 
      alert("Profile updated successfully!");
      navigate("/"); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Complete Your Profile</h2>
      <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
      <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      {error && <p>{error}</p>}
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default UpdateProfile;
