import React from 'react'
import './css/HowToPlay.css'

export default function HowToPlay() {

  return (
    <div className='howToPlayContainer'>
    <section>
      <div className='speechBubble'>
      <h1>How To Play</h1>
      <div className='explainHome'>
        <div className='pokeball pokeballExplained'/>
        <p>Once Logged in, click the pokeball to fight and earn money.</p>
      </div>
      <h2>Catch</h2>
      <p>Use Tickets to roll pokemon with random attack stats.</p>
      <h2>Wheel</h2>
      <p>Use money to spin the wheel to earn more money & tickets.</p>
      <h2>Team</h2>
      <p>Select 5 pokemon from your inventory, and post your new team on the home page.</p>

      
      </div>
      <div className='professorPikachu'/>

      </section>
      <hr></hr>
      <section>
        <div className='speechBubble'>
          <h1>Jackpots</h1>
          <h2>Nice Win</h2>
          <p>2x your bet</p>
          <h2>Super Money Jackpot</h2>
          <p>4x your bet</p>
          <h2>Super Ticket Jackpot</h2>
          <p>1x your bet and 1x your bet in Tickets</p>
          <h2>Super Duper Jackpot</h2>
          <p>10x your bet and 4x your bet in Tickets</p>

        </div>
        <div className='speechBubble'>
          <h1>Damage</h1>
          <h2>Damage Equation</h2>
          <p>(((att*dmg)/def)/4)*acc*crit</p>
          <h2>Super Duper Punch</h2>
          <p>dmg: 41~179<br/></p>
          <p>crit multiplyer: 1.5</p>
        </div>
      </section>
    </div>
  )
}
