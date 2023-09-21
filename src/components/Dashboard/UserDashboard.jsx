import React, { useEffect, useState } from "react";
import EventBookingForm from "../Events/EventBookingForm";
import "./Userdashboard.css";
import UserEvents from "../Events/UserEvents";
import { Card, Image, Button } from "react-bootstrap"; // Import Button from react-bootstrap
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import UpdateForm from "./updateUserForm/updateForm";

function UserDashboard() {
  const [showForm, setShowForm] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [imageFile , setImageFile] = useState(true)

  let [userData, setUserData] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState({
    success: false,
    role: null,
  });

  const [loading, setLoading] = useState(true); // Initialize as true
  const [userInfo, setUserInfo] = useState("User");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodetoken = decodeToken(token);
    token && setIsAuthenticated({ success: true, role: decodetoken.role });

    if (token) {
      fetch(`http://localhost:3000/user/${decodetoken.userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((data) => {
          
          setUserData(data);
          setImageFile(data.userImage)
          setLoading(false); // Set loading to false when data is received

          // console.log(user)
        })
        .catch((error) => {
          console.error(error);
          setLoading(false); // Set loading to false when data is received
        });
    }
  }, []);

  const navigate = useNavigate();

  // Placeholder user data (you can replace this with actual user data)
  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");
    navigate("/login");

    // Redirect the user to the login page or perform other logout-related actions here
    // You can use React Router to navigate to the login page if needed
  };

  if (loading && isAuthenticated.success && isAuthenticated.role == "user") {
    return (
        <h2>Loading...</h2>
    )
  }

  return (
    <div className="userDashboard">
      {isAuthenticated.success && isAuthenticated.role == "user" ? (
        <div className="main-div">
          {/* ------------------------------------------------- */}
          <div className="container-nav">
            
            <div className="bookEvent">
              <i
              onClick={() => {
                setUserInfo("User");
                setShowForm(false)
                setShowEvents(false)
              }} 
              className="bi bi-person-circle cursor-pointer">
                {userData.firstname}
              </i>
            </div>

            <div className="bookEvent" style={{ backgroundColor: showForm ? 'lightgreen' : '' }}>
              <i
                onClick={() => {
                  setShowForm(true);
                  setUserInfo("Book");
                  setShowEvents(false)
                  
                }}
                className="bi bi-file-earmark-plus"
              >
                Book An Event
              </i>
            </div>

            <div className="myEvent" style={{ backgroundColor: showEvents ? 'lightgreen' : '' }} >
              <i
                onClick={() => {
                  setShowEvents(true);
                  setUserInfo("Events");
                  setShowForm(false);

                  
                }}
                className="bi bi-calendar-event"
              >
                Show My Events
              </i>
            </div>
            <div >

            <i // Add the Bootstrap-styled logout button
              className="bi bi-box-arrow-left"
              onClick={handleLogout}
            >
              Logout
            </i>
            </div>
          </div>

          {/* --------------------------------------------------- */}

          {userInfo === "User" ? (
            <div className="user-info container mt-4">
              <Card>
                <Card.Header>
                  <h2>{userData.firstname} {userData.lastname}</h2>
                </Card.Header>
                <Card.Body>
                  <div className="text-center user-text">
                    {imageFile ? (
                      <Image
                      src={`http://localhost:3000/uploads/userImages/${userData.userImage}`}
                      alt="User Avatar"
                      roundedCircle
                      style={{ width: "200px", height: "200px" }}
                    />

                    ):(
                      <i className="bi bi-person-circle" style={{ width: "200px", height: "200px", fontSize:'10rem' }}>

                      </i>
                    )}
                    
                  
                    <h3>
                      {userData.firstname} {userData.lastname}{" "}
                    </h3>
                    <p>{userData.email}</p>
                    {/* Display other user information here */}
                  </div>
                
                  
                  <button
                onClick={() => {
                  setShowUpdate(true)
                }}
                className="btn btn-primary"
              >
               Update Profile
              </button>
                </Card.Body>
              </Card>
                {showUpdate && <UpdateForm  user={userData}/>}
              


            </div>
            
          ) : userInfo === "Events" ? (
            <div className="container">
              {showEvents && <UserEvents user={userData} />}
            </div>
          ) : userInfo === "Book" ? (
            <div className="container">
              {showForm && <EventBookingForm user={userData} />}
            </div>
          ) : (
            <div>
              {/* Default content when userInfo doesn't match any of the above cases */}
            </div>
          )}
        </div>
      ) : (
        <div>
          <h1>Unauthorized User</h1>
        </div>
      )}
      
    </div>
  );
}

export default UserDashboard;
