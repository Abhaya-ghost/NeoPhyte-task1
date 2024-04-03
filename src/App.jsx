import { useState } from 'react'
import './App.css'
import MainComponent from './components/MainComponent'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <MainComponent/>
    </>
  )
}

export default App
