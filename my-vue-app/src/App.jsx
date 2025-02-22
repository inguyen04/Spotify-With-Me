import { Route, Routes, useNavigate } from "react-router-dom";
import Home from './pages/home.jsx'
import Login from './pages/login.jsx'
import Rate from './pages/rate.jsx'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/rate" element={<Rate/>} />
    </Routes>
  )
}

export default App
