import React, { useState } from 'react';
import axios from "axios";
import './css/universalForm.css'

function Login(props) {

    const [loginForm, setloginForm] = useState({
      email: "",
      password: ""
    })

    function logMeIn(event) {
      axios({
        method: "POST",
        url:"http://127.0.0.1:5000/token",
        data:{
          email: loginForm.email,
          password: loginForm.password
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

      setloginForm(({
        email: "",
        password: ""}))

      event.preventDefault()
    }

    function handleChange(event) { 
      const {value, name} = event.target
      setloginForm(prevNote => ({
          ...prevNote, [name]: value})
      )}

    return (
      <div className='formContainer'>
        <h1>Login</h1>
          <form>
            <input onChange={handleChange} 
                  type="text"
                  text={loginForm.email} 
                  name="email" 
                  placeholder="Email" 
                  value={loginForm.email} />
            <input onChange={handleChange} 
                  type="password"
                  text={loginForm.password} 
                  name="password" 
                  placeholder="Password" 
                  value={loginForm.password} />

          <button onClick={logMeIn}>Submit</button>
        </form>
      </div>
    );
}
export default Login;
