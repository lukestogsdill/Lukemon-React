import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom"
import bcrypt from 'bcryptjs'
import './css/universalForm.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Login(props) {

    const [loginForm, setloginForm] = useState({
      username: "",
      password: ""
    })

    const navigate = useNavigate()
    var credentials = btoa(`${loginForm.username}:${loginForm.password}`)

    const logMeIn = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/token`, {
          method: 'GET',
          headers: {
            'Authorization': `Basic ${credentials}`
          },
        })
    
        if (!response.ok) {
          // Throw an error for non-successful responses
          throw new Error('Login failed. Please check your credentials.')
        }
    
        const user_token = await response.json()
        props.setToken(user_token.token)
        navigate('/')
      } catch (error) {
        // Handle the error here (e.g., show an error toast)
        toast.error(error.message)
      }
    }

    function handleChange(event) { 
      const {value, name} = event.target
      setloginForm(prevNote => ({
          ...prevNote, [name]: value})
      )}

      const createGuest = async (event) => {
        event.preventDefault()
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync('password', salt)
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/create_guest`,{
          method: 'POST',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify({
          password: hashedPassword
        })})
        if(response.status !== 200){
          toast.error(response.msg)
        } else {
          const userData = await response.json()
          credentials = btoa(`${userData['username']}:password`)
          console.log(userData['username'])
          logMeIn()
      }
    }

    const handleLogin = async(event) => {
      event.preventDefault()
      await logMeIn()
    }

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
          <button onClick={handleLogin}>Submit</button>
          </Link>
        </form>
        <div className='btnContainer'>
        <Link to='/'>
        <button onClick={createGuest} className='btn'>Generate Guest</button>
        </Link>
        <Link to='/register'>
        <button className='btn'>Register</button>
        </Link>
        </div>
      </div>
    )
}
export default Login
