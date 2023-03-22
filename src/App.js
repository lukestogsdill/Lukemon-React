import './App.css';
import Nav from './components/Nav'
import Wheel from './components/Wheel'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Nav/>
      <Wheel/>
      <Footer/>
    </div>
  );
}

export default App;
