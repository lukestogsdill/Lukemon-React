import '../components/css/pokeTypes.css'
import './css/lukeCard.css'

export function LukeCard (props) {
    function truncateString(str, maxLength) {
      const newStr = str.charAt(0).toUpperCase() + str.slice(1)
      if (str.length > maxLength) {
        return newStr.substring(0, maxLength) + '...'
      }
      return newStr
    }
    
    return (
      <div className={`${props.className} ${props.poke.shiny === true ? 'pokeCard shinyBackground' : 'pokeCard'}`} id={props.poke.poke_hash.poke_type[0]}>
                <img src={props.poke.shiny === true ? props.poke.poke_hash.shiny_url : props.poke.poke_hash.sprite_url}></img>
                <h3 className={props.poke.shiny === true ? 'shinyText' : ''} >{truncateString(props.poke.poke_hash.poke_name)}</h3>
                {props.poke.poke_hash.poke_type.map(type => <h5 className={props.poke.shiny === true ? 'shinyText' : ''}>{type}</h5>)}
                <ul>
                  <li className="hp">HP<br/>{props.poke.poke_hash.hp}</li>
                  <li className="att">ATT<br/>{props.poke.poke_hash.att}</li>
                  <li className="def">DEF<br/>{props.poke.poke_hash.defe}</li>
                  <li className="speed">SPD<br/>{props.poke.poke_hash.speed}</li>
                </ul>
                <h4>Super Duper Punch</h4>
                <ul>
                  <li>DMG<br/>{props.poke.damage}</li>
                  <li>CRIT<br/>%{props.poke.crit}</li>
                  <li>ACC<br/>%{props.poke.accuracy}</li>
                </ul>
              </div>
    )
}