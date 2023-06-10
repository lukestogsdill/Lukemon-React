import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import '../components/css/universalForm.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Register(props) {

    const [registerForm, setRegisterForm] = useState({})
    const navigate = useNavigate()

    const registerMe = async(event) => {
      event.preventDefault()
      const response = await fetch("http://73.77.228.37:5000/register",{
        method: "POST",
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
          url: registerForm.url,
          username: registerForm.username,
          password: registerForm.password,
          confirmPassword: registerForm.confirmPassword
        })
      })
      const data = await response.json()
      if(response.status === 400){
        toast.error(data.msg)
        return
      }
      toast.success(data.msg)
      navigate('/login')
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
                placeholder="Img-URL (Optional)"
                value={registerForm.url} />
            <input onChange={handleChange} 
                type="text"
                text={registerForm.username} 
                name="username" 
                placeholder="Username*"
                value={registerForm.username} />
            <input onChange={handleChange} 
                type="password"
                text={registerForm.password} 
                name="password" 
                placeholder="Password*" 
                value={registerForm.password} />
            <input onChange={handleChange} 
                type="password"
                text={registerForm.confirmPassword} 
                name="confirmPassword" 
                placeholder="Confirm password*" 
                value={registerForm.confirmPassword} />
            <button onClick={registerMe}>Submit</button>
        </form>
      </div>
    )
}
export default Register