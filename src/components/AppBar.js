import React from 'react'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faQuestion, faPeopleGroup, faMoneyBillTrendUp, faDragon } from '@fortawesome/free-solid-svg-icons'

export default function AppBar(props) {
return (
<div className="appBar">
<ul>
<li className={props.selected === "home" ? "selected" : ""}><Link to="/"><FontAwesomeIcon icon={faHouse}/><p>Home</p></Link></li>
	<li className={props.selected === "roll" ? "selected" : ""}><Link to="/roll"><FontAwesomeIcon icon={faDragon} /><p>Catch</p></Link></li>
	<li className={props.selected === "wheel" ? "selected" : ""}><Link to="/wheel"><FontAwesomeIcon icon={faMoneyBillTrendUp} /><p>Wheel</p></Link></li>
	<li className={props.selected === "team" ? "selected" : ""}><Link to="/TeamBuilder"><FontAwesomeIcon icon={faPeopleGroup} /><p>Team</p></Link></li>
	<li className={props.selected === "info" ? "selected" : ""}><Link to="/HowToPlay"><FontAwesomeIcon icon={faQuestion}/><p>Info</p></Link></li>
</ul>
</div>
)
}
