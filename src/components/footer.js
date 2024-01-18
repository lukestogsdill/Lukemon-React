import React from "react"
import './css/footer.css'
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faQuestion, faPeopleGroup, faMoneyBillTrendUp, faDragon } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"

export function Footer() {
    return (
        <nav className='footer'>
            <p>Created by Luke Stogsdill</p>
            <ul>
                <li>
                    <Link to='https://github.com/lukestogsdill'>github</Link>
                </li>
                <li>
                    <Link to='https://www.linkedin.com/in/luke-stogsdill/'>linkedin</Link>
                </li>
            </ul>
            <p className="disclaimer">Disclaimer: This fan-made web app is not affiliated with or endorsed by The Pokémon Company, Nintendo, or any official Pokémon entities. Pokémon is a trademark of Nintendo, Game Freak, and The Pokémon Company. All content is used for artistic and informational purposes only, and we claim no ownership. Contact us with any concerns.
            </p>
        </nav>
    )
}
