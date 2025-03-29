import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminRegistration from './Pages/AdminRegistration'
import Login from './Pages/Login'
import CustomerRegistration from './Pages/CustomerRegistration'
import AdminDashboard from './Pages/AdminDashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<AdminRegistration />} />
      <Route path="/customer" element={<CustomerRegistration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
