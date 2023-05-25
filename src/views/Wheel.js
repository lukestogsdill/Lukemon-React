import React from 'react'
import './css/Wheel.css'
    
export default function Wheel(props){



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
        // switch (stopNum) {
        //     case >:
                
        //         break;
        
        //     default:
        //         break;
        // }
    }
 
    return (
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
            <button onClick={spinBtn} id="spin">Spin</button>
        </div>
    )};
