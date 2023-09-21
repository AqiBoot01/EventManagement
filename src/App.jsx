import "./App.css";
import SignupForm from "./components/Signup/SignupForm";
import LoginForm from "./components/Login/LoginForm";
import UserDashboard from "./components/Dashboard/UserDashboard"
import Homepage from "./components/Homepage/homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import NewEvent from "./components/Homepage/NewEvent";
import { ToastContainer } from 'react-toastify';



function App() {
  return (
  <>
  <ToastContainer/>
  <BrowserRouter>
  <Routes>
  <Route path='/' element={<Homepage/>}></Route>
  <Route path="/signup" element={<SignupForm />} />
  <Route path="/login" element={<LoginForm />} />
  <Route path="/userdashboard" element={<UserDashboard/>} />
  <Route path="/admindashboard" element={<AdminDashboard/>} />
  <Route path="/event/:id" element={<NewEvent/>}/>

  </Routes>

  </BrowserRouter>
  </> 
  );
}

export default App;
