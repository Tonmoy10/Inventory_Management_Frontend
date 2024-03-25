import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const [values, setValues] = useState({
            email:'',
            password:''
        })

    const [error, setError] = useState()

    const navigate = useNavigate()

    axios.defaults.withCredentials = true;

    const handleChange = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/auth/login', values)
        .then(result => {
          if (result.data.loginStatus) {
            navigate("/dashboard")
          } else {
            setError(result.data.Error)
          }
        })
        .catch(err => console.log(err))
    }


    return (
        <div className='d-flex justify-content-center align-content-center vh-100 loginPage'>
          <div className='p-3 rounded-4 verticalCenter w-25 h-50 border loginForm'>
            <h2><center>Login Page</center></h2>
            <form onSubmit={handleChange}>
              <div className='mt-3'>
                <label htmlFor="email"><strong>Email:</strong></label>
                <input type="email" name="email" className='form-control rounded-3' 
                autoComplete='off' placeholder='example@email.com' onChange={(e) => setValues({...values, email:e.target.value})} />
              </div>
              <div className='mt-3'>
                <label htmlFor="password"><strong>Password:</strong></label>
                <input type="password" name="password" className='form-control rounded-3' 
                placeholder='**********' onChange={(e) => setValues({...values,password:e.target.value})} />
              </div>
              <button className='btn loginButton mt-4 text-white w-100 rounded-3'><strong>Login</strong></button>
              <div className='text-danger mt-3'>
                <center><strong>{error && error}</strong></center>
              </div>
            </form>
          </div>
        </div>
      )
}

export default LoginPage