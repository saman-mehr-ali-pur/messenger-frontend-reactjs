import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Signin from './signin/Singin'
import Signup from './signup/Signup'
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./home/Home.jsx"
import ListChat from './mainPage/ListChat.jsx'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>

<BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} >
        <Route index element={<Signin/>}/>
      
      </Route>
      <Route path="signup" element={<Signup/>} />
      <Route path='chatList' element={<ListChat/>}/>
    </Routes>
  </BrowserRouter>
    </>
  )
}

export default App
