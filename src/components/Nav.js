import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSackDollar, faTicket } from '@fortawesome/free-solid-svg-icons';

export default function Nav(props){
	function logMeOut() {
		props.removeToken()
	}

	return(
		<nav>
		<Link to="/">
		<img className="pokeball" src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpurepng.com%2Fpublic%2Fuploads%2Flarge%2Fpurepng.com-pokeballpokeballdevicepokemon-ballpokemon-capture-ball-17015278259020osdb.png&f=1&nofb=1&ipt=48da6
		3eda8616666b39f1ae37a90af1d07b0a39b422fbdc869b938cc57f21460&ipo=images' alt='pokeball'/>
		</Link>
		<div className="btn_title">
		<div className="solid">LUKEMON</div>
		<div className="hollow">LUKEMON</div>
		</div>
		<div className="link_container">
		{!props.token && props.token!=='' &&props.token!== undefined ? (
			<div className='linkDiv'>
			<ul className='nav_links'>
			<Link to="/login" className="nav_link">
			<li>Log In</li>
			</Link>
			</ul>
			</div>
		) : (
			<div className='linkDiv'>
			<ul className="nav_links">
			<Link to="/roll" className="nav_link">
			<li>Catch</li>
			</Link>
			<Link to="/wheel" className="nav_link">
			<li>Wheel</li>
			</Link>
			<Link to="/TeamBuilder" className="nav_link">
			<li>Team</li>
			</Link>
			<Link to="/HowToPlay" className="nav_link">
			<li>Info</li>
			</Link>
			</ul>
			<div className='profileBar'>
			<section>
			<div className='profilePic'
			style={{
				backgroundImage: `url(${props.user.img_url})`,
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
			}}/>
			<h3>{props.user.username}</h3>
			</section>
			<section className='moneyBar'>
			<h3><FontAwesomeIcon icon={faSackDollar}/>:{props.money}</h3>
			<h3><FontAwesomeIcon icon={faTicket} />:{props.tickets}</h3>
			<Link to='/' onClick={logMeOut}> Logout </Link>
			</section>
			</div>
			</div>
		)}
		</div>
		</nav>
	);
}
