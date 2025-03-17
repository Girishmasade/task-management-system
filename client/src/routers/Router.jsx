import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Activity from '../pages/Activity'
import Task from '../pages/Task'
import Profile from '../pages/Profile'
import Login from '../pages/authantication/Login'
import Signup from '../pages/authantication/Signup'
import EmailVerify from '../pages/authantication/EmailVerify'

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/activity' element={<Activity/>}/>
      <Route path='/tasks' element={<Task/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/verify-account' element={<EmailVerify/>}/>
    </Routes>
  )
}

export default Router
