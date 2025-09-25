import { useEffect, useState } from 'react'

import './App.css'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Dashboard from './pages/dashboard/dashboard'
import Login from './pages/login/login'
import Signup from './pages/signup/signup'
import Refreshhandler from './pages/refreshhandler'

function App() {
  const navigate=useNavigate()
     const [isauthorized, setisauthorized] = useState(false);
     const Privateroute=({element})=>{
     return isauthorized?element:navigate('/login')
     }
 
    const location=useLocation();
 
  return (
    <>
    <Refreshhandler setisauthorized={setisauthorized}/>
    <Routes>
    <Route path='/dashboard' element={<Privateroute element={<Dashboard/> }/>} />
    <Route path='/login' element={<Login/>}/>
    <Route path='/Signup' element={<Signup/>}/>
    <Route path='/:name' element={<Navigate to={'/login'}/>}/>
    <Route path='/' element={<Navigate to={'/login'}/>}/>

    </Routes>
    </>
  )
}

export default App
