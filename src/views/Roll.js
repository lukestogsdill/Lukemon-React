import React, { useState, useEffect } from "react"
import axios from 'axios'
import './css/roll.css'
import '../components/css/pokeTypes.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Pokemon(props) {
  const [poke, setPoke] = useState({})
  const [pokeAtt, setPokeAtt] = useState({})
  const [invCount, setInvCount] = useState(0)
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async() => {
      await getInvLen()
    }
    fetchData()
  },[])
  
  const getInvLen = async() => {
    const response = await fetch('http://127.0.0.1:5000/invCount',{
      headers: {
        Authorization: `Bearer ${props.token}`
      }}) 
      const data = await response.json()
      setInvCount(data.inv_count)
    }

  const postSearch = async (pokeData) => {
    const response = await axios({
      method: "POST",
      url: "http://127.0.0.1:5000/roll",
      headers: {
        Authorization: 'Bearer ' + props.token
      },
      data: pokeData
    })
    return response
  }

  const handleCatch = () => {
    setLoading(true)
    const postData = async() => {
      await postCatch()
    }
    postData()
  }

  const postCatch = async () => {
    const response = await axios({
      method: "POST",
      url: "http://127.0.0.1:5000/catch",
      headers: {
        Authorization: 'Bearer ' + props.token
      },
      data: pokeAtt
    })
    setPoke('')
    setPokeAtt('')
    if(response.status !== 200){
      toast.error(response.data.msg)
    } else {
      toast.success(response.data.msg)
      setInvCount(invCount+1)
    }
    setLoading(false)
    return response
  }

  const getPokemon = async () => {
    if(props.tickets <= 0){
      toast.error('Insufficient Tickets')
    } 
    else if(invCount && invCount > 25) {
      toast.error('Inventory Full (25 max)')
    } 
    else {
      setLoading(true)
      const getData = async() => {
        await generatePoke()
      }
      getData()
    }
  }

  const generatePoke = async() => {
    setLoading(true)
    const attMove = generateAtt()
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${attMove.poke_name}`)
      const data = await response.json()
      let pokeData = {
        'poke_name': data['name'],
        'poke_type': data['types'][0]['type']['name'],
        'sprite_url': data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'],
        'hp': (data['stats'][0]['base_stat'] * 1.5),
        'att': data['stats'][1]['base_stat'] + data['stats'][3]['base_stat'],
        'defe': data['stats'][2]['base_stat'] + data['stats'][4]['base_stat'],
        'speed': data['stats'][5]['base_stat']
      }
      attMove.poke_name = pokeData.poke_name
      props.setTickets(props.tickets - 1)
      setPoke(pokeData)
      setPokeAtt(attMove)
      postSearch(pokeData)
      setLoading(false)
  }

  const generateAtt = () => {
    const attData = {
      'poke_name': Math.floor(Math.random() * 649) + 1,
      'damage': Math.floor(Math.random() * 140) + 40,
      'crit': Math.floor(Math.random() * 100),
      'accuracy': Math.floor(Math.random() * 100)
    }
 
    return attData
  }

  return (
    <div className="rollContainer">
      <h1>Tickets:{props.tickets}</h1>
      {poke.poke_name?(
        <div className="pokeCard" id={poke.poke_type}>
            <button onClick={handleCatch} disabled={isLoading}> {isLoading?'Loading...': 'Catch'}</button>
                <img className='teamImg' src={poke.sprite_url}></img>
                <h3>{poke.poke_name}</h3>
                <h4>{poke.poke_type}</h4>
                <ul>
                  <li className="hp">HP<br/>{poke.hp}</li>
                  <li className="att">ATT<br/>{poke.att}</li>
                  <li className="def">DEF<br/>{poke.defe}</li>
                  <li className="speed">SPD<br/>{poke.speed}</li>
                </ul>
                <h4>Super Duper Punch</h4>
                <ul>
                  <li>DMG<br/>{pokeAtt.damage}</li>
                  <li>CRIT<br/>%{pokeAtt.crit}</li>
                  <li>ACC<br/>%{pokeAtt.accuracy}</li>
                </ul>
              </div>
      ):(
        <>Loading...</>
      )}
      <button onClick={getPokemon} disabled={isLoading}>{isLoading?'Loading...': 'Roll'}</button>
        
    </div>
    )
}
