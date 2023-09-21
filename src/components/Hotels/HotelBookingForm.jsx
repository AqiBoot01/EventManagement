import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HotelBookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    hotelCapacity: "",
    hotelRating: "",
    hotelCity: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:3000/registerHotel', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
            if(data.success){
                toast.success('Hotel Registered')
            }
            console.log(data.message)
                  })
        .catch((error) => {
          console.error(error);
        });

    // making the fields empty
    setFormData({
      name: "",
      location: "",
      hotelCapacity: "",
      hotelRating: "",
      hotelCity: "",
    });
  };

  return (
    <div className="addevent container mt-5 mb-5">
      <h2>Hotel Register Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="row m-4">
          <div className="mb-3 col-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3 col-3">
            <label htmlFor="location" className="form-label">
              Location:
            </label>
            <input
              type="location"
              className="form-control"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row m-4">
          <div className="mb-3 col-3">
            <label htmlFor="hotelCity" className="form-label">
              Hotel City:
            </label>
            <select
              className="form-select"
              id="hotelCity"
              name="hotelCity"
              value={formData.hotelCity}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Karachi">Karachi</option>
              <option value="Lahore">Lahore</option>
              <option value="Islamabad">Islamabad</option>
              <option value="Rawalpindi">Rawalpindi</option>
            </select>
          </div>
          <div className="mb-3 col-3">
            <label htmlFor="hotelRating" className="form-label">
              Hotel Rating:
            </label>
            <select
              className="form-select"
              id="hotelRating"
              name="hotelRating"
              value={formData.hotelRating}
              onChange={handleChange}
              required
            >
              <option value="5 Star">Select</option>
              <option value="5 STAR">5 STAR</option>
              <option value="4 STAR">4 STAR</option>
              <option value="3 STAR">3 STAR</option>
              <option value="2 STAR">2 STAR</option>
            </select>
          </div>
          <div className="mb-3 col-3">
            <label htmlFor="hotelCapacity" className="form-label">
              Hotel Capacity:
            </label>
            <input
              type="number"
              className="form-control"
              id="hotelCapacity"
              name="hotelCapacity"
              value={formData.hotelCapacity}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary mx-5">
          Submit
        </button>
      </form>
    </div>
  );
};

export default HotelBookingForm;
