import { useNavigate } from "react-router-dom";
import EventCartItem from "./EventCartItem";
import { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import "./homepage.css";

function Homepage() {
  const isLoaded = useRef()
  // const [isLoaded, setIsLoaded] = useState(false);
  const [eventData, setEventData] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [allHotels, setAllHotels] = useState([]);
  const [hotelsInCity, setHotelsInCity] = useState([]);
  // const [filterData , setFilterData] = useState({
  //   eventCity: '',
  //   hotelName:'',
  //   applyFilter: false
  // })

  const filterData = useRef({
    eventCity: "",
    hotelName: "",
  });

  const currentPage = useRef();
  const [limit, setLimit] = useState(2);
  const [pageCount, setPageCount] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    isLoaded.current = false
    getAllOccuredEvents();
    getAllCities();
    currentPage.current = 1;
  }, [isLoaded.current]);

  const getAllOccuredEvents = () => {
    axios
      .post(
        `http://localhost:3000/occuredEvents?page=${currentPage.current}&limit=${limit}`,
        filterData.current
      )
      .then((response) => {
        // console.log(response.data.Events.event)
        setEventData(response.data.Events.event);
        isLoaded.current = true
        setPageCount(response.data.Events.pageCount);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const getAllCities = () => {
    axios
      .get(`http://localhost:3000/allCities`)
      .then((response) => {
        // console.log(response.data)
        setAllCities(response.data.cities);
        setAllHotels(response.data.hotels);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFilterButton = () => {
    console.log("filter data after the button", filterData.current);
    getAllOccuredEvents();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name == "eventCity") {
      // console.log(value);
      filterData.current["hotelName"] = "";
      // console.log('afterchange',filterData.current)
      setHotelsInCity(
        allHotels.filter((hotels) => {
          return hotels.hotelCityName == value;
        })
      );
    }
    console.log("value ,", value);
    // setFilterData({...filterData , [name]:value})
    filterData.current[name] = value;
    console.log(filterData.current);
    // console.log(value)
  };

  const handlePageClick = (e) => {
    currentPage.current = e.selected + 1;
    getAllOccuredEvents();
  };

  if (!isLoaded) {
    return <div>Loading.......</div>;
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">
            <h2> Event Management System</h2>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <button
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="btn btn-primary me-3"
                >
                  Login
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => {
                    navigate("/signup");
                  }}
                  className="btn btn-secondary"
                >
                  Sign Up
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}

      <div className="container flex-grow-1 my-5 ">
        <div className="text-center">
          <h2 className="mb-4">Our Events</h2>

          <div className="container filter-container mt-2">
            {/* <h3 className="mx-3">Filter Results:</h3> */}
            <div className="mb-3 mx-3">
              <label htmlFor="eventCity" className="form-label">
                City:
              </label>
              <select
                className="form-select"
                id="eventCity"
                name="eventCity"
                value={filterData.eventCity}
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

            <div className="mb-3">
              <label htmlFor="hotelName" className="form-label">
                Hotel:
              </label>
              <select
                className="form-select"
                id="hotelName"
                name="hotelName"
                value={filterData.hotelName}
                onChange={handleChange}
                disabled={!filterData.current.eventCity} // Disable if no city is selected
              >
                <option value="">Select</option>
                {hotelsInCity.map((hotel) => (
                  <option key={hotel._id} value={hotel.name}>
                    {hotel.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="btn btn-primary m-2"
              onClick={handleFilterButton}
            >
              Apply
            </button>
          </div>
          <div className="d-flex justify-content-around align-items-center">
            {eventData.map((Event, index) => (
              <div className="col-md-6 mb-4" key={index}>
                <EventCartItem {...Event} />
              </div>
            ))}
          </div>
          <ReactPaginate
            breakLabel="..."
            nextLabel="->"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<-"
            renderOnZeroPageCount={null}
            marginPagesDisplayed={2}
            containerClassName="pagination justify-content-center"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            activeClassName="active"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-3 bg-dark text-light">
        Footer Content
      </footer>
    </div>
  );
}

export default Homepage;
