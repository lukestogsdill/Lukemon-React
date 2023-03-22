import React, { Component } from 'react'

export default class Nav extends Component {
  render() {
    return ( 
    <nav>
      <div className="home_btn">
        <a className="pokeball" href="#" />
        <div className="btn_title">
          <h1 className="home_title solid">LUKEMON</h1>
          <h1 className="home_title hollow">LUKEMON</h1>
        </div>
      </div>
      <div className="link_container">
        <ul className="nav_links">
          <a href="#" className="nav_link">
            <li>Poke Roll</li>
          </a>
          <a href="#" className="nav_link">
            <li>Team</li>
          </a>
          <a href="#" className="nav_link">
            <li>Create Post</li>
          </a>
        </ul>
      </div>
    </nav>
    )
  }
}
