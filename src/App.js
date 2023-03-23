import './App.css';
import Nav from './components/Nav'
import Wheel from './views/Wheel'
import Footer from './components/Footer'
import TaskList from './views/TaskList'
import React, { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

export default function App(){

  const [task, setTask] = useState('')

  const addTask = (e) =>{
    e.preventDefault()
    console.log(e)
    setTask(task + e)
    console.log(`task :${task}`)
  }

  const removeTask = () =>{
    //get index value from tasklist remove btn
    //remove from taskList
  }

    return (
      <BrowserRouter>
      <div className="App">
        <Nav/>
        <Routes>
          <Route path = '/wheel' element ={<Wheel/>}/> //pass this money and send money & tickets back to user
          <Route path = '/tasklist' element ={<TaskList task={task} addTask={addTask}/>}/>
        </Routes>
        <Footer/>
      </div>
      </BrowserRouter>
    )};

