import React, { useState } from "react"
import axios from 'axios'
import './css/roll.css'
import { useEffect } from "react"

export default function Pokemon(props) {
  const [poke, setPoke] = useState({})
  const [pokeAtt, setPokeAtt] = useState({})

  const postSearch = async (pokeData) => {
    const res = await axios({
      method: "POST",
      url: "http://localhost:5000/roll",
      headers: {
        Authorization: 'Bearer ' + props.token
      },
      data: pokeData
    })
    return res
  }

  const postCatch = async () => {
    const res = await axios({
      method: "POST",
      url: "http://localhost:5000/catch",
      headers: {
        Authorization: 'Bearer ' + props.token
      },
      data: pokeAtt
    })
    setPoke('')
    setPokeAtt('')
    return res
  }

  const getPokemon = async () => {
    const attMove = generateAtt()
    const response = await fetch(`https://pokeapi.co/v2/pokemon/${attMove.poke_name}`)
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
    console.log(pokeData)
    setPoke(pokeData)
    setPokeAtt(attMove)
    postSearch(pokeData)
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

  const testing = () =>{
    console.log(poke)
  }

  return (
    <div className="rollContainer">
      <button onClick={getPokemon}>Roll</button>
      {poke.poke_name?(
        <div>
        <img src={poke.sprite_url} className="pokesprite" alt='pokeSprite'/><table>
          <thead>
            <tr>
              <th scope="col">Name </th>
              <th scope="col">HP </th>
              <th scope="col">Att </th>
              <th scope="col">Def </th>
              <th scope="col">Speed </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" className="table_name">{poke.poke_name}</th>
              <td className="hp">{poke.hp}</td>
              <td className="att">{poke.att}</td>
              <td className="def">{poke.defe}</td>
              <td className="speed">{poke.speed}</td>
            </tr>
          </tbody>
        </table>
        <div className="move_display">
          Super Duper Punch
          <ul>
            <li>Damage: {pokeAtt.damage}</li>
            <li>Crit Chance: %{pokeAtt.crit}</li>
            <li>Accuracy: %{pokeAtt.accuracy}</li>
          </ul>
        </div>
        <button onClick={postCatch}>Catch</button>
        </div>
      ):(
        <>asdfasdf</>
      )}
      
        
    </div>
    )
}
