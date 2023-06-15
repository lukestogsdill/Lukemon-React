import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './css/universalForm.css'

function Login(props) {

    const [loginForm, setloginForm] = useState({
      username: "",
      password: ""
    })

    const credentials = btoa(`${loginForm.username}:${loginForm.password}`)

    const logMeIn = async(event) => {
      const response = await fetch('https://lukemon-api-9ec20912cdb1.herokuapp.com/token', {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${credentials}`
        },
      })
      const user_token = await response.json()
      props.setToken(user_token.token)

      setloginForm(({
        username: "",
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
                  text={loginForm.username} 
                  name="username" 
                  placeholder="Username" 
                  value={loginForm.username} />
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
