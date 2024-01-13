import './App.css'
import Nav from './components/Nav'
import AppBar from './components/AppBar'
import Wheel from './views/Wheel'
import PostFight from './views/PostFight'
import LukeFight from './views/LukeFight'
import Login from './components/Login'
import TeamBuilder from './views/TeamBuilder'
import useToken from './components/useToken'
import Register from './views/Register'
import Roll from './views/Roll'
import HowToPlay from './views/HowToPlay'
import React, { useState, useEffect } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Footer } from './components/footer'

export default function App() {

  const { token, removeToken, setToken } = useToken()
  const [invData, setInvData] = useState([])
  const [team, setTeam] = useState([])
  const [user, setUser] = useState({})
  const [money, setMoney] = useState()
  const [tickets, setTickets] = useState()
  const [isLoading, setLoading] = useState(false)
  const [selected, setSelected] = useState('home')

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        await getUserData()
      }
    }
    fetchData()
  }, [token])

  useEffect(() => {
    updateCurr()
  },[money, tickets])

  const updateCurr = async () => {
    if (token && money !== undefined) {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/updateCurr`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          tickets: tickets,
          money: money
        })
      })
    }
  }

  const getUserData = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/getUserData`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = await response.json()
    setUser(data)
    setMoney(data.money)
    setTickets(data.tickets)
  }

  return (
    <BrowserRouter>
      <Nav removeToken={removeToken} token={token} user={user} money={money} tickets={tickets} />
      <ToastContainer />
      <div className="App">
        {!token && token !== '' && token !== undefined ? (
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login setToken={setToken} />} />
            <Route path='/' element={<HowToPlay setSelected={setSelected} />} />
          </Routes>
        ) : (
          <Routes>
            <Route path='/' element={<PostFight token={token} tickets={tickets} money={money} setMoney={setMoney} setTickets={setTickets} setUser={setUser} user={user} setTeam={setTeam} team={team} setSelected={setSelected} />} />
            <Route path="/TeamBuilder" element={<TeamBuilder token={token} team={team} invData={invData} setTeam={setTeam} setInvData={setInvData} setSelected={setSelected} />} />
            <Route path='/wheel' element={<Wheel token={token} money={money} setMoney={setMoney} tickets={tickets} setTickets={setTickets} isLoading={isLoading} setLoading={setLoading} setSelected={setSelected} />} />
            <Route path='/roll' element={<Roll token={token} tickets={tickets} setTickets={setTickets} invData={invData} isLoading={isLoading} setLoading={setLoading} setSelected={setSelected} />} />
            <Route path='/lukefight/:id' element={<LukeFight token={token} team={team} setUser={setUser} money={money} setMoney={setMoney} setInvData={setInvData} isLoading={isLoading} setLoading={setLoading} setSelected={setSelected} />} />
            <Route path='/HowToPlay' element={<HowToPlay setSelected={setSelected} />} />
          </Routes>
        )}
      </div>
      <AppBar selected={selected} />
      <Footer />
    </BrowserRouter>
  )
}

