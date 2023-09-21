import React, { useState } from "react";
import AllEvents from "../Events/AllEvents";
import HotelBookingForm from "../Hotels/HotelBookingForm";
import { decodeToken } from "react-jwt";
// import { Button } from "react-bootstrap"; // Import Button from react-bootstrap
import { useNavigate } from "react-router-dom";
import AddNewEvent from "../Events/AddNewEvent";
import { Card, Image, Button } from "react-bootstrap"; // Import Button from react-bootstrap
import AllUser from "../User/AllUser";
import "./Userdashboard.css";


function AdminDashboard() {
  const [showEvent, setShowEvent] = useState(false);
  const [showRegisterHotle, setShowRegisterHotel] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showAllUser, setShowAllUser] = useState(false);
  const [userInfo, setUserInfo] = useState("Admin");

  const isAuthenticated = localStorage.getItem("token");
  const decodedToke = decodeToken(isAuthenticated);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="userDashboard">
      {isAuthenticated && decodedToke.role == "admin" ? (
        <div className="main-div">
          <div className="container-nav">
            <div>
            <i
              onClick={() => {
                setShowEvent(true);
                setUserInfo('Events')
              }}
              className="bi bi-calendar-event"
            >
              Show All Event
            </i>
            </div>

            <div>

            <i
              onClick={() => {
                setShowRegisterHotel(true);
                setUserInfo('Hotel')
              }}
              className="bi bi-plus-circle"         
              >
              Register New Hotel
            </i>
            </div>
            <div>

            <i
              onClick={() => {
                setShowAddEvent(true);
                setUserInfo('Addevent')
              }}
              className="bi bi-plus-circle"
             >
              Add New Event
            </i>
            </div>

            <div>

            <i
              onClick={() => {
                setShowAllUser(true);
                setUserInfo('User')
              }}
              className="bi bi-people"          
                >
              All Users
            </i>
            </div>
            <div>

            <i
              className="bi bi-box-arrow-left" 
              onClick={handleLogout}
            >
              logout
            </i>
            </div>
          </div>

          {/* ------------------------------------------------------------------------- */}

          {userInfo === "Admin" ? (
            <div className="user-info container mt-4">
              <Card>
                <Card.Header>
                  <h2>
                    Admin Dashboard
                  </h2>
                </Card.Header>
                <Card.Body>
                  <div className="text-center user-text">
                    <Image
                      src={`http://localhost:3000/uploads/aqib.png`}
                      alt="User Avatar"
                      roundedCircle
                      style={{ width: "200px", height: "200px" }}
                    />
                    <h3>
                      Admin
                    </h3>
                    <p>Admin@gmail.com</p>
                    {/* Display other user information here */}
                  </div>
                  <button
                    onClick={() => {
                    }}
                    className="btn btn-primary"
                  >
                    Update Profile
                  </button>
                </Card.Body>
              </Card>

              
            </div>
          ) : userInfo === "Events" ? (
            <div className="">{showEvent && <AllEvents />}</div>
          ) : userInfo === "Hotel" ? (
            <div className="">
              {showRegisterHotle && <HotelBookingForm />}
            </div>
          ) : userInfo === "Addevent" ? (
            <div className="">{showAddEvent && <AddNewEvent />}</div>
          ) : userInfo === "User" ? (
            <div className="">{showAllUser && <AllUser />}</div>
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

export default AdminDashboard;
