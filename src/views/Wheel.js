import React, { useState } from 'react'
import './css/Wheel.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

    
export default function Wheel(props){

    const [betNum, setBetNum] = useState(10)

    const spinBtn = () => {
    let container = document.getElementById('container')
    let num = (Math.round(Math.random() * 7777) + 720)
    let stopNum = Math.round(num % 360)
    container.style.transform = `rotateZ(${num}deg)`
    console.log(num + 'spin')
    console.log(stopNum + 'stop num')
    getReward(stopNum)
    }

    const getReward = (stopNum) => {
        props.setMoney(props.money-betNum)
        // switch (stopNum) {
        //     case >:
                
        //         break;
        
        //     default:
        //         break;
        // }
    }

    const handleIncrease = () => {
        if(10 <= betNum && betNum < props.money -1) {
            setBetNum(betNum + 10)
        }
    }

    const handleDecrease = () => {
        if(10 < betNum && betNum <= props.money) {
            setBetNum(betNum - 10)
        }
    }
 
    return (
        <div className='wheelTree'>
            <div className='betBox'>
                <h1>${betNum}</h1>
                <div className='betBtns'>
                    <FontAwesomeIcon icon={faArrowUp} onClick={handleIncrease}/>
                    <FontAwesomeIcon icon={faArrowDown} onClick={handleDecrease}/>
                </div>
            </div>
            <button onClick={spinBtn} id="spin">Spin</button>
        <div className='wheelBox'>
            <div className="wheel">
                <div className="container" id='container'>
                    <div className="one">1</div>
                    <div className="two">2</div>
                    <div className="three">3</div>
                    <div className="four">4</div>
                    <div className="five">5</div>
                    <div className="six">6</div>
                    <div className='seven'>7</div>
                    <div className='eight'>8</div>
                    <div className='nine'>9</div>
                    <div className='ten'>10</div>
                </div>
            </div>
            <span className="mid" />
            <div className="stoper" />
        </div>
        </div>
    )};
