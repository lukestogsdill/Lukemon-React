import React , { useState, useEffect } from 'react'
import axios from 'axios'
import './css/PostFight.css'
import { Link } from 'react-router-dom'

function PostFight(props) {
  
    const [feed, setFeed] = useState([])

  useEffect(() => {
    getFeed()
  },[])

  const getFeed = async () => {
      const response = await fetch("http://127.0.0.1:5000/getFeed",{
        headers: {
          Authorization: `Bearer ${props.token}`,
        }
      })
        const data = await response.json()
        setFeed(data)
  }

  const CreatePost = () => {
    const [text, setText] = useState('')

    function handleChange(event) {
      setText(event.target.value);
    }

    const handleSubmit = async (event) => {
      event.preventDefault()
      if(text!== ''){
        const res = await axios({
          method: 'POST',
          url: 'http://127.0.0.1:5000/postFight',
          headers: {
            Authorization: `Bearer ${props.token}`
          },
          data: {
            caption: text
          }
        })
        setText('')
      } else {
        return {'msg': 'Please enter a Caption'}
      }
    }
    return(
      <form onSubmit={handleSubmit} className='postForm'>
        <input type="textbox" value={text} onChange={handleChange}/>
        <button type="submit">Add</button>
      </form>
    )
  }

  return (
    <div className='postTree'>
      <CreatePost/>
      <div className='postContainer'>
        {feed.map((feed, index) => {
          return(
          <div className='postedFight'>
            <h2>{feed.username}</h2>
            <img src={feed.user_img}/>
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