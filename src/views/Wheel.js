import React, { Component } from 'react'
import '../Wheel.css'
    
export default function Wheel(/*money, tickets*/){

    const spinBtn = () => {
    console.log('hello')
    let container = document.getElementById('container')
    let num = (Math.round(Math.random() * 7777) + 360);
    container.style.transform = `rotate(${num}deg)`
    console.log(num)
    }

    return (
        <div className="wheel">
            <div className="container" id='container'>
                <div className="one">1</div>
                <div className="two">2</div>
                <div className="three">3</div>
                <div className="four">4</div>
                <div className="five">5</div>
                <div className="six">6</div>
            </div>
            <span className="mid" />
            <button onClick={spinBtn} id="spin">Spin</button>
            <div className="stoper" />
        </div>
    )};
