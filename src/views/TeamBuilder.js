import axios from "axios"
import React, { useEffect } from 'react'
import './css/TeamBuilder.css'

function TeamBuilder(props){
  const teamData = []

  function addTeam(index){
    if(teamData > 7){
      return {'msg': 'props.team is already full'}
    }
    else{
      teamData.push(props.invData[index])
      props.invData[index]['onTeam'] = teamData.length-1
      console.log(teamData.length)
      console.log(teamData)
      props.setTeam(props.team.concat(teamData))
      console.log(props.team)
    }
  }

  function delTeam(index) {
    teamData.splice(props.team[index]['onTeam'], 1)
    props.team[index]['onTeam'] = null
    const updatedTeam = props.team.filter((team, i) => i !== index)
    props.setTeam(updatedTeam)
  }

  const teamDisplay = async () =>{
    const data = await getData()
    for(let i = 0; i < data.length; i++){
      if(data[i]['onTeam']!=null){
        teamData[data[i]['onTeam']] = data[i]
      }
    }
    props.setTeam(teamData)
  }

  const getData = async() => {
    const response = await fetch("http://localhost:5000/getInv",{
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
    console.log(id_data)
    const res = await axios({
      method: "POST",
      url: "http://localhost:5000/saveTeam",
      headers: {
        Authorization: `Bearer ${props.token}`
      },
      data: {
        ids:id_data
      }
    })
  }
  
  useEffect(() => {
    teamDisplay()
    console.log(props.team)
  },[])

  return (
    
    <div className='invTree'>
      <div className='teamContainer'>
      <h1>MY TEAM</h1>
        <ul className='teamList'>
        {props.team.map((team, index) => {
            return(
              team.onTeam!=null?(
                <div className="pokeCard">
                <button onClick={() => delTeam(index)}>X</button>
                <img className='teamImg' src={team.poke_hash.sprite_url}></img>
                <h3>{team.poke_hash.poke_name}</h3>
                <h4>{team.poke_hash.poke_type}</h4>
                <ul>
                  <li className="hp">HP<br/>{team.poke_hash.hp}</li>
                  <li className="att">ATT<br/>{team.poke_hash.att}</li>
                  <li className="def">DEF<br/>{team.poke_hash.defe}</li>
                  <li className="speed">SPD<br/>{team.poke_hash.speed}</li>
                </ul>
                <h4>Super Duper Punch</h4>
                <ul>
                  <li>DMG<br/>{team.damage}</li>
                  <li>CRIT<br/>%{team.crit}</li>
                  <li>ACC<br/>%{team.accuracy}</li>
                </ul>
              </div>
            ):(
              <></>
              )
        )})}
        </ul>
        <button id='saveBtn' onClick={saveTeam}>Save</button>
      </div>
    <div className='invContainer'>
      {props.invData.map((poke, index) =>{
        return(
          poke.onTeam==null?( 
            <div className="pokeCard">
              {props.team.length<7?(<button onClick={() => addTeam(index)}>ADD</button>):(<></>)}
            
            <img src={poke.poke_hash.sprite_url}></img>
            <h2>{poke.poke_hash.poke_name}</h2>
            <h4>{poke.poke_hash.poke_type}</h4>
            <ul>
              <li className="hp">HP<br/>{poke.poke_hash.hp}</li>
              <li className="att">ATT<br/>{poke.poke_hash.att}</li>
              <li className="def">DEF<br/>{poke.poke_hash.defe}</li>
              <li className="speed">SPD<br/>{poke.poke_hash.speed}</li>
            </ul>
            <h4>Super Duper Punch</h4>
            <ul>
              <li>DMG<br/>{poke.damage}</li>
              <li>CRIT<br/>%{poke.crit}</li>
              <li>ACC<br/>%{poke.accuracy}</li>
            </ul>
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

