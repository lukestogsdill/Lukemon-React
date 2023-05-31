import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './css/universalForm.css'

function Login(props) {

    const [loginForm, setloginForm] = useState({
      email: "",
      password: ""
    })

    const credentials = btoa(`${loginForm.email}:${loginForm.password}`)

    const logMeIn = async(event) => {
      const response = await fetch('http://localhost:5000/token', {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${credentials}`
        },
      })
      const user_token = await response.json()
      console.log(user_token.token)
      props.setToken(user_token.token)

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

          <Link to='/'>
          <button onClick={logMeIn}>Submit</button>
          </Link>
        </form>
      </div>
    )
}
export default Login;
