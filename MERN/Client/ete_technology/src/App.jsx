import {Route, Routes} from 'react-router-dom'
import './App.css'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Home from './Pages/Home'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import Company from './Pages/Company'
import Product from './Pages/Product'

function App() {
  const [users, setUsers] = useState(null)

  useEffect(()=>{
   onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    setUsers(user)
  } else {
    
  }
});

  },[])

  return (
    <>
      
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/home' element={<Home users={users}/>} />
        <Route path='/company' element={<Company/>} />
        <Route path='/products' element={<Product/>} />
      </Routes>
    </>
  )
}

export default App
