import React, { useState } from 'react';
import axios from "axios";
import '../components/css/universalForm.css'

function Register(props) {

    const [registerForm, setRegisterForm] = useState({})

    function registerMe(event) {
      axios({
        method: "POST",
        url:"http://localhost:5000/register",
        data:{
            url: registerForm.url,
            email: registerForm.email,
            username: registerForm.username,
            password: registerForm.password,
            confirmPassword: registerForm.confirmPassword
        }
      })
      .then((response) => {
        props.setToken(response.data.access_token)
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          }
      })
      
      event.preventDefault()
    }

    function handleChange(event) { 
      const {value, name} = event.target
      setRegisterForm(prevNote => ({
          ...prevNote, [name]: value})
      )}

    return (
      <div className='formContainer'>
        <h1>Register</h1>
          <form>
            <input onChange={handleChange} 
                type="text"
                text={registerForm.url} 
                name="url" 
                placeholder="Url"
                value={registerForm.url} />
            <input onChange={handleChange} 
                type="email"
                text={registerForm.email} 
                name="email" 
                placeholder="email"
                value={registerForm.email} />
            <input onChange={handleChange} 
                type="text"
                text={registerForm.username} 
                name="username" 
                placeholder="Username"
                value={registerForm.username} />
            <input onChange={handleChange} 
                type="password"
                text={registerForm.password} 
                name="password" 
                placeholder="Password" 
                value={registerForm.password} />
            <input onChange={handleChange} 
                type="password"
                text={registerForm.confirmPassword} 
                name="confirmPassword" 
                placeholder="Confirm password" 
                value={registerForm.confirmPassword} />
            <button onClick={registerMe}>Submit</button>
        </form>
      </div>
    );
}
export default Register