import axios from "axios"
import React, { useEffect, useState } from 'react'
import './css/TeamBuilder.css'
import '../components/css/pokeTypes.css'
import Modal from '@mui/material/Modal'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LukeCard } from '../components/lukeCard'

function TeamBuilder(props){

  useEffect(() => {
    teamDisplay()
  },[])

  const teamData = []
  const [delOpen, setDelOpen] = useState(false)
  const [delPoke, setDelPoke] = useState(null)
  const [saveOpen, setSaveOpen] = useState(false)
  props.setSelected("team")

  function addTeam(index){
    if(props.team.length > 4){
      toast.error('Team Limit Reached')
    }
    else{
      teamData.push(props.invData[index])
      props.invData[index]['onTeam'] = teamData.length-1
      props.setTeam(props.team.concat(teamData))
    }
  }

  function delTeam(index) {
    teamData.splice(props.team[index]['onTeam'], 1)
    props.team[index]['onTeam'] = null
    const updatedTeam = props.team.filter((team, i) => i !== index)
    props.setTeam(updatedTeam)
  }

  const teamDisplay = async () =>{
    const data = await getTeamData()
    for(let i = 0; i < data.length; i++){
      if(data[i]['onTeam']!=null){
        teamData[data[i]['onTeam']] = data[i]
      }
    }
    props.setTeam(teamData)
  }

  const getTeamData = async() => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/getInv`,{
      headers: {
        Authorization: `Bearer ${props.token}`,
      }
    })
      const data = await response.json()
      props.setInvData(data)
      return data
    }

  const saveTeam = async () =>{
    const id_data = []
    for(let i in props.team){
      id_data.push(props.team[i].lukemon_id)
    }
    const response = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_URL}/saveTeam`,
      headers: {
        Authorization: `Bearer ${props.token}`
      },
      data: {
        ids:id_data
      }
      
    })
    if(response.status !== 200){
      toast.error(response.data.msg)
    } else {
      toast.success(response.data.msg)
    }
  }

  const handleDel = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/delPoke/${delPoke}`,{
      headers: {
        Authorization: `Bearer ${props.token}`,
      }
    }) 
    if(response.status === 200){
      getTeamData()
      toast.success('Successfully Deleted')
    } else {
      toast.error('Error, could not delete')
    }
    handleDelClose()
  }

  const CreatePost = () => {
    const [text, setText] = useState('')

    function handleChange(event) {
      setText(event.target.value);
    }

    const handleSubmit = async (event) => {
      event.preventDefault()
      if(text!== ''){
        let team_value = 0
        console.log(props.team)
        for(let i = 0; i < props.team.length; i++){
          team_value = team_value + props.team[i].poke_hash.value
        }
        const team_urls = []
        for(let i = 0; i < props.team.length; i++){
          if(props.team[i].shiny === true){
            team_urls.push(props.team[i].poke_hash.shiny_url)
          } else {
            team_urls.push(props.team[i].poke_hash.sprite_url)
          }
        }
        console.log(team_urls)
        const response = await axios({
          method: 'POST',
          url: `${process.env.REACT_APP_BACKEND_URL}/postFight`,
          headers: {
            Authorization: `Bearer ${props.token}`
          },
          data: {
            caption: text,
            team_value: team_value,
            team_urls: team_urls
          }
      })
      
      if(response.status !== 200){
        toast.error(response.data.msg)
      } else {
        saveTeam()
        handleSaveClose()
      }
        setText('')
      } else {
        toast.error('Please type a caption')
      }
      
    }
    return(
      <form onSubmit={handleSubmit} className='postForm'>
        <h4>Add a comment!</h4>
        <input type="textbox" value={text} onChange={handleChange}/>
        <button type="submit">Save & Post</button>
      </form>
    )
  }

  const handleDelOpen = (num) =>{
    setDelOpen(true)
    setDelPoke(num)
  }
  const handleDelClose = () => {
    setDelOpen(false)
    setDelPoke(null)
  }
  const handleSaveOpen = () =>{
    setSaveOpen(true)
  }
  const handleSaveClose = () => {
    setSaveOpen(false)
  }

  
  return (
    
    <div className='invTree'>
      <Modal
        open={saveOpen}
        onClose={handleSaveClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        className='postModal'>
          <div className='uniModal'>
        <CreatePost/>
        </div>
      </Modal>
      <Modal
        open={delOpen}
        onClose={handleDelClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        className='postModal'>
          <div>
          <h4>Are you sure you want to delete this pokemon?</h4>
          <div className="delBtns">
            <button onClick={() => {handleDel()}} className="delBtn">Yes</button>
            <button onClick={()=>{handleDelClose()}} className="delBtn">No</button>

          </div>
          </div>
      </Modal>
      <h1>TEAM</h1>
      <div className='teamContainer'>
        <ul className='teamList'>
        {props.team.map((poke, index) => {
            return(
              poke.onTeam!=null?(
                <div onClick={() => delTeam(index)}>
                  <LukeCard poke={poke} />
                </div>
            ):(
              <></>
              )
        )})}
        </ul>
        <button id='saveBtn' onClick={handleSaveOpen}>Save</button>
      </div>
    <div className='teamList'>
      {props.invData.map((poke, index) =>{
        return(
          poke.onTeam==null?(
            <div className="teamCard" onClick={() => addTeam(index)}>
              <button onClick={(event) => {
              event.stopPropagation()
              handleDelOpen(poke.lukemon_id)
            }}>x</button>
              <LukeCard poke={poke} />
          </div>
          ):(
            <></>
        )
      )})}
    </div>
    </div>
  )

}

export default TeamBuilder;

