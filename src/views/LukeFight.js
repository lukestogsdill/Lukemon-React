import React, { useState, useEffect } from 'react'
import {useParams} from "react-router-dom";
import './css/LukeFight.css'


function LukeFight(props) {

    const [player, setPlayer] = useState([])
    const [banker, setBanker] = useState([])
    const [playerPoke, setPlayerPoke] = useState()
    const [bankerPoke, setBankerPoke] = useState()
    const [playerTrash, setPlayerTrash] = useState([])
    const [bankerTrash, setBankerTrash] = useState([])
    const [playerDmg, setPlayerDmg] = useState([])
    const [bankerDmg, setBankerDmg] = useState([])
    const [playerAtt, setPlayerAtt] = useState(false)
    const [bankerAtt, setBankerAtt] = useState(false)
    const [playerDmgAni, setPlayerDmgAni] = useState(false)
    const [bankerDmgAni, setBankerDmgAni] = useState(false)
    const {id} = useParams()
    const teamData = []
    let dmg = 0
    let crit = 1
    let acc = 1
    let downed = {}
    let fightBtn = document.getElementById('fightBtn')

    useEffect(() => {
      getTeam()
    },[])

    useEffect(() => {
      bankerPokeLoader(banker)
    },[banker])

    useEffect(() => {
      playerPokeLoader(player)
    },[player])
    
    const playerPokeLoader = (team) => {
      setPlayerPoke(team[0])
    }

    const bankerPokeLoader = (team) => {
      setBankerPoke(team[0])
    }

    const battleTurn = async() => {
      fightBtn.style.display = 'none'
        if (playerPoke.poke_hash.speed >= bankerPoke.poke_hash.speed){
          // poke 1 goes first
          handlePlayerDmg()
          if(bankerPoke.poke_hash.hp <= 0) {
            handleBankerDowned()
            handleResult()
            return
          }
          await sleep(1)
          // then poke 2
          handleBankerDmg()
          if(playerPoke.poke_hash.hp <= 0) {
            handlePlayerDowned()
            handleResult()
            return
          }
          await sleep(1)
          
        } else if (playerPoke.poke_hash.speed < bankerPoke.poke_hash.speed){
          // poke 2 first
          handleBankerDmg()
          if(playerPoke.poke_hash.hp <= 0) {
            handlePlayerDowned()
            handleResult()
            return
          }
          await sleep(1)
          //then poke 1
          handlePlayerDmg()
          if(bankerPoke.poke_hash.hp <= 0) {
            handleBankerDowned()
            handleResult()
            return
          }
          await sleep(1)
        }
        handleFight()
      }

    const damageDealt = (poke1, poke2) => {
      crit = 1
      acc = 1
      let critRoll = Math.round(Math.random()*100)
      let accRoll = Math.round(Math.random()*100)
      let pDmgEff = document.getElementById('pDmgEff')
      let bDmgEff = document.getElementById('bDmgEff')
      if(critRoll <= poke1.crit){
        crit = 1.5
        pDmgEff.setAttribute('style','color: orange')
        bDmgEff.setAttribute('style','color: orange')
      } else {
        pDmgEff.setAttribute('style','color: white')
        bDmgEff.setAttribute('style','color: white')
      }
      if(accRoll > poke1.accuracy){
        acc = 0
      }
      return(((poke1.damage*poke1.poke_hash.att)/poke2.poke_hash.defe)/4)*crit*acc
    }

    const handlePlayerDmg = () => {
      dmg = damageDealt(playerPoke, bankerPoke)
          handlePlayerAtt()
          bankerPoke.poke_hash.hp -= dmg
          setPlayerDmg(dmg)
    }

    const handleBankerDmg = () => {
      dmg = damageDealt(bankerPoke, playerPoke)
          handleBankerAtt()
          playerPoke.poke_hash.hp -= dmg
          setBankerDmg(dmg)
    }

    const handleBankerDowned = () =>{
      if(bankerPoke.poke_hash.hp <= 0) {
        downed = banker.shift()
        setBankerTrash(bankerTrash.concat(downed))
        bankerPokeLoader(banker)
        fightBtn.style.display = 'block'
      }
    }
      const handlePlayerDowned = () => {
        if(playerPoke.poke_hash.hp <= 0) {
        downed = player.shift()
        setPlayerTrash(playerTrash.concat(downed))
        playerPokeLoader(props.team)
        fightBtn.style.display = 'block'
      }
    }

    const handleResult = () => {
      if(player.length === 0 || playerPoke === undefined){
        var showResults = document.createElement('showResults')
        showResults.innerHTML = 'you Lose!'
        document.body.appendChild(showResults)
      } else if(banker.length === 0 || bankerPoke === undefined) {
        var showResults = document.createElement('showResults')
        showResults.innerHTML = 'you Win!'
        document.body.appendChild(showResults)
      } 
    }

    const testLog = () => {
      console.log('tesstingg')
      console.log(bankerTrash)
    }

    const handleFight = async () => {
      playerPokeLoader(props.team)
      bankerPokeLoader(banker)
      await battleTurn()
    }

    const getTeam = async () => {
    const response = await fetch(`http://localhost:5000/getTeam/${id}`,{
      headers: {
        Authorization: `Bearer ${props.token}`,
      }
    })
      const data = await response.json()
      for(let i = 0; i < data.length; i++){
        teamData[data[i]['onTeam']] = data[i]
      }
      setBanker(teamData)
      setPlayer(props.team)
    }

    const sleep = async(seconds) =>{
      return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
    }

    const handlePlayerAtt = () => {
      setPlayerAtt(true)
      setPlayerDmgAni(true)
      setTimeout(() => setPlayerAtt(false), 1000)
      setTimeout(() => setPlayerDmgAni(false), 1000)
    }

    const handleBankerAtt = () => {
      setBankerAtt(true)
      setBankerDmgAni(true)
      setTimeout(() => setBankerAtt(false), 1000)
      setTimeout(() => setBankerDmgAni(false), 1000)
    }
    
    return(
    <div className='fightTree'>
      <button onClick={handleFight} id='fightBtn'>Press to Fight!</button>
      <div className='fightContainer'>
        {playerPoke?(
          <div className='playerContainer'>
          <h2 className={bankerDmgAni?'bankerDmgAni':'dmgAni'} id='bDmgEff'>{Math.round(bankerDmg)}</h2>
          <svg width='200' height='200'>
            <image href={playerPoke.poke_hash.sprite_url} 
            x='25%' y='25%'
            width="50%" height="50%"
            className={playerAtt? 'playerAtt': 'image'}
            id='playerPic'/>
          </svg>
          <h2 className='hpBar'>HP: {Math.round(playerPoke.poke_hash.hp)}</h2>
          </div>
        ):(
          <></>
        )}
        {bankerPoke?(
        <div className='bankerContainer'>
          <h2 className={playerDmgAni?'playerDmgAni':'dmgAni'} id='pDmgEff'>{Math.round(playerDmg)}</h2>
          <svg width="200" height="200">
            <image href={bankerPoke.poke_hash.sprite_url}
            x='25%' y='25%'
            width="50%" height="50%"
            className={bankerAtt? 'bankerAtt': 'image'}
            id='bankerPic'/>
          </svg>
          <h2 className='hpBar'>HP: {Math.round(bankerPoke.poke_hash.hp)}</h2>
        </div>
        ):(
          <></>
        )}
    </div>
    <div className='aliveBar'>
    <div className='playerAlive'>
    <h1>Player</h1>
    {props.team.map((player) => {
        return(
          <img src={player.poke_hash.sprite_url}/>
        )
    })}
    </div>
    <div>
    <h1>Banker</h1>
    {banker.map((banker) => {
        return(
          <img src={banker.poke_hash.sprite_url}/>
        )
    })}
    </div>
    </div>
    <div className='trashBar'>
    <div className='playerTrash'>
      <h2>Trash</h2>
    {playerTrash.map((trash) => {
      return(
        <img src={trash.poke_hash.sprite_url}/>
      )
    })}
    </div>
    <div>
    <h2>Trash</h2>
    {bankerTrash.map((trash) => {
      return(
        <img src={trash.poke_hash.sprite_url}/>
      )
    })}
    </div>
    </div>
    
    </div>
    )

  }

export default LukeFight