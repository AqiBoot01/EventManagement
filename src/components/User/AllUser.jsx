import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function AllUser() {
  const [allUsers, setAllUsers] = useState([]);
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    // Use the URL of your server endpoint
    fetch("http://localhost:3000/allUsers", {})
      .then((response) => response.json())
      .then((data) => {
        console.log("dat form the server ", data.users);
        setAllUsers(data.users);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [isActive]);



  const handleRadioChangeActive = (userId) => {
    const confirmation = window.confirm('Are you sure you want to Activate the user?');
    if(confirmation){
      fetch(`http://localhost:3000/updateUserStatus/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Active" }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            toast.success("User Activated");
          } else {
            toast.error("Server Error");
          }
          setIsActive(!isActive)
        })
        .catch((error) => {
          console.error("Error Rejecting event:", error);
        });
    }
    
  };

  const handleRadioChangeDisactive = (userId) => {
    const confirmation = window.confirm('Are you sure you want to Deactivate the user?');
    if(confirmation){
      console.log(userId);

      axios.put(`http://localhost:3000/updateUserStatus/${userId}`, {status: "Disactive"})
        .then(response=>{
          if (response.data.success) {
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
          setIsActive(!isActive)
        })
        .catch((error) => {
          console.error("Error Rejecting event:", error);
        });

    //   fetch(`http://localhost:3000/updateUser/${userId}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ status: "Disactive" }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data.success) {
    //       toast.success(data.message);
    //     } else {
    //       toast.error(data.message);
    //     }
    //     setIsActive(false)
    //   })
    //   .catch((error) => {
    //     console.error("Error Rejecting event:", error);
    //   });
    }

    
  };

  return (
    <div className="userevents" style={{width: "60vw"}}>
      <h2>Data Table</h2>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Is Active</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user, index) => (
            <tr key={index}>
              <td>
                {user.firstname} {user.lastname}
              </td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <input
                  type="checkbox"
                  readOnly
                  checked={user.isActive === "Active"} // Check the radio button if user.isActive is "Active"
                  disabled={user.isActive === "Active"} // Disable the radio button if user.isActive is "Active"
                  style={{height: '20px', width: '20px'}}
                />
                <button className='btn btn-success' 
                disabled={user.isActive === 'Active'}
                onClick={()=>{handleRadioChangeActive(user._id)}}
                >Activate</button>

                <input
                  type="checkbox"
                  readOnly
                  checked={user.isActive === "Disactive"} // Check the radio button if user.isActive is "Active"
                  disabled={user.isActive === "Disactive"} // Disable the radio button if user.isActive is "Active"
                  style={{height:'20px' , width: '20px'}}
                />
                <button className='btn btn-danger' 
                disabled = {user.isActive ==='Disactive'}
                onClick={()=>{handleRadioChangeDisactive(user._id)}}
                >Deactivate</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllUser;
