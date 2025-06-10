import React from 'react'
import { WalletProvider } from './context/Walletcontext.jsx'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Frontpage from './pages/Frontpage.jsx'
import AddDevice from './pages/AddDevice.jsx'
import Homepage from './pages/Homepage.jsx'
import AdminDashboard from './pages/AdminDash.jsx'

function App() {
  return (
    <WalletProvider>
    <BrowserRouter>
     <ToastContainer position="top-right" autoClose={3000} />
     <Routes>
      <Route path='/' element={<Frontpage/>}/>
      <Route path='/addDevice' element={<AddDevice/>}/>
      <Route path='/Homepage' element={<Homepage/>}/>
      <Route path="/admin" element={<AdminDashboard />} />
     </Routes>
    </BrowserRouter>
    </WalletProvider>
  )
}

export default App