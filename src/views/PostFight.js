import React , { useState, useEffect } from 'react'
import './css/PostFight.css'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

function PostFight(props) {
  
    const [feed, setFeed] = useState([])
    const [open, setOpen] = useState(false)
    const teamData = []

  useEffect(() => {
      const fetchData = async () => {
        await getFeed()
        await getPlayerTeam()
        await updateCurr()
      }
      fetchData()
  },[])
  


  const getFeed = async () => {
      const response = await fetch("http://73.77.228.37:5000/getFeed",{
        headers: {
          Authorization: `Bearer ${props.token}`,
        }
      })
        const data = await response.json()
        setFeed(data)
  }
  const updateCurr = async () => {
    if(props.token && props.money !== undefined){
      const response = await fetch("http://73.77.228.37:5000/updateCurr",{
      method: 'POST',  
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${props.token}`
      },
      body: JSON.stringify({
          tickets: props.tickets,
          money: props.money
      })
      })
      console.log(props.money)
    } else {
      console.log('not logged in')
    }
  }
  const getPlayerTeam = async () => {
    const response = await fetch(`http://73.77.228.37:5000/getPlayerTeam`,{
      headers: {
        Authorization: `Bearer ${props.token}`,
      }
    }) 
      const data = await response.json()
      for(let i = 0; i < data.length; i++){
        teamData[data[i]['onTeam']] = data[i]
      }
      props.setTeam(teamData)
    }



  const CreatePost = () => {
    const [text, setText] = useState('')

    function handleChange(event) {
      setText(event.target.value);
    }

    const handleSubmit = async (event) => {
      event.preventDefault()
      if(text!== ''){
        const response = await axios({
          method: 'POST',
          url: 'http://73.77.228.37:5000/postFight',
          headers: {
            Authorization: `Bearer ${props.token}`
          },
          data: {
            caption: text
          }
      })
      
      if(response.status !== 200){
        toast.error(response.data.msg)
      } else {
        toast.success(response.data.msg)
      }
        setText('')
      } else {
        toast.error('Please type a caption')
      }
      
    }
    return(
      <form onSubmit={handleSubmit} className='postForm'>
        <input type="textbox" value={text} onChange={handleChange}/>
        <button type="submit">Add</button>
      </form>
    )
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div className='postTree'>
      <Button onClick={handleOpen}>Create Post</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        className='postModal'>
          <div className='uniModal'>
        <CreatePost/>
        </div>
      </Modal>
      <div className='postContainer'>
        {feed.map((feed, index) => {
          return(
          <div className='postedFight'>
            <h2>{feed.username}</h2>
            <div className='profilePic'
            style={{
            backgroundImage: `url(${feed.user_img})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '50px'
          }}/>
            <h4>{feed.caption}</h4>
            <img src={feed.poke_img}/>
            <p><small>{feed.date_created}</small></p>
            <Link to={`/lukefight/${feed.user_id}`}>
            <div>FIGHT!</div>
            </Link>
          </div>
          )
        })}
      </div>
    </div>
  )
}

export default PostFight