import React, { useState } from 'react'
import './css/Wheel.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import Modal from '@mui/material/Modal'
import 'react-toastify/dist/ReactToastify.css'

    
export default function Wheel(props){

    const [betNum, setBetNum] = useState(10)
    const [moneyWin, setMoneyWin] = useState(0)
    const [ticketWin, setTicketWin] = useState(0)
    const [jackpot, setJackpot] = useState()
    const [open, setOpen] = useState(false)

    const spinBtn = () => {
        if(betNum <= props.money){
            let spinBtn = document.getElementById('spin')
            let container = document.getElementById('container')
            let num = (Math.round(Math.random() * 7777) + 720)
            let stopNum = Math.round(num % 360)
            container.style.transform = `rotateZ(${num}deg)`
            spinBtn.style.display = 'none'
            const btnBuffer = setInterval(()=>{
                spinBtn.style.display = 'block'
                clearInterval(btnBuffer)
            },2000)
            getReward(stopNum)
        } else {
            toast.error('Insufficent Funds')
        }
    }

    const getReward = (stopNum) => {
        props.setMoney(props.money-betNum)
        if(stopNum >= 240 && stopNum <= 245){
            handleReward(10)
            handleTickets(betNum*4)
            setJackpot('Super Duper Jackpot!')
            handleOpen()
        } else if(stopNum >= 165 && stopNum <= 180){
            handleReward(4)
            setJackpot('Super Money Jackpot')
            handleOpen()
        } else if(stopNum >= 90 && stopNum <= 105){
            handleReward(1)
            handleTickets(betNum)
            setJackpot('Super Ticket Jackpot!')
            handleOpen()
        } else if(stopNum >= 305 && stopNum <= 330){
            handleReward(2)
            setJackpot('Nice Win!')
            handleOpen()
        }
    }

    const handleReward = (num) => {
        props.setMoney(props.money + betNum*num)
        setMoneyWin(betNum*num)
    }

    const handleTickets = (num) => {
        props.setTickets(props.tickets + num)
        setTicketWin(num)
    }

    const handleIncrease = () => {
        if(betNum < props.money) {
            setBetNum(betNum + 10)
        }
    }

    const handleDecrease = () => {
        if(10 < betNum) {
            setBetNum(betNum - 10)
        }
    }

    const handleOpen = () => {
        setOpen(true)
      }
    
      const handleClose = () => {
        setOpen(false)
        setMoneyWin(0)
        setTicketWin(0)
        setJackpot('')
      }
 
    return (
        <div className='wheelTree'>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            className='postModal'>
            <div>
                <h1>{jackpot}</h1>
                <h2>Win:${moneyWin} T:{ticketWin}</h2>
            </div>
            </Modal>
            <div className='betBox'>
                <div className='moneyBox'>
                    <h1>Bank:${props.money}</h1>
                    <h1 className='betNum'>Bet:${betNum}</h1>
                </div>
                <div className='betBtns'>
                    <FontAwesomeIcon icon={faArrowUp} onClick={handleIncrease}/>
                    <FontAwesomeIcon icon={faArrowDown} onClick={handleDecrease}/>
                </div>
            </div>
            <button onClick={spinBtn} id="spin">Spin</button>
        <div className='wheelBox'>
            <div className="wheel">
                <div className='container' id='container'>
                    <div className="one"/>
                    <div className="two"/>
                    <div className="three"/>
                    <div className="four"/>
                    <div className="five"/>
                    <div className="six"/>
                    <div className='seven'/>
                    <div className='eight'/>
                    <div className='nine'/>
                </div>
            </div>
            <span className="mid" />
            <div className="stoper" />
        </div>
        </div>
    )};
