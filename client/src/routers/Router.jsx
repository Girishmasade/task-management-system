import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Activity from '../pages/Activity'
import Task from '../pages/Task'
import Profile from '../pages/Profile'
import Login from '../pages/Login'

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/activity' element={<Activity/>}/>
      <Route path='/tasks' element={<Task/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
  )
}

export default Router
