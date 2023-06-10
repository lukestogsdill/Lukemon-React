import React from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function Nav(props){

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

    function logMeOut() {
       props.removeToken()
    }

  return(
  <nav>
    <div className="home_btn">
      <Link className="pokeball" to="/" />
      <div className="btn_title">
        <h1 className="home_title solid">LUKEMON</h1>
        <h1 className="home_title hollow">LUKEMON</h1>
      </div>
    </div>
    <div className="link_container">
    {!props.token && props.token!=='' &&props.token!== undefined?(
          <ul className='nav_links'>
        <Link to="/register" className="nav_link">
          <li>register</li>
        </Link>
        <Link to="/login" className="nav_link">
          <li>Log In</li>
        </Link>
          </ul>
      ):(
        <div className='linkDiv'>
        <ul className="nav_links">
        <Link to="/wheel" className="nav_link">
          <li>Wheel</li>
        </Link>
        <Link to="/TeamBuilder" className="nav_link">
          <li>Team</li>
        </Link>
        <Link to="/roll" className="nav_link">
          <li>Roll</li>
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
          <h3>$:{props.money}</h3>
          <h3>T:{props.tickets}</h3>
          <Link to='/login' onClick={logMeOut}> Logout </Link>
          </section>
        </div>  
      </div>
      )}
  </div>
  <div className='dropDown'>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        x
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/wheel">
            Wheel
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/TeamBuilder">
          Team
        </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/roll">
          Roll
        </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/logout" onClick={logMeOut}>
          Logout
        </Link>
        </MenuItem>
      </Menu>
    </div>
  </nav>
  )
}
  