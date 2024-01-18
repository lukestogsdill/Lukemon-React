import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '@mui/material/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOut, faSignIn, faSackDollar, faTicket, faQuestion, faPeopleGroup, faMoneyBillTrendUp, faDragon } from '@fortawesome/free-solid-svg-icons'

export default function Nav(props) {

	const [modalOpen, setModalOpen] = useState(false)

	console.log(modalOpen)

	function logMeOut() {
		props.removeToken()
		setModalOpen(false)
	}

	const handleModalOpen = () => {
		setModalOpen(true)
	}

	const handleModalClose = () => {
		setModalOpen(false)
	}


	return (
		<nav>
			<Link to="/">
				<img className="pokeball" src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpurepng.com%2Fpublic%2Fuploads%2Flarge%2Fpurepng.com-pokeballpokeballdevicepokemon-ballpokemon-capture-ball-17015278259020osdb.png&f=1&nofb=1&ipt=48da6
		3eda8616666b39f1ae37a90af1d07b0a39b422fbdc869b938cc57f21460&ipo=images' alt='pokeball' />
			</Link>
			<div className="btn_title">
				<div className="solid">LUKEMON</div>
				<div className="hollow">LUKEMON</div>
			</div>
			<div className="link_container">
				{!props.token && props.token !== '' && props.token !== undefined ? (
					<ul>
						<Link to="/login">
							<li className='loginBtn'><FontAwesomeIcon icon={faSignIn} /> Log In</li>
						</Link>
					</ul>
				) : (
					<div className='linkDiv'>
						<ul className="nav_links">
							<Link to="/roll" className="nav_link">
								<li><FontAwesomeIcon icon={faDragon} /><p>Catch</p></li>
							</Link>
							<Link to="/wheel" className="nav_link">
								<li><FontAwesomeIcon icon={faMoneyBillTrendUp} /><p>Wheel</p></li>
							</Link>
							<Link to="/TeamBuilder" className="nav_link">
								<li><FontAwesomeIcon icon={faPeopleGroup} /><p>Team</p></li>
							</Link>
							<Link to="/HowToPlay" className="nav_link">
								<li><FontAwesomeIcon icon={faQuestion} /><p>Info</p></li>
							</Link>
						</ul>
						<div className='profileBar'>
							<section>
								<div className='profilePic'
									style={{
										backgroundImage: `url(${props.user.img_url})`,
										backgroundSize: 'cover',
										backgroundRepeat: 'no-repeat',
									}} />
								<h3>{props.user.username}</h3>
							</section>
							<section className='moneyBar'>
								<h3><FontAwesomeIcon icon={faSackDollar} />:{props.money}</h3>
								<h3><FontAwesomeIcon icon={faTicket} />:{props.tickets}</h3>
								<Link to='/' onClick={handleModalOpen} className='loginBtn'><FontAwesomeIcon icon={faSignOut} /> Logout</Link>
								<Modal
									open={modalOpen}
									onClose={handleModalClose}
									aria-labelledby="parent-modal-title"
									aria-describedby="parent-modal-description"
									className='postModal'>
									<div>
										<h4>Are you sure you want to LogOut?</h4>
										<div className="delBtns">
											<button onClick={() =>  logMeOut() } className="delBtn">Yes</button>
											<button onClick={() =>  handleModalClose() } className="delBtn">No</button>

										</div>
									</div>
								</Modal>
							</section>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
}
