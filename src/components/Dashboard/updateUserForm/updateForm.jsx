import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./update.css";
import axios from "axios";
import { Card, Image, Button } from "react-bootstrap"; // Import Button from react-bootstrap


const UpdateForm = ({ user }) => {
  // State for form fields
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updateUser, setUpdateUser] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    password: "",
  });

  const [imageFile, setImageFile] = useState(user.userImage);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  useEffect(() => {}, [updateUser]);

  // State for uploaded image
  const randomAvatarUrl = `https://randomuser.me/api/portraits/men/${Math.floor(
    Math.random() * 100
  )}.jpg`;

  // Handle change for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateUser({ ...updateUser, [name]: value });
  };

  // Handle form submission
  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    if (updateUser.password === confirmPassword) {
      let Data = new FormData();

      Data.append("firstname", updateUser.firstname);
      Data.append("lastname", updateUser.lastname);
      Data.append("password", updateUser.password);
      Data.append("image", imageFile);

      updateUser.image = imageFile;
      console.log(updateUser);
      console.log(Data);

      axios
        .put(`http://localhost:3000/updateUser/${user._id}`, Data)
        .then((response) => {
          if (response.data.success) {
            toast.success(response.data.message);
            setUpdateUser({
              firstname: "",
              lastname: "",
              password: "",
            });
            setConfirmPassword("");
            setImageFile();
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error Rejecting event:", error);
        });

      // fetch(`http://localhost:3000/updateUser/${user._id}`, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(updateUser),
      // })
      //   .then((response) => response.json())
      //   .then((data) => {
      //     if (data.success) {
      //       toast.success(data.message);
      //       setUpdateUser({
      //         firstname: "",
      //         lastname: "",
      //         password: "",
      //       });
      //       setConfirmPassword("");
      //     } else {
      //       toast.error(data.message);
      //     }
      //   })
      //   .catch((error) => {
      //     console.error("Error Rejecting event:", error);
      //   });
    } else {
      window.alert("Password Mismatch");
    }

    // Add your logic for handling form submission here
  };

  return (
    <div className="update">
      <div className="img-update">
        {imageFile ? (
          <Image
            src={`http://localhost:3000/uploads/userImages/${user.userImage}`}
            alt="User Avatar"
            roundedCircle
            style={{ width: "200px", height: "200px", display:'block' }}
          />
        ) : (
          <i
            className="bi bi-person-circle"
            style={{ width: "200px", height: "200px", fontSize: "10rem", display: 'block' }}
          ></i>
        )}

        <label
          htmlFor="image-upload-input"
          className="image-upload-label rounded-circle"
        >
          Image upload
        </label>
        <input
          type="file"
          id="image-upload-input"
          accept="image/*"
          className=""
          name="eventImage"
          onChange={handleImageChange}
        />
      </div>
      <div className="info-update">
        <form onSubmit={handleUpdateSubmit} encType="multipart/form-data">
          <div className="form">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstname"
              value={updateUser.firstname}
              onChange={handleChange}
              className="form-control"
              required
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastname"
              value={updateUser.lastname}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="password"
              value={updateUser.password}
              onChange={handleChange}
              className="form-control"
              required
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control"
              required
            />
          </div>
          </div>
          <button type="submit" className="btn btn-primary update-btn">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;
