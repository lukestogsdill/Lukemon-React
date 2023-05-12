import './App.css'
import Nav from './components/Nav'
import Wheel from './views/Wheel'
import Footer from './components/Footer'
import PostFight from './views/PostFight'
import LukeFight from './views/LukeFight'
import Login from './components/Login'
import TeamBuilder from './views/TeamBuilder'
import useToken from './components/useToken'
import Register from './views/Register'
import Roll from './views/Roll'
import React, { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

export default function App(){

  const { token, removeToken, setToken } = useToken()
  const [invData, setInvData] = useState([])
  const [team, setTeam] = useState([])
 
    return (
      <BrowserRouter>
      <Nav removeToken={removeToken} token={token}/>
      <div className="App">
      {!token && token!=='' &&token!== undefined?(
      <Routes>
        <Route path = '/register' element ={<Register/>}/>
        <Route path = '/login' element={<Login setToken={setToken}/>} />
        <Route path = '/' element={<PostFight token={token}/>}/>
      </Routes> 
        ):(
          <Routes>
            <Route path = '/' element={<PostFight token={token}/>}/>
            <Route path="/TeamBuilder" element={<TeamBuilder token={token} team={team} invData={invData} setTeam={setTeam} setInvData={setInvData}/>}/>
            <Route path = '/wheel' element ={<Wheel token={token} />}/>
            <Route path = '/roll' element = {<Roll token={token} />}/>
            <Route path = '/lukefight/:id' element={<LukeFight token={token} team={team}/>}/>
          </Routes>
        )}
      </div>
      </BrowserRouter>
    )};

