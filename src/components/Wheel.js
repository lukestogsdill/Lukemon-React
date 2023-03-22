import React, { Component } from 'react'
import '../Wheel.css'
    
export default class Wheel extends Component {
    constructor() {
        super()
        this.state = {
        }
    }

    spin2win = () => {
    console.log('hello')
    let container = document.getElementById('container')
    let num = Math.ceil(Math.random() * 10000)
    container.style.transform = "rotate(" + num + "deg)";
    }

    render() {
        return (
            <div className="Wheel">
                <div className="container" id='container'>
                    <div className="one">1</div>
                    <div className="two">2</div>
                    <div className="three">3</div>
                    <div className="four">4</div>
                    <div className="five">5</div>
                    <div className="six">6</div>
                </div>
                <span className="mid" />
                <button onClick={this.spin2win} id="spin">Spin</button>
                <div className="stoper" />
            </div>
        )
    }
    
}
