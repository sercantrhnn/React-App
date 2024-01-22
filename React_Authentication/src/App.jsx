import { useState } from 'react'
import './App.css'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Anasayfa from './Pages/anasayfa'
import {Route, Routes} from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/anasayfa' element={<Anasayfa/>}/>
    </Routes>
    
      
    </>
  )
}

export default App
