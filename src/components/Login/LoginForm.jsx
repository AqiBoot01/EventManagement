import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './loginForm.css'
import { Link } from 'react-router-dom';
import { decodeToken } from "react-jwt";
import axios from 'axios';







function LoginForm() {
 const [formData , setFormData] = useState({
    email:'',
    password:'',
 });

 const [message , setMessage] = useState(null) 
 const [isLogin , setIslogin] = useState(false)

 const navigate = useNavigate();

 useEffect(()=>{
 try {
 const token = localStorage.getItem("token");   
//  const decodetoken = decodeToken(token);

 if(token && decodeToken(token).role === 'user'){
  navigate('/userdashboard')
 }else if( token && decodeToken(token).role === 'admin'){
  navigate('/admindashboard')
 }

  
 } catch (error) {
  console.log('login')
  
 }
 
 }, [])

 const handleChange =  (e)=>{
    const {name , value} = e.target;
    setFormData({...formData,[name]:value})
}
 
const handleSubmit = (e)=>{
    e.preventDefault();

    axios.post('http://localhost:3000/login' , formData)
      .then(response=>{

        if(response.data.success){

          localStorage.setItem("token", response.data.token);
          console.log(response.data.token)
            if(response.data.user.role === 'admin'){

              navigate('/admindashboard')

            }else{
              navigate('/userdashboard')
            }

             toast.success('Login successful');

        }else{
          // console.log(data.message);
          setMessage(response.data.message);
          // Display an error toast
          toast.error('Login failed');

        }
         
      })
      .catch((error) => {
        console.error(error);
      });  

}
 

  

  return (


     <div className='LoginForm'>
    <div className="container">
      <div className="loginImg">
        <img src='http://localhost:3000/uploads/imgs/loginImg.jpg' className="img-fluid w-100" style={{ Height: '300px' }} />
      </div>
      <div className="loginform">
        <div className="signInwith">
      <h2 className="mt-4 mb-4">Sign In with </h2>
      <i className="bi bi-google"></i>
      <i className="bi bi-facebook"></i>
      <i className="bi bi-linkedin"></i>
      </div>
      <div><h3>-OR-</h3></div>
      {/* Display the message if it exists */}
      {message && <div className='alert alert-danger'>{message}</div>}
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder='Email Address'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 ">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
      </form>
       <div className='register'>
        <h4>Don,t have an account ?</h4>
         <Link to='/signup' className='link'>Register</Link>
       </div>

      </div>
      
    </div>
    </div>
  )
}

export default LoginForm