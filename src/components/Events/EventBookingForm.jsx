import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './eventForm.css'

const EventBookingForm = ({user}) => {
  const [allCities, setAllCities] = useState([]);
  const [allHotels , setAllHotels]  = useState([]);
  const [hotelsInCity , setHotelsInCity] = useState([]);
  // let hotelsInCity = [];
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: user.firstname,
    phone: "",
    address: "",
    eventName: "",
    eventType: "", // Default event type
    eventCity: "", // Default city
    hotelName: "", // Default hotel
    eventDate: "",
    numberOfPeople: "",
  });

  useEffect(() => {
    // Use the URL of your server endpoint
    fetch("http://localhost:3000/allCities")
      .then((response) => response.json())
      .then((data) => {
        // console.log('dat form the server ' , data.cities)
        console.log('dat form the server ' , data.hotels)
        setAllCities(data.cities);
        setAllHotels(data.hotels);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name == "eventCity") {
      console.log(value);
        setHotelsInCity(allHotels.filter((hotels)=>{
         return hotels.hotelCityName == value;
       }))
      }

     if(name == 'hotelName') {
      console.log(value)
      numberOfPeople.value ='';
      numberOfPeople.removeAttribute("max");
      console.log(hotelsInCity)
      let hotel = hotelsInCity.find((hotel)=>{ return hotel.name === value})
      console.log(hotel.hotelCapacity)
      formData.numberOfPeople = hotel.hotelCapacity
      numberOfPeople.max = hotel.hotelCapacity
      


      //  formData.numberOfPeople += 
     }


    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:3000/registerEvent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        // console.log(data.massage);
        toast.success("Event Registered");
      })
      .catch((error) => {
        console.log(error);
      });
    // Handle form submission here (e.g., send data to a server)
    // console.log(formData);

    // making the fields empty
    setFormData({
      name: "",
      phone: "",
      address: "",
      eventName: "",
      eventType: "",
      eventCity: "",
      hotelName: "",
      eventDate: "",
      numberOfPeople: "",
    });
  };

  if (!isLoaded) {
    return <div>Loading.......</div>;
  }
  return (
    <div className="container mt-5 eventForm">
      <h2>Event Booking Form</h2>
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
              readOnly
            />
          </div>
          <div className="mb-3 col-3">
            <label htmlFor="phone" className="form-label">
              Phone Number:
            </label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3 col-3">
            <label htmlFor="address" className="form-label">
              Address:
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row m-4">
          <div className="mb-3 col-3">
            <label htmlFor="eventName" className="form-label">
              Event Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="eventName"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3 col-3">
            <label htmlFor="eventType" className="form-label">
              Event Type:
            </label>
            <select
              className="form-select"
              id="eventType"
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Wedding">Wedding</option>
              <option value="Birthday">Birthday</option>
              <option value="Corporate">Corporate</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-3 col-3">
            <label htmlFor="eventCity" className="form-label">
              Event City:
            </label>
            <select
              className="form-select"
              id="eventCity"
              name="eventCity"
              value={formData.eventCity}
              onChange={handleChange}
            >
              <option value="">Select</option>
              {allCities.map((city, index) => (
                <option key={index} value={city.cityname}>
                  {city.cityname}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3 col-3">
            <label htmlFor="hotelName" className="form-label">
              Hotel Name:
            </label>
            <select
              className="form-select"
              id="hotelName"
              name="hotelName"
              value={formData.hotelName}
              onChange={handleChange}
            >
              <option value="">Select</option>
              {hotelsInCity.map((hotel, index) => (
                <option key={index} value={hotel.name}>
                  {hotel.name}
                </option>
              ))}
            </select>
          </div>
          </div>

          <div className="row m-4"> 
          <div className="mb-3 col-3">
            <label htmlFor="eventDate" className="form-label">
              Event Date:
            </label>
            <input
              type="date"
              className="form-control"
              id="eventDate"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3 col-3">
            <label htmlFor="numberOfPeople" className="form-label">
              Number of People:
            </label>
            <input
              type="number"
              className="form-control"
              id="numberOfPeople"
              name="numberOfPeople"
              value={formData.numberOfPeople}
              onChange={handleChange}
              max='100'
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-success mx-5">
          Submit
        </button>
      </form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default EventBookingForm;
