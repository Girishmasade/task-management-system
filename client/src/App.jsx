import React from 'react'
import Navbar from './components/Navbar'
import SideBar from './components/SideBar'
import TaskData from './components/TaskData'
import Router from './routers/Router'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <Navbar/>
      <SideBar/>
      <TaskData/>
      <Router/>
      <Footer/>
    </div>
  )
}

export default App
