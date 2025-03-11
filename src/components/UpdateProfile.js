import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ProfileContext } from "../App";

const UpdateProfile = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setProfileCompleted } = useContext(ProfileContext);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not found!");

      await updateDoc(doc(db, "users", user.uid), {
        fullName,
        phone,
        profileCompleted: true, // Mark as completed
      });

      setProfileCompleted(true); // Update global state
      alert("Profile updated successfully!");
      navigate("/"); // Redirect to Home
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
