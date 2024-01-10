import React, { useState, useEffect } from "react"
import axios from 'axios'
import './css/roll.css'
import '../components/css/pokeTypes.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Roll(props) {
  props.setSelected("roll")
  const [poke, setPoke] = useState({})
  const [pokeAtt, setPokeAtt] = useState({})
  const [invCount, setInvCount] = useState(0)
  const [counter, setCounter] = useState(642)

  useEffect(() => {
    const fetchData = async () => {
      await getInvLen()
    }
    fetchData()
  }, [])

  const getInvLen = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/invCount`, {
      headers: {
        Authorization: `Bearer ${props.token}`
      }
    })
    const data = await response.json()
    setInvCount(data.inv_count)
  }

  const postSearch = async (pokeData) => {
    const response = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_URL}/roll`,
      headers: {
        Authorization: 'Bearer ' + props.token
      },
      data: pokeData
    })
    return response
  }

  const handleCatch = () => {
    props.setLoading(true)
    const postData = async () => {
      await postCatch()
    }
    postData()
  }

  const postCatch = async () => {
    const response = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_URL}/catch`,
      headers: {
        Authorization: 'Bearer ' + props.token
      },
      data: pokeAtt
    })
    setPoke('')
    setPokeAtt('')
    if (response.status !== 200) {
      toast.error(response.data.msg)
    } else {
      toast.success(response.data.msg)
      setInvCount(invCount + 1)
    }
    props.setLoading(false)
    return response
  }

  const getPokemon = async () => {
    if (props.tickets <= 0) {
      toast.error('Insufficient Tickets')
    }
    else if (invCount && invCount > 25) {
      toast.error('Inventory Full (25 max)')
    }
    else {
      props.setLoading(true)
      const getData = async () => {
        await generatePoke()
      }
      getData()
    }
  }

  const generatePoke = async () => {
    const attMove = generateAtt()
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/getPokeHash/${attMove.poke_name}`)
    const pokeData = await response.json()
    if (attMove.shiny_roll === 1) {
      if (attMove.damage < 100) {
        attMove.damage = 100
      }
      if (attMove.crit < 50) {
        attMove.crit = 50
      }
      if (attMove.accuracy < 50) {
        attMove.accuracy = 50
      }
      pokeData.shiny = true
      attMove.shiny = true
    }
    attMove.poke_name = pokeData.poke_name
    props.setTickets(props.tickets - 1)
    setPoke(pokeData)
    setPokeAtt(attMove)
    postSearch(pokeData)
    props.setLoading(false)
  }

  const generateAtt = () => {
    const attData = {
      'poke_name': counter,
      // 'poke_name': Math.floor(Math.random() * 649) + 1,
      'damage': Math.floor(Math.random() * 140) + 40,
      'crit': Math.floor(Math.random() * 100),
      'accuracy': Math.floor(Math.random() * 100),
      'shiny_roll': Math.floor(Math.random() * 400) + 1,
      'shiny': false
    }
    setCounter(counter +1)
    return attData
  }

  function truncateString(str, maxLength) {
    const newStr = str.charAt(0).toUpperCase() + str.slice(1)
    if (str.length > maxLength) {
      return newStr.substring(0, maxLength) + '...'
    }
    return newStr
  }


  return (
    <div className="rollContainer">
      <h1>Tickets:{props.tickets}</h1>
      {poke.poke_name ? (
        
        <div className={poke.shiny === true ? 'pokeCard shinyBackground' : 'pokeCard'} id={poke.poke_type[0]}  >
          <img src={poke.shiny === true ? poke.shiny_url : poke.sprite_url}></img>
          <h3>{truncateString(poke.poke_name, 10)}</h3>
          {poke.poke_type.map(type => <h5>{type}</h5>)}
          <ul>
            <li className="hp">HP<br />{poke.hp}</li>
            <li className="att">ATT<br />{poke.att}</li>
            <li className="def">DEF<br />{poke.defe}</li>
            <li className="speed">SPD<br />{poke.speed}</li>
          </ul>
          <h4>Super Duper Punch</h4>
          <ul>
            <li>DMG<br />{pokeAtt.damage}</li>
            <li>CRIT<br />%{pokeAtt.crit}</li>
            <li>ACC<br />%{pokeAtt.accuracy}</li>
          </ul>
        </div>
      ) : (
        <>Loading...</>
      )}
      <button onClick={handleCatch} disabled={props.isLoading}> {props.isLoading ? 'Loading...' : 'Catch'}</button>
      <button onClick={getPokemon} disabled={props.isLoading}>{props.isLoading ? 'Loading...' : 'Roll'}</button>

    </div>
  )
}
