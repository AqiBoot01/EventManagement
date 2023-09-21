// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AddNewEvent = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     eventHotel: "",
//     eventCity:""
//   });

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     fetch('http://localhost:3000/addEvent', {
//         method: 'POST',
//         headers: {
//           'Content-Type' : 'application/json',
//         },
//         body: JSON.stringify(formData),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//             if(data.success){
//                 toast.success('Event Added')
//             }
//             console.log(data.message)
//                   })
//         .catch((error) => {
//           console.error(error);
//         });
    
//     // making the fields empty
//     setFormData({
//         name: "",
//         eventHotel: "",
//         eventCity:""
//     });
//   };

//   return (
//     <div className="container mt-5 mb-5">
//       <h2>Add New Event</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="row m-4">
//           <div className="mb-3 col-3">
//             <label htmlFor="name" className="form-label">
//               Name:
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </div>

//         <div className="row m-4">
//           <div className="mb-3 col-3">
//             <label htmlFor="eventCity" className="form-label">
//               Event City:
//             </label>
//             <select
//               className="form-select"
//               id="eventCity"
//               name="eventCity"
//               value={formData.eventCity}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select</option>
//               <option value="Karachi">Karachi</option>
//               <option value="Lahore">Lahore</option>
//               <option value="Islamabad">Islamabad</option>
//               <option value="Rawalpindi">Rawalpindi</option>
//             </select>
//           </div>
//           <div className="mb-3 col-3">
//             <label htmlFor="eventHotel" className="form-label">
//               Event Hotel:
//             </label>
//             <select
//               className="form-select"
//               id="eventHotel"
//               name="eventHotel"
//               value={formData.eventHotel}
//               onChange={handleChange}
//               required
//             >
//               <option value="5 Star">Select</option>
//               <option value="Hotel 1">Hotel 1</option>
//               <option value="Hotel 2">Hotel 2</option>
//               <option value="Hotel 3">Hotel 3</option>
//               <option value="Hotel 4">Hotel 4</option>
//             </select>
//           </div>
//         </div>

//         <button type="submit" className="btn btn-primary mx-5">
//           Add Event 
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddNewEvent;


import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './addevent.css'

const AddNewEvent = () => {
  const [formData, setFormData] = useState({
    name: "",
    eventHotel: "",
    eventCity: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [allCities, setAllCities] = useState([]);
  const [allHotels , setAllHotels]  = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hotelsInCity , setHotelsInCity] = useState([]);

  



  useEffect(() => {
    // Use the URL of your server endpoint
    fetch("http://localhost:3000/allCities")
      .then((response) => response.json())
      .then((data) => {
        // console.log('dat form the server ' , data.cities)
        // console.log('dat form the server ' , data.hotels)
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
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name == "eventCity") {
      console.log(value);
        setHotelsInCity(allHotels.filter((hotels)=>{
         return hotels.hotelCityName == value;
       }))
      }


  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let Data = new FormData();

    Data.append('name', formData.name);
    Data.append('eventHotel', formData.eventHotel);
    Data.append('eventCity', formData.eventCity);
    Data.append('image', imageFile);

    formData.image = imageFile;
    console.log(formData)
    console.log('Our image ' ,imageFile)
    console.log(Data.get('name'))
    fetch("http://localhost:3000/addEvent", {
      method: "POST",
      headers:{
        // 'Content-Type' : 'multipart/form-data'
      },
      body: Data
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success("Event Added");
        }
        console.log(data.message);
      })
      .catch((error) => {
        console.error(error);
      });

    // Reset form fields
    setFormData({
      name: "",
      eventHotel: "",
      eventCity: "",
    });
    setImageFile(null);
  };

  return (
    <div className="addevent container mt-5">

      <h2>Add New Event</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* ... Other form fields */}

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
            <label htmlFor="eventCity" className="form-label">
              Event City:
            </label>
            <select
              className="form-select"
              id="eventCity"
              name="eventCity"
              value={formData.eventCity}
              onChange={handleChange}
              required
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
            <label htmlFor="eventHotel" className="form-label">
              Event Hotel:
            </label>
            <select
              className="form-select"
              id="eventHotel"
              name="eventHotel"
              value={formData.eventHotel}
              onChange={handleChange}
              required
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
          <label htmlFor="eventImage" className="form-label">
            Event Image:
          </label>
          <input
            type="file"
            className="form-control"
            id="eventImage"
            name="eventImage"
            onChange={handleImageChange}
          />
        </div>

         </div>
         
        <button type="submit" className="btn btn-primary mx-5">
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddNewEvent;

