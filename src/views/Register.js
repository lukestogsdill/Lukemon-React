import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import bcrypt from 'bcryptjs'
import '../components/css/universalForm.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Register(props) {

    const [registerForm, setRegisterForm] = useState({})
    const navigate = useNavigate()

    const registerMe = async(event) => {
      event.preventDefault()
      let pic = registerForm.url
      if(registerForm.password !== registerForm.confirmPassword){
        toast.error('Passwords do not match')
        return
      }
      if(pic === undefined){
        pic = 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fvignette2.wikia.nocookie.net%2Ffantendo%2Fimages%2Fa%2Fa8%2FLeaf.png%2Frevision%2Flatest%3Fcb%3D20131027164915&f=1&nofb=1&ipt=c46c1fd855608403c3818336f0b989d683008936cfa53c96d8faaa6c7ce03022&ipo=images'
      }
      const salt = bcrypt.genSaltSync(10)
      const hashedPassword = bcrypt.hashSync(registerForm.password, salt)
      const response = await fetch("http://73.77.228.37:5000/register",{
        method: "POST",
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
          url: pic,
          username: registerForm.username,
          password: hashedPassword
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

    const getHash = async(event) => {
      const salt = bcrypt.genSaltSync(10)
      const hashedPassword = bcrypt.hashSync(event.value, salt)
      console.log(hashedPassword)
    }

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