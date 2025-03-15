import React,{useContext,useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";
import {ProfileContext} from "../App";
import {auth} from "../firebase";
const Home=()=>{
    const navigate=useNavigate();
    const {profileCompleted,setProfileCompleted}=useContext(ProfileContext);
    const [completedFields, setCompletedFields] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setLoading(false);
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
          let fieldsCompleted = 0;
          
          if (userData.displayName) fieldsCompleted += 50;
          if (userData.phoneNumber) fieldsCompleted += 50;

          setCompletedFields(fieldsCompleted);
          setProfileCompleted(fieldsCompleted === 100);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [setProfileCompleted]);

    return(
        <div>
            <h2>Welcome to Home Page</h2>
            {loading ? (
        <p>Loading profile status...</p>
      ) : completedFields < 100 ? (
            <div style={{
                position: "absolute",
                top: "100px",
                right: "20px",
                background: "#fff3cd",
                padding: "12px 16px",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontWeight: "bold",
      }}>
        <p>Profile Completion: {completedFields}%</p>
                <button onClick={()=>navigate("/update-profile")}
                style={{
                        backgroundColor: "#ffc107",
                        color: "black",
                        border: "none",
                        padding: "5px 10px",
                        cursor: "pointer",
                        borderRadius: "5px",
                        fontWeight: "bold",
                      }}>
                    Complete Profile
                </button>
        </div>
        ) : (
          <p style={{ position: "fixed", top: "100px", right: "20px" }}>
            ✅ Profile Completed 100%
          </p>
        )}
            </div>
    );
};
export default Home;