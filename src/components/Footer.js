import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../footer.css';

export default class Footer extends Component {
    render() {
      return ( 
      <footer>
        <ul>
        <li>
        <Link to='/tasklist'>
          To Do List
        </Link>
        </li>
        </ul>

      </footer>
      )
    }
  }