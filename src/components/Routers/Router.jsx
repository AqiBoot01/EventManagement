import React from 'react'
import { Routes ,Route } from 'react-router-dom';
import SignupForm from '../Signup/SignupForm';
import LoginForm from '../Login/LoginForm';
import Dashboard from '../Dashboard/UserDashboard';
import App from '../../App';
import NewEvent from '../Homepage/NewEvent'
function Router() {
  return (
    <div>
        <Routes>
          <Route path='/' element={<App/>}></Route>
          <Route path="/event" element={<NewEvent/>}/>
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/logindiff" element={<LoginForm />} />
        </Routes>
    </div>
  )
}

export default Router