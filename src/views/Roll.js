import React, { useState, useEffect } from "react";
import axios from 'axios';
import './css/roll.css';
import '../components/css/pokeTypes.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faTicket } from '@fortawesome/free-solid-svg-icons'


export default function Roll(props) {
  props.setSelected("roll");
  const [pokeArray, setPokeArray] = useState([])
  const [pokeAttArray, setPokeAttArray] = useState([])
  const [invCount, setInvCount] = useState(0)
  const [ticketCount, setTicketCount] = useState(10)
  const rollLimit = 100

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
    });
    const data = await response.json();
    setInvCount(data.inv_count);
  };

  const handleCatch = (index) => {
    props.setLoading(true);
    const pokeAtt = pokeAttArray[index];
    const postData = async () => {
      await postCatch(index, pokeAtt);
    };
    postData();
  };

  const postCatch = async (index, pokeAtt) => {
    const response = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_URL}/catch`,
      headers: {
        Authorization: 'Bearer ' + props.token
      },
      data: pokeAtt
    });

    if (response.status !== 200) {
      toast.error(response.data.msg);
    } else {
      toast.success(response.data.msg);
      setInvCount((prevCount) => prevCount + 1);
    }

    // Remove the caught Pokémon from the arrays
    const updatedPokeArray = [...pokeArray];
    updatedPokeArray.splice(index, 1);

    const updatedPokeAttArray = [...pokeAttArray];
    updatedPokeAttArray.splice(index, 1);

    setPokeArray(updatedPokeArray);
    setPokeAttArray(updatedPokeAttArray);

    props.setLoading(false);
    return response;
  };

  const getPokemon = async () => {
    if (props.tickets <= 0 || ticketCount > rollLimit) {
      toast.error(`Roll Limit ${rollLimit}`)
    } else if (invCount && invCount > 25) {
      toast.error('Inventory Full (25 max)')
    } else {
      props.setLoading(true)


      setPokeArray([])
      setPokeAttArray([])

      const getData = async () => {
        await generatePoke()
      }
      getData()
    }
  }


  const generatePoke = async () => {
    const pokeRollAmount = ticketCount
    const attMoves = generateAtt(pokeRollAmount);
    let pokeDataArray = [];

    const pokeNames = attMoves.map(attMove => attMove.poke_name);
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/getBulkPokeHash`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${props.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ pokeNames })
    });
    pokeDataArray = await response.json();
    console.log(pokeDataArray)

    const updatedAttMoves = attMoves.map((attMove, index) => {
      const pokeData = pokeDataArray[index];

      if (pokeData && attMove.shiny_roll === 1) {
        if (attMove.damage < 100) {
          attMove.damage = 100;
        }
        if (attMove.crit < 50) {
          attMove.crit = 50;
        }
        if (attMove.accuracy < 50) {
          attMove.accuracy = 50;
        }
        pokeData.shiny = true;
        attMove.shiny = true;
      }

      return pokeData;
    });

    props.setTickets((prevTickets) => prevTickets - pokeRollAmount);
    setPokeArray(updatedAttMoves)
    setPokeAttArray(attMoves)

    props.setLoading(false)
  }

  const generateAtt = (pokeRollAmount) => {
    const rollArray = []
    for (let i = 0; i < pokeRollAmount; i++) {
      const attData = {
        poke_name: Math.floor(Math.random() * 649) + 1,
        damage: Math.floor(Math.random() * 140) + 40,
        crit: Math.floor(Math.random() * 100),
        accuracy: Math.floor(Math.random() * 100),
        shiny_roll: Math.floor(Math.random() * 1000) + 1,
        shiny: false
      };
      rollArray.push(attData)
    }
    console.log(rollArray)
    console.log('this is in geneAtt func')
    return rollArray
  };

  function truncateString(str, maxLength) {
    const newStr = str.charAt(0).toUpperCase() + str.slice(1)
    if (str.length > maxLength) {
      return newStr.substring(0, maxLength) + '...'
    }
    return newStr
  }

  const handleTicketChange = (e) => {
    document.getElementById('numberInput').addEventListener('input', function (e) {
      let inputValue = e.target.value
      let numericValue = inputValue.replace(/[^0-9]/g, '')
      setTicketCount(numericValue)
    })
  }

  const handleIncrease = () => {
    if (ticketCount < rollLimit) {
      setTicketCount(ticketCount + 1)
    }
  }

  const handleDecrease = () => {
    if (1 < ticketCount) {
      setTicketCount(ticketCount - 1)
    }
  }


  return (
    <div className="rollContainer">
      <div className="ticketRoll">
        <h1><FontAwesomeIcon icon={faTicket} />:{props.tickets}</h1>
        <h1 className="rollColor">Roll</h1>
        <input
          value={ticketCount}
          className="ticketInput"
          id='numberInput'
          type='text'
          onChange={handleTicketChange} />
        <div className='betBtns'>
          <FontAwesomeIcon icon={faArrowUp} onClick={handleIncrease} />
          <FontAwesomeIcon icon={faArrowDown} onClick={handleDecrease} />
        </div>
      </div>
      <div className="rollDisplay">
        {pokeArray.length > 0 ? (
          pokeArray.map((poke, index) => (
            <div key={index} className="pokeCatch">
              {poke ? (
                <div className={pokeAttArray[index].shiny === true ? 'pokeCard shinyBackground pokeCatch' : 'pokeCard'} id={poke.poke_type[0]}>
                  <img src={pokeAttArray[index].shiny === true ? poke.shiny_url : poke.sprite_url} alt={pokeAttArray[index].shiny === true ? 'Shiny Pokemon' : 'Regular Pokemon'} />
                  <h3>{truncateString(poke.poke_name, 10)}</h3>
                  {poke.poke_type.map(type => <h5 key={type}>{type}</h5>)}
                  <ul>
                    <li className="hp">HP<br />{poke.hp}</li>
                    <li className="att">ATT<br />{poke.att}</li>
                    <li className="def">DEF<br />{poke.defe}</li>
                    <li className="speed">SPD<br />{poke.speed}</li>
                  </ul>
                  <h4>Super Duper Punch</h4>
                  <ul>
                    <li>DMG<br />{pokeAttArray[index].damage}</li>
                    <li>CRIT<br />%{pokeAttArray[index].crit}</li>
                    <li>ACC<br />%{pokeAttArray[index].accuracy}</li>
                  </ul>
                </div>
              ) : (
                <p>Pokemon details not available</p>
              )}
              <button className='catchButton'
                onClick={() => handleCatch(index)}
                disabled={props.isLoading}>
                {props.isLoading ? 'Loading...' : 'Catch'}
              </button>
            </div>
          ))
        ) : (
          <>Loading...</>
        )}
      </div>
      <button
        onClick={getPokemon}
        className='rollButton'
        disabled={props.isLoading}>
        {props.isLoading ? 'Loading...' : 'Roll'}
      </button>
    </div>
  )
}