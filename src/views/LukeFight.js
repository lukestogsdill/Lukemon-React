import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom"
import Modal from '@mui/material/Modal'
import pokeType from '../components/pokeType'
import './css/LukeFight.css'
import { LukeCard } from '../components/lukeCard'


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
  const [open, setOpen] = useState(false)
  const [result, setResult] = useState('')
  const [message, setMessage] = useState('')
  const teamData = []
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const id = params.get('id')
  const value = params.get('value')
  const bankerName = params.get('bankerName')
  const navigate = useNavigate()
  let dmg = 0
  let crit = 1
  let acc = 1
  let downed = {}
  let fightBtn = document.getElementById('fightBtn')
  let typeStatus = document.getElementById('typeStatus')
  console.log(id, value, bankerName)


  useEffect(() => {
    const getTeams = async () => {
      await getTeam()
    }
    getTeams()
  }, [])

  useEffect(() => {
    bankerPokeLoader(banker)
  }, [banker])

  useEffect(() => {
    playerPokeLoader(player)
  }, [player])

  const playerPokeLoader = (team) => {
    setPlayerPoke(team[0])
  }

  const bankerPokeLoader = (team) => {
    setBankerPoke(team[0])
  }


  const battleTurn = async () => {
    fightBtn.style.display = 'none'
    if (playerPoke.poke_hash.speed >= bankerPoke.poke_hash.speed) {
      // poke 1 goes first
      handlePlayerDmg()
      if (bankerPoke.poke_hash.hp <= 0) {
        handleBankerDowned()
        handleResult()
        return
      }
      await sleep(1)
      // then poke 2
      handleBankerDmg()
      if (playerPoke.poke_hash.hp <= 0) {
        handlePlayerDowned()
        handleResult()
        return
      }
      await sleep(1)

    } else if (playerPoke.poke_hash.speed < bankerPoke.poke_hash.speed) {
      // poke 2 first
      handleBankerDmg()
      if (playerPoke.poke_hash.hp <= 0) {
        handlePlayerDowned()
        handleResult()
        return
      }
      await sleep(1)
      //then poke 1
      handlePlayerDmg()
      if (bankerPoke.poke_hash.hp <= 0) {
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
    let critRoll = Math.round(Math.random() * 100)
    let accRoll = Math.round(Math.random() * 100)
    let pDmgEff = document.getElementById('pDmgEff')
    let bDmgEff = document.getElementById('bDmgEff')

    let type = pokeType(poke1.poke_hash.poke_type, poke2.poke_hash.poke_type)
    console.log(poke1.poke_hash.poke_type)
    if (critRoll <= poke1.crit) {
      crit = 1.5
      pDmgEff.setAttribute('style', 'color: orange')
      bDmgEff.setAttribute('style', 'color: orange')
    } else {
      pDmgEff.setAttribute('style', 'color: white')
      bDmgEff.setAttribute('style', 'color: white')
    }
    if (accRoll > poke1.accuracy) {
      acc = 0
    }
    switch (type) {
      case 1.5:
        typeStatus.innerHTML = 'Super Effective'
        break
      case 0.5:
        typeStatus.innerHTML = 'Not Very Effective'
        break
      case 1:
        typeStatus.innerHTML = ' '
        break
    }
    return (((poke1.damage * poke1.poke_hash.att) / poke2.poke_hash.defe) / 4) * crit * acc * type
  }

  const handlePlayerDmg = () => {
    dmg = Math.round(damageDealt(playerPoke, bankerPoke))
    setMessage(`player did ${dmg} damage`)
    handlePlayerAtt()
    bankerPoke.poke_hash.hp -= dmg
    setPlayerDmg(dmg)
  }

  const handleBankerDmg = () => {
    dmg = Math.round(damageDealt(bankerPoke, playerPoke))
    setMessage(`banker did ${dmg} damage`)
    handleBankerAtt()
    playerPoke.poke_hash.hp -= dmg
    setBankerDmg(dmg)
  }

  const handleBankerDowned = () => {
    if (bankerPoke.poke_hash.hp <= 0) {
      downed = banker.shift()
      setBankerTrash(bankerTrash.concat(downed))
      bankerPokeLoader(banker)
      typeStatus.innerHTML = ''
      fightBtn.style.display = 'block'
    }
  }
  const handlePlayerDowned = () => {
    if (playerPoke.poke_hash.hp <= 0) {
      downed = player.shift()
      setPlayerTrash(playerTrash.concat(downed))
      playerPokeLoader(props.team)
      typeStatus.innerHTML = ''
      fightBtn.style.display = 'block'
    }
  }

  const handleClose = () => {
    setOpen(false)
    navigate('/')
  }

  const handleResult = async () => {
    if (player.length === 0 || playerPoke === undefined) {
      setOpen(true)
      setResult('You Lose')
    } else if (banker.length === 0 || bankerPoke === undefined) {
      setOpen(true)
      setResult('You Win')
      props.setMoney(parseInt(props.money, 10) + parseInt(value, 10))
      setResult(`You Win $${value}!`)
    }
  }

  const handleFight = async () => {
    playerPokeLoader(props.team)
    bankerPokeLoader(banker)
    await battleTurn()
  }

  const getTeam = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/getTeam/${id}`, {
      headers: {
        Authorization: `Bearer ${props.token}`,
      }
    })
    const data = await response.json()
    for (let i = 0; i < data.length; i++) {
      teamData[data[i]['onTeam']] = data[i]
    }
    setBanker(teamData)
    setPlayer(props.team)
  }

  const sleep = async (seconds) => {
    return new Promise((resolve) => setTimeout(resolve, seconds * 900))
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

  return (
    <div className='fightTree'>


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        className='postModal'>
        <h1>{result}</h1>
      </Modal>
      <div className='pokeBar'>
        <div className='playerBar'>
          <h1>{props.user.username}</h1>
          <ul className='pokeList'>
            {props.team.map((player) => {
              return (
                <li className='downSized'>
                  <LukeCard poke={player} />
                </li>
              )
            })}
            {playerTrash.map((trash) => {
              return (
                <li className='deadPoke downSized'>
                  <LukeCard poke={trash} />
                </li>
              )
            })}
          </ul>
        </div>
        <div className='bankerBar'>
          <h1>{bankerName}</h1>
          <ul className='pokeList'>
            {banker.map((banker) => {
              return (
                <li className='downSized'>
                  <LukeCard poke={banker} />
                </li>
              )
            })}
            {bankerTrash.map((trash) => {
              return (
                <li className='deadPoke downSized'>
                  <LukeCard poke={trash} />
                </li>
              )
            })}
          </ul>

        </div>
      </div>
      <div className='fightContainer'>

        {playerPoke ? (
          <div className='playerContainer'>
            <h2 className={bankerDmgAni ? 'bankerDmgAni' : 'dmgAni'} id='bDmgEff'>{Math.round(bankerDmg) !== 0 ? (Math.round(bankerDmg)) : 'miss'}</h2>

            <img src={playerPoke.poke_hash.sprite_url} className={playerAtt ? 'playerAtt' : 'image'} id='playerPic' />
            <h2 className='hpBar'>HP: {Math.round(playerPoke.poke_hash.hp)}</h2>
          </div>
        ) : (
          <></>
        )}
        {bankerPoke ? (
          <div className='bankerContainer'>
            <h2 className={playerDmgAni ? 'playerDmgAni' : 'dmgAni'} id='pDmgEff'>{Math.round(playerDmg) !== 0 ? (Math.round(playerDmg)) : 'miss'}</h2>

            <img src={bankerPoke.poke_hash.sprite_url} className={bankerAtt ? 'bankerAtt' : 'image'} id='bankerPic' />
            <h2 className='hpBar'>HP: {Math.round(bankerPoke.poke_hash.hp)}</h2>
          </div>
        ) : (
          <></>
        )}
      </div>
      <p id='typeStatus'></p>
      <p className="logMessage">{message}</p>
      <button onClick={handleFight} id='fightBtn'>Press to Fight!</button>

    </div>
  )

}

export default LukeFight