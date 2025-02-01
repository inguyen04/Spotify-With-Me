import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from './pages/home.jsx'
import Login from './pages/login.jsx'
import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/home" element={<Home/>} />
    </Routes>
  )
}

export default App
